const { render, useState, useEffect, html } = window.standalonePreact
render(html`<${App} />`, document.querySelector('#root'))

function cleanNum(str) {
  return str.replaceAll(',', '').replaceAll(' ', '')
}

function App() {
  return html`
    <h1>🖩 Percentage calculator</h1>
    <h2>Values to percentage</h2>
    <${ValuesToPercentage} />
    <h2>Percentage to value</h2>
    <${PercentageToValue} />
    <${Footer} />
  `
}

function ValuesToPercentage() {
  const [baseValue, setBaseValue] = useState('')
  const [totalValue, setTotalValue] = useState('')

  const result = parseFloat(cleanNum(baseValue)) * 100 / parseFloat(cleanNum(totalValue))
  const isValid = !isNaN(result)
  const readableResult = isValid
    ? (Math.round(result * 1000) / 1000) + '%'
    : baseValue.length > 0 && totalValue.length > 0 ? 'Invalid value' : ''

  return html`
    <section>
      <input
        type="text" value=${baseValue} placeholder="25"
        onInput=${(evt) => setBaseValue(evt.currentTarget.value)}
      />
      <span>on a total of</span>
      <input
        type="text" value=${totalValue} placeholder="100"
        onInput=${(evt) => setTotalValue(evt.currentTarget.value)}
      />
      <span>is</span>
      <input
        type="text" laceholder="25%" readonly
        value=${readableResult}
      />
      <${CopyButton} value=${readableResult} disabled=${!isValid} />
    </section>
  `
}

function PercentageToValue() {
  const [percentage, setPercentage] = useState('')
  const [totalValue, setTotalValue] = useState('')

  const result = parseFloat(cleanNum(percentage)) * parseFloat(cleanNum(totalValue)) / 100
  const isValid = !isNaN(result)
  const readableResult = isValid
    ? (Math.round(result * 1000) / 1000)
    : percentage.length > 0 && totalValue.length > 0 ? 'Invalid value' : ''

  return html`
    <section>
      <input
        type="text" value=${percentage} placeholder="25"
        onInput=${(evt) => setPercentage(evt.currentTarget.value)}
      />% of
      <input
        type="text" value=${totalValue} placeholder="100"
        onInput=${(evt) => setTotalValue(evt.currentTarget.value)}
      />
      <span>is</span>
      <input
        type="text" placeholder="25" readonly
        value=${readableResult}
      />
      <${CopyButton} value=${readableResult} disabled=${!isValid} />
    </section>
  `
}

function CopyButton({ value, disabled }) {
  const [copiedStatus, setCopiedStatus] = useState(null)

  function onClick() {
    navigator.clipboard.writeText(value)
      .then(() => setCopiedStatus('Copied!'))
      .catch((err) => setCopiedStatus('Error'))
      .finally(() => setTimeout(() => setCopiedStatus(null), 1000))
  }

  return html`
    <button disabled=${disabled} onClick=${onClick}>
      ${copiedStatus || 'Copy'}
    </button>
  `
}

function Footer() {
  return html`
    <footer>
      <a target="_blank" href="https://github.com/johansatge/percent">
        GitHub
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </footer>
  `
}