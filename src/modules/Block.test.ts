import Block from './Block'
import { expect } from 'chai'

const template = (props: any) => {
  return props
}

describe('Компонент Block', () => {
  class ComponentMock extends Block<any> {
    constructor(props: any) {
      super('div', props)
    }

    render() {
      return this.compile(template, { props: this.props })
    }
  }

  const component = new ComponentMock({ props: 'Test' })

  it('Метод getContent() возвращает строку', () => {
    const content = component.getContent()

    expect(content).to.be.not.a('string')
  })

  it('Метод setProps() обновляет свойство компонента', () => {
    component.setProps({ props: 'new' })
    const result = component.props.props
    expect(result).to.be.equal('new')
  })
})
