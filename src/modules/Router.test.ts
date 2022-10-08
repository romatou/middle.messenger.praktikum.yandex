import { expect } from 'chai'
import sinon from 'sinon'
import Router from './Router'
import Block from '../modules/Block'

interface BlockConstructable<P extends Record<string, any>> {
  new(props: P): Block<P>
}

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate == 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }
  global.window.history.forward = () => {
    if (typeof window.onpopstate == 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }

  const getContentFake = sinon.fake.returns(document.createElement('div'))

  const BlockMock = class {
    getContent = getContentFake
  } as unknown as BlockConstructable<any>

  describe('Проверяем метод роутера use()', () => {
    it('Должен возвращать экземпляр роутера', () => {
      const result = Router.use('/', new BlockMock({}))
      expect(result).to.eq(Router)
    })
  })
})
