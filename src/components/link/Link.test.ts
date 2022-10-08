import Link from './Link'
import { expect } from 'chai'

describe('Компонент Link', () => {
  it('Должен рендериться', () => {
    new Link({ text: 'Test', to: '/' })
  })

  it('Элемент должен вернуть тэг A', () => {
    const link = new Link({ text: 'Test', to: '/' })
    const element = link.element

    expect(element).to.be.instanceof(window.HTMLDivElement)
  })
})
