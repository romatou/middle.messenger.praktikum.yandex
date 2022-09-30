import Block from '../../modules/Block'
import template from './template.hbs'

interface AvatarProps {
  image: string
  name?: string
}

export default class Avatar extends Block<AvatarProps> {
  constructor (props: AvatarProps) {
    super('div', props)
  }

  render () {
    return this.compile(template, {
      image: this.props.image,
      name: this.props.name
    })
  }
}
