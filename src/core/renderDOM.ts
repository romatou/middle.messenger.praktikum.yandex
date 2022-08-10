export default function renderDOM(query: string, block) {
  const root = document.querySelector(query)
  root!.innerHTML = ''
  root!.append(block.getContent())
  block!.dispatchComponentDidMount()
  return root
}
