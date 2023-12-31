import { describe, it, expect } from 'vitest'
import { getIcon } from './icons'

describe('icons', () => {
  it('should test getIcon method', function () {
    expect(getIcon()).toBe(undefined)
    expect(getIcon('color')).toBe('svg:M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z')
  })
})
