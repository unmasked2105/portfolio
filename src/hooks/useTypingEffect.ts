import { useState, useEffect } from 'react';

const PHRASES = ['Data Engineer', 'Full-Stack Developer', 'Cloud Enthusiast', 'Pipeline Builder'];

export function useTypingEffect() {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [charI, setCharI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = PHRASES[idx];
    let speed = deleting ? 35 : 75;
    const t = setTimeout(() => {
      if (deleting) {
        setText(cur.slice(0, charI - 1));
        setCharI(c => c - 1);
      } else {
        setText(cur.slice(0, charI + 1));
        setCharI(c => c + 1);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, idx, charI, deleting]);

  useEffect(() => {
    const cur = PHRASES[idx];
    if (!deleting && charI === cur.length) {
      setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charI === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % PHRASES.length);
    }
  }, [charI, deleting, idx]);

  return text;
}
