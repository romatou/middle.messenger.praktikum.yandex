import Block from './Block'

export default function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query)
  root.innerHTML = ''
  root.append(block.getContent())
  block.dispatchComponentDidMount()
  return root
}
