import React from "react"
import ReactDOM from "react-dom/client"
import '../sass/index.sass'
import JsCalculatorApp from './Calculator.js'

const root = ReactDOM.createRoot(document.querySelector('.root'))
root.render(<JsCalculatorApp />)