import { useEffect, useRef, useState } from 'react'

type State = 'idle' | 'preparing' | 'recording' | 'completed'

export function usePTEAudioRecorder() {
  const [state, setState] = useState<State>('idle')
  const [preSeconds, setPreSeconds] = useState(3)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const rafRef = useRef<number | null>(null)
  const silenceCounter = useRef(0)

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      analyserRef.current?.disconnect()
      mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop())
    }
  }, [])

  async function prepareRecording(prepSeconds = 3, maxSeconds = 40) {
    setState('preparing')
    setPreSeconds(prepSeconds)
    setTimeLeft(maxSeconds)

    let sec = prepSeconds
    const t = setInterval(() => {
      sec -= 1
      setPreSeconds(sec)
      if (sec <= 0) {
        clearInterval(t)
        startRecording(maxSeconds)
      }
    }, 1000)
  }

  async function startRecording(maxSeconds = 40) {
    setState('recording')
    setTimeLeft(maxSeconds)
    chunksRef.current = []

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const audioCtx = new AudioContext()
    const src = audioCtx.createMediaStreamSource(stream)
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048
    src.connect(analyser)
    analyserRef.current = analyser

    const options: MediaRecorderOptions = { mimeType: 'audio/webm' }
    const mr = new MediaRecorder(stream, options)
    mediaRecorderRef.current = mr

    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    mr.onstop = () => {
      const b = new Blob(chunksRef.current, { type: 'audio/webm' })
      setAudioBlob(b)
      setState('completed')
    }

    mr.start()

    // analyser loop for silence detection and visualizer consumers
    const buffer = new Uint8Array(analyser.frequencyBinCount)
    let remaining = maxSeconds

    function loop() {
      analyser.getByteTimeDomainData(buffer)
      // compute RMS-ish level
      let sum = 0
      for (let i = 0; i < buffer.length; i++) {
        const v = buffer[i] - 128
        sum += v * v
      }
      const rms = Math.sqrt(sum / buffer.length) / 128

      if (rms < 0.02) {
        silenceCounter.current += 1 / 60
      } else {
        silenceCounter.current = 0
      }

      if (silenceCounter.current >= 3) {
        // stop due to 3s silence
        stopRecording()
        return
      }

      // tick
      if (remaining > 0) {
        remaining -= 1 / 60
        setTimeLeft(Math.max(0, Math.ceil(remaining)))
        if (remaining <= 0) {
          stopRecording()
          return
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setState('completed')
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  return {
    state,
    preSeconds,
    timeLeft,
    audioBlob,
    analyser: analyserRef.current,
    prepareRecording,
    startRecording,
    stopRecording
  }
}

export default usePTEAudioRecorder
