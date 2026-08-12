import type { MotionProps } from "framer-motion";

/** Slow out, no overshoot — the block settles instead of snapping. */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Fire once the element is ~90px past the bottom edge rather than at first pixel.
 * Triggering at the edge meant the animation finished while the block was still
 * arriving, so the reveal was over before it was ever in reading position.
 */
export const revealViewport = { once: true, margin: "-90px" } as const;

export const revealUp: MotionProps = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: { duration: 0.7, ease: EASE },
};

export const revealLeft: MotionProps = {
  initial: { opacity: 0, x: -36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: revealViewport,
  transition: { duration: 0.8, ease: EASE },
};

export const revealRight: MotionProps = {
  initial: { opacity: 0, x: 36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: revealViewport,
  transition: { duration: 0.8, ease: EASE },
};

export const revealScale: MotionProps = {
  initial: { opacity: 0, scale: 0.96, y: 24 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: revealViewport,
  transition: { duration: 0.8, ease: EASE },
};

/**
 * For a block that sits against the bottom of the document — the footer.
 * The -90px margin above shrinks the observer root's bottom edge upward, which
 * is what delays the trigger; but the footer's content never gets 90px above the
 * viewport bottom, because the page stops scrolling first. With the shared
 * config it would sit permanently outside the root and never reveal at all.
 */
export const revealUpAtPageEnd: MotionProps = {
  ...revealUp,
  viewport: { once: true, margin: "0px" },
};

/** Same reveal for items in a list or grid, staggered by position. */
export const revealItem = (i: number): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: { duration: 0.55, ease: EASE, delay: i * 0.09 },
});
