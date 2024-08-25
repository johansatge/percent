const { render, useState, useEffect, html } = window.standalonePreact
render(html`<${App} />`, document.querySelector('#root'))

function App() {
  return html`
    <h1>📙 Percentage calculator</h1>
    <${ValuesToPercentage} />
  `
}

function ValuesToPercentage() {
  const [baseValue, setBaseValue] = useState('')
  const [totalValue, setTotalValue] = useState('')
  const [copiedStatus, setCopiedStatus] = useState(null)

  const percentage = parseFloat(cleanNum(baseValue)) * 100 / parseFloat(cleanNum(totalValue))
  const isValid = !isNaN(percentage)
  const readablePercentage = isValid
    ? (Math.round(percentage * 1000) / 1000) + '%'
    : baseValue.length > 0 && totalValue.length > 0 ? 'Invalid value' : ''

  function cleanNum(value) {
    return value.replaceAll(',', '').replaceAll(' ', '')
  }

  function onCopyResult() {
    navigator.clipboard.writeText(readablePercentage)
      .then(() => setCopiedStatus('Copied!'))
      .catch((err) => setCopiedStatus('Error'))
      .finally(() => setTimeout(() => setCopiedStatus(null), 1000))
  }

  return html`
    <section>
      <label>
        <input
          type="text"
          value=${baseValue}
          placeholder="25"
          onInput=${(evt) => setBaseValue(evt.currentTarget.value)}
        />
      </label>
      <label>
        <span>on a total of</span>
        <input
          type="text"
          value=${totalValue}
          placeholder="100"
          onInput=${(evt) => setTotalValue(evt.currentTarget.value)}
        />
      </label>
      <label>
        <span>is</span>
        <input
          type="text"
          placeholder="25%"
          readonly
          value=${readablePercentage}
        />
      </label>
      <button disabled=${!isValid} onClick=${onCopyResult}>${copiedStatus || 'Copy'}</button>
    </section>
  `
}