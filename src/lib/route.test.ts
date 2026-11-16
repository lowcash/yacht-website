import { describe, expect, it } from 'vitest'

import { computeRailPositions, computeRailProgress } from './route'

describe('computeRailPositions', () => {
  it('maps section offsets to percentages of the scrollable distance', () => {
    expect(computeRailPositions([0, 1000, 2000, 3000], 100, 3000)).toEqual([0, 30, 63.3, 96.7])
  })

  it('clamps to the rail bounds', () => {
    expect(computeRailPositions([0, 50, 5000], 100, 3000)).toEqual([0, 0, 100])
  })

  it('spreads evenly when the page is not scrollable', () => {
    expect(computeRailPositions([0, 0, 0], 60, 0)).toEqual([0, 50, 100])
  })
})

describe('computeRailProgress', () => {
  const scroll = [0, 400, 1200, 2000]
  const pos = [0, 30, 60, 100]

  it('is zero on the hero', () => {
    expect(computeRailProgress(0, scroll, pos)).toBe(0)
  })

  it('reaches a port exactly when its section activates', () => {
    expect(computeRailProgress(400, scroll, pos)).toBe(30)
    expect(computeRailProgress(2000, scroll, pos)).toBe(100)
  })

  it('interpolates between ports and clamps past the end', () => {
    expect(computeRailProgress(800, scroll, pos)).toBe(45)
    expect(computeRailProgress(5000, scroll, pos)).toBe(100)
  })
})
