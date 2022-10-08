import { expect } from 'chai'
import set from './set'

describe('Тест функции Set', () => {
  it('Оно должно установить значение по пути', () => {
    const obj = {}
    const keypath = 'test'
    const value = 'some value'

    set(obj, keypath, value)

    expect(obj).to.haveOwnProperty(keypath, value)
  })

  it('Должен вернуть исходный объект', () => {
    const obj = {}
    const keypath = 'test'
    const value = 'some value'

    const result = set(obj, keypath, value)

    expect(result).to.equal(obj)
  })
})
