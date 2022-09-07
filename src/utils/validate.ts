import REGEXP from '../consts/REGEXP'

const validateInput = (e: Event): void => {
  const item: HTMLInputElement = e.target
  const expression: object = REGEXP[item.name].expression
  const check: boolean = expression.test(item.value)
  const parent: HTMLElement = item.parentElement
  const input: HTMLInputElement = parent.querySelector('input')
  const inputCount: number = parent.childElementCount

  if (input.name === item.name) {
    if (!check) {
      item.classList.add('input_error')
      if (inputCount && inputCount < 3) {
        parent.append(addTooltip(REGEXP[item.name].message))
      }
    } else {
      item.classList.remove('input_error')
      if (inputCount && inputCount >= 3) {
        parent.lastChild.remove()
      }
    }
    if (e.type === 'blur' && item.value.length === 0) {
      setTimeout(() => {
        item.classList.remove('input_error')
      }, 200)
      if (inputCount && inputCount >= 3) {
        parent.lastChild.remove()
      }
    }
  }
}

const validateSubmit = (e: Event): boolean | undefined => {
  e.preventDefault()

  let isValid = false

  const inputs = document.querySelectorAll('input')
  const userData: object = {}
  try {
    inputs.forEach(input => {
      if (input.name !== 'search') {
        if (!REGEXP[input.name].expression.test(input.value)) {
          throw {
            field: input.placeholder,
          }
        } else {
          isValid = true
          userData[input.name] = input.value
        }
      }
    })

    return isValid
  } catch ({ field }) {
    alert(`В поле ${field} данные указаны некорректно`)
  }
}

const addTooltip = (message: string): HTMLElement => {
  const tooltip = document.createElement('span')
  tooltip.classList.add('tooltip')

  tooltip.innerHTML = message

  return tooltip
}

export { validateInput, validateSubmit }
