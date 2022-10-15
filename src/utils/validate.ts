import REGEXP from '../consts/REGEXP'

const validateInput = (e: Event): void => {
  const item = e.target as HTMLInputElement
  const expression = REGEXP[item.name].expression
  const isValid = expression.test(item.value)
  const parent: HTMLElement | null = item.parentElement
  const message = REGEXP[item.name].message

  if (!isValid) {
    item.classList.add('input_error')
    parent?.append(addTooltip(message))
  } else {
    item.classList.remove('input_error')
    parent?.querySelector('.tooltip')?.remove()
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
