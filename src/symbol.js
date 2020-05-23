import React from "react"
import symbolStyles from "./symbol.module.scss"

const Symbol = ({ symbol, evaluated, defaultStyleClass, evaluatedStyleClass }) =>
  <div
    className={ `
      ${symbolStyles.symbol} 
      ${defaultStyleClass} 
      ${evaluated ? evaluatedStyleClass : ""}`
    }>
    { symbol }
  </div>

export default Symbol
