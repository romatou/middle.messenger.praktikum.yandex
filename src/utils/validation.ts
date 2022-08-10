import REGEXP from '../consts/REGEXP'

const inputValidator = (e: Event): void => {
  const item: EventTarget | null = e.target

  if (item && (item as HTMLInputElement).tagName === 'INPUT') {
    const expression = REGEXP[(item as HTMLInputElement).name].expression
    const check = expression.test((item as HTMLInputElement).value)
    const parent = (item as HTMLInputElement).parentElement
    const input: HTMLInputElement = parent?.querySelector(
      'input',
    ) as HTMLInputElement
    const inputCount: number | undefined = parent?.childElementCount

    if (input.name === (item as HTMLInputElement).name) {
      if (!check) {
        ;(item as HTMLInputElement).classList.add('input_error')

        if (inputCount && inputCount < 3) {
          parent?.append(
            addTooltip(REGEXP[(item as HTMLInputElement).name].message),
          )
        }
      } else {
        ;(item as HTMLInputElement).classList.remove('input_error')
        if (inputCount && inputCount >= 3) {
          parent?.lastChild?.remove()
        }
      }
      if (e.type === 'blur' && (item as HTMLInputElement).value.length === 0) {
        setTimeout(() => {
          ;(item as HTMLInputElement).classList.remove('input_error')
        }, 200)
        if (inputCount && inputCount >= 3) {
          parent?.lastChild?.remove()
        }
      }
    }
  }
}

const submitValidator = (e: Event): void => {
  e.preventDefault()
  const inputs = document.querySelectorAll('input')
  const userData = {}
  try {
    inputs.forEach((input) => {
      if (!REGEXP[input.name].expression.test(input.value)) {
        throw {
          field: input.placeholder,
        }
      } else {
        const inputName = input.name
        userData[inputName] = input.value
      }
    })
    inputs.forEach((input) => {
      input.value = ''
    })
    console.log(userData)
  } catch ({field}) {
    alert(`В поле ${field} данные указаны некорректно`)
  }
}

const addTooltip = (message: string): HTMLElement => {
  const tooltip = document.createElement('span')
  tooltip.classList.add('tooltip')

  tooltip.innerHTML = message

  return tooltip
}

export {inputValidator, submitValidator}
