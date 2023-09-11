import { describe, it, expect, vi } from 'vitest'
import { useGetProgress } from './input-progress'

const { getProgress } = useGetProgress()

describe('useGetProgress', () => {
  it('should work', function () {
    expect(getProgress({ validate: () => false }, ['required'], toRef(0)))
  })
})
