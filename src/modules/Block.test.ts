import Block from './Block'
import { expect } from 'chai'

const template = (props: any) => {
  return props
}

describe('Component Block', () => {
  class ComponentMock extends Block {
    constructor(props: any) {
      super('div', props)
    }

    render() {
      return this.compile(template, { props: this.props })
    }
  }

  const component = new ComponentMock({ props: 'Test' })

  it('method getContent() should return a string', () => {
    const content = component.getContent()

    expect(content).to.be.not.a('string')
  })

  it('method setProps() should update properties', () => {
    component.setProps({ props: 'new' })
    const result = component.props.props
    expect(result).to.be.equal('new')
  })
})
