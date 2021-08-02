import React from 'react'
const useAudio = (url) => {
  const [audio, setAudio] = React.useState()
  const [playing, setPlaying] = React.useState(false)
  React.useEffect(() => {
    const audio = new Audio(url)
    audio.loop = true
    setAudio(audio)
  }, [])

  const toggle = () => setPlaying(!playing)

  React.useEffect(() => {
    playing ? audio?.play() : audio?.pause()
  }, [playing])

  React.useEffect(() => {
    audio?.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio?.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return [playing, toggle]
}
export default useAudio
