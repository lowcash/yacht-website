import { describe, expect, it } from 'vitest'

import { computeRailPositions } from './route'

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
