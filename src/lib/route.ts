/**
 * Fractional (0-100) position of each section on the route rail.
 * Mirrors the real scroll offsets so ports sit where the page actually is.
 */
export function computeRailPositions(offsets: number[], headerHeight: number, maxScroll: number) {
  if (maxScroll <= 0) {
    return offsets.map((_, index) => (offsets.length > 1 ? (index / (offsets.length - 1)) * 100 : 0))
  }

  return offsets.map((offset, index) => {
    const target = index === 0 ? 0 : offset - headerHeight
    const fraction = Math.min(1, Math.max(0, target / maxScroll))
    return Math.round(fraction * 1000) / 10
  })
}
