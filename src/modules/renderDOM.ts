function renderDOM(query: string, block: any) {
  const root = document.querySelector(query)

  if (!root) {
    throw Error('Root is undefined')
  }

  root.innerHTML = ''
  root.appendChild(block.getContent() as HTMLElement)
  block.dispatchComponentDidMount()
}

export default renderDOM
