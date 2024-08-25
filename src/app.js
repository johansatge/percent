const { render, useState, useEffect, html } = window.standalonePreact
render(html`<${App} />`, document.querySelector('#root'))

function App() {
  return html`
    <h1>🖩 Percentage calculator</h1>
    <${ValuesToPercentage} />
    <${PercentageToValue} />
    <${Footer} />
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

function PercentageToValue() {
  return html`
    <section>
      <label>
        <input
          type="text"
          placeholder="25"
        />% of
      </label>
      <label>
        <input
          type="text"
          placeholder="100"
        />
      </label>
      <label>
        <span>is</span>
        <input
          type="text"
          placeholder="25"
          readonly
        />
      </label>
      <button>Copy</button>
    </section>
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