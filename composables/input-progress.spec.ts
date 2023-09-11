import { describe, it, expect, vi } from 'vitest'
import { useGetProgress } from './input-progress'
import { flushPromises } from '@vue/test-utils'

describe('useGetProgress', () => {
  it('should work', async function () {
    const { getProgress } = useGetProgress()
    const meow = await getProgress({ validate: () => false }, ['required'], toRef(0))
    await flushPromises()
    console.log('input progress => ', meow)
  })
})
