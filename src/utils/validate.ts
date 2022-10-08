import REGEXP from '../consts/REGEXP'

const validateInput = (e: Event): void => {
  const item: HTMLInputElement = e.target as HTMLInputElement
  const expression = REGEXP[item.name].expression
  const check = expression.test(item.value)
  const parent: any = item.parentElement
  const input: HTMLInputElement | null = parent.querySelector('input')
  const inputCount: number = parent.childElementCount

  if (input?.name === item.name) {
    if (!check) {
      item.classList.add('input_error')
      if (inputCount && inputCount < 3) {
        parent.append(addTooltip(REGEXP[item.name].message))
      }
    } else {
      item.classList.remove('input_error')
      if (inputCount && inputCount >= 3) {
        parent.lastChild?.remove()
      }
    }
    if (e.type === 'blur' && item.value.length === 0) {
      setTimeout(() => {
        item.classList.remove('input_error')
      }, 200)
      if (inputCount && inputCount >= 3) {
        parent.lastChild?.remove()
      }
    }
  }
}

const validateSubmit = (data: Record<string, string>): boolean => {
  let isValid = false
  const inputs = document.querySelectorAll('input')

  try {
    for (const [key, value] of Object.entries(data)) {
      if (!REGEXP[key].expression.test(value)) {
        throw {
          field: REGEXP[key].title,
        }
      } else {
        isValid = true

        inputs.forEach(input => {
          input.value = ''
        })
      }
    }
  } catch ({ field }) {
    alert(`В поле ${field} данные указаны некорректно`)
  }
  return isValid
}

const addTooltip = (message: string): HTMLElement => {
  const tooltip = document.createElement('span')
  tooltip.classList.add('tooltip')

  tooltip.innerHTML = message

  return tooltip
}

export { validateInput, validateSubmit }
