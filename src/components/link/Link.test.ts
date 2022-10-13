import Link from './Link'
import { expect } from 'chai'

describe('Component Link', () => {
  it('should render', () => {
    new Link({ text: 'Test', to: '/' })
  })

  it('element should return tag A', () => {
    const link = new Link({ text: 'Test', to: '/' })
    const element = link.element

    expect(element).to.be.instanceof(window.HTMLDivElement)
  })
})
