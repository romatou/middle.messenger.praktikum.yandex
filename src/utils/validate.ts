import REGEXP from '../consts/REGEXP'

const validateInput = (e: Event): void => {
  const item: any = e.target
  const expression: any = REGEXP[item.name].expression
  const check: any = expression.test(item.value)
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

const validateSubmit = (data: Record<string, string>): boolean => {
  let isValid = false

  try {
    for (const [key, value] of Object.entries(data)) {
      if (!REGEXP[key].expression.test(value)) {
        throw {
          field: REGEXP[key].title,
        }
      } else {
        isValid = true
      }
    }

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
