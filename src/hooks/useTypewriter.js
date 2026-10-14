import { useEffect, useState } from 'react'
export function useTypewriter(words) {
 const [text, setText] = useState(words[0])
 useEffect(() => {
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  let timer, index = 0, length = 0, deleting = false
  function tick() {
   const word = words[index]
   length += deleting ? -1 : 1
   setText(word.slice(0, length))
   let delay = deleting ? 40 : 85
   if (length === word.length) { deleting = true; delay = 1600 }
   if (length === 0) { deleting = false; index = (index + 1) % words.length; delay = 250 }
   timer = setTimeout(tick, delay)
  }
  function start() { clearTimeout(timer); if (media.matches) setText(words[0]); else { length = 0; deleting = false; tick() } }
  start(); media.addEventListener('change', start)
  return () => { clearTimeout(timer); media.removeEventListener('change', start) }
 }, [words])
 return text
}
