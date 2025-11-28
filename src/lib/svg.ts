// SVG utility functions

export interface LetterDimensions {
  height: string;
  width: string;
  viewBox?: string;
}

const LETTER_DIMENSIONS: Record<string, LetterDimensions> = {
  A: { height: "60vh", width: "10vw", viewBox: "0 0 100 100" },
  I: { height: "100vh", width: "4vw", viewBox: "0 0 40 100" },
  M: { height: "40vh", width: "12vw", viewBox: "0 0 120 100" },
  N: { height: "60vh", width: "8vw", viewBox: "0 0 80 100" },
} as const;

/**
 * Get SVG path for a letter
 */
export function getSvgPath(letter: string): string | null {
  const upperLetter = letter.toUpperCase();
  if (upperLetter in LETTER_DIMENSIONS) {
    return `/svg/${upperLetter}.svg`;
  }
  return null;
}

/**
 * Get all available SVG letters
 */
export function getAvailableLetters(): string[] {
  return Object.keys(LETTER_DIMENSIONS);
}

/**
 * Check if SVG exists for letter
 */
export function hasSvg(letter: string): boolean {
  return letter.toUpperCase() in LETTER_DIMENSIONS;
}

/**
 * Get dimensions for a letter
 */
export function getLetterDimensions(letter: string): LetterDimensions | null {
  const upperLetter = letter.toUpperCase();
  return LETTER_DIMENSIONS[upperLetter] || null;
}

/**
 * Preload SVG assets
 */
export function preloadSvgs(letters: string[]): void {
  letters.forEach(letter => {
    const path = getSvgPath(letter);
    if (path) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = path;
      document.head.appendChild(link);
    }
  });
}