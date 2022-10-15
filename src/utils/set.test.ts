import { expect } from 'chai'
import set from './set'

describe('Set', () => {
  it('should set path', () => {
    const obj = {}
    const keypath = 'test'
    const value = 'some value'

    set(obj, keypath, value)

    expect(obj).to.haveOwnProperty(keypath, value)
  })

  it('should return original instance', () => {
    const obj = {}
    const keypath = 'test'
    const value = 'some value'

    const result = set(obj, keypath, value)

    expect(result).to.equal(obj)
  })
})
