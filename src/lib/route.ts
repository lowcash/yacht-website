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

/**
 * Rail progress (0-100) for a scroll position: piecewise-linear through the
 * (scroll at which a section becomes active) -> (port position) stops, so the
 * line reaches a port exactly when that section turns active and is 0 on the hero.
 */
export function computeRailProgress(scrollY: number, stopScroll: number[], stopPos: number[]) {
  if (stopScroll.length === 0 || scrollY <= stopScroll[0]) {
    return 0
  }
  for (let index = 1; index < stopScroll.length; index += 1) {
    if (scrollY <= stopScroll[index]) {
      const span = stopScroll[index] - stopScroll[index - 1]
      const t = span > 0 ? (scrollY - stopScroll[index - 1]) / span : 1
      return stopPos[index - 1] + t * (stopPos[index] - stopPos[index - 1])
    }
  }
  return stopPos[stopPos.length - 1]
}
