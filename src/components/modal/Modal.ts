import Block from '../../modules/Block'
import template from './template.hbs'
import './Modal.scss'
import Icon, { IIcon } from '../../components/icon/Icon'
import closeIcon from '../../../static/icons/close.png'

interface IModal {
  content: any
  icon: IIcon
}

export default class Modal extends Block<IModal> {
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
