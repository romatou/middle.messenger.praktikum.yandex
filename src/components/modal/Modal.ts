import Block from '../../modules/Block'
import template from './template.hbs'
import './Modal.scss'
import Icon from '../../components/icon/Icon'
import closeIcon from '../../assets/icons/close.png'

export interface IModal {
  content: any
  icon?: Record<string, any>
}

export default class Modal extends Block {
  constructor(props: IModal) {
    super('div', {
      ...props,
      icon: new Icon({
        image: closeIcon,
        className: 'close icon',
        title: 'Иконка закрытия окна',
        events: {
          click: () => {
            this.remove()
          },
        },
      }),
    })
  }

  render() {
    return this.compile(template, {
      content: this.props.content,
      icon: this.props.icon,
    })
  }
}
