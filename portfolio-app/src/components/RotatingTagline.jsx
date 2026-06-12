import React, { useEffect, useState } from 'react';

/**
 * Typewriter tagline: types out each phrase, pauses, erases it, then moves to
 * the next — looping forever. Add/remove phrases by editing the `phrases` array
 * passed in from the parent.
 */
function RotatingTagline({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 1600,
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return undefined;

    const current = phrases[index % phrases.length];

    // Finished typing the full phrase → pause, then start deleting.
    if (!deleting && text === current) {
      const timer = setTimeout(() => setDeleting(true), pauseTime);
      return () => clearTimeout(timer);
    }

    // Finished deleting → advance to the next phrase.
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return undefined;
    }

    const timer = setTimeout(
      () => {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1)
        );
      },
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <p className="tagline">
      <span className="tagline-text">{text}</span>
      <span className="tagline-cursor" aria-hidden="true">|</span>
    </p>
  );
}

export default RotatingTagline;
