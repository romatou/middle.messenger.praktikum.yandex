import Block from './Block'

export default function renderDOM(query: string, block: Block): HTMLElement {
  const root = document.querySelector(query)
  root.innerHTML = ''
  root.append(block.getContent())
  block.dispatchComponentDidMount()
  return root
}
