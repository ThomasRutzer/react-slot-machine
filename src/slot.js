import React from "react"
import anime from "animejs"

import slotStyles from "./slot.module.scss"
import Symbol from "./symbol"

export default class Slot extends React.Component {
  constructor(props) {
    super(props)

    this.$symbols = React.createRef()
    this.state = { complete: null }
  }

  componentDidMount() {
    window.addEventListener("resize", this.reset.bind(this))
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.spin && this.props.spin) {
      this.reset()
      this.start()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.reset.bind(this))
  }

  render() {
    return (
      <div ref={ this.$symbols } className={ slotStyles.slot }>
        { this.props.symbols.map((symbol, index) =>
          <Symbol
            key={ index }
            evaluated={ this.state.complete && index === this.props.symbols.length - 2 }
            symbol={ symbol }
            evaluatedStyleClass={ this.props.symbolEvaluatedStyleClass }
            defaultStyleClass={ this.props.symbolDefaultStyleClass } />
        ) }
      </div>
    )
  }

  reset() {
    this.setState({ complete: false })
    anime({
      targets: this.$symbols.current,
      translateY: 0,
      duration: 0,
    })
  }

  start() {
    anime({
      targets: this.$symbols.current,
      translateY: `-${this.$symbols.current.offsetHeight / 3 *
        (this.props.symbols.length - 3)}px`,
      duration: 2000,
      easing: "easeInOutQuad",
      delay: this.props.slotIndex * 500,
      complete: () => {
        this.setState(
          { complete: true },
          this.props.evaluate(
            this.props.slotIndex,
            this.props.symbols[this.props.symbols.length - 2]
          )
        )
      },
    })
  }
}
