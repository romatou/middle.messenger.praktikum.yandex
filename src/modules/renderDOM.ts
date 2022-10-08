function renderDOM(query: string, block: any) {
  const root: any = document.querySelector(query)
  root.innerHTML = ''
  root?.appendChild(block.getContent())
  block.dispatchComponentDidMount()
  return root
}

export default renderDOM
