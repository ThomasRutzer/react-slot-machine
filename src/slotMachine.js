import React from 'react'
import Slot from './slot'
import * as utils from './utils'
import slotMachineStyles from './slotMachine.module.scss'

export default class SlotMachine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSpinning: false,
      isJackpot: false
    }

    this.slots = [
      this.createSlot(this.props.initialSymbols[0]),
      this.createSlot(this.props.initialSymbols[1]),
      this.createSlot(this.props.initialSymbols[2])
    ]

    this.prepareSlots(true)
  }

  componentDidMount() {
    this.spin()
  }

  render() {
    return (
      <div className={slotMachineStyles.wrapper}>
        <div className={slotMachineStyles.slotMachine}>
          { this.slots.map((slot, index) =>
            <Slot
              key={index}
              slotIndex={index}
              spin={this.state.isSpinning}
              evaluate={(slotIndex, symbol) => this.saveSingleResult(slotIndex, symbol)}
              symbolDefaultStyleClass={this.props.symbolDefaultStyleClass}
              symbolEvaluatedStyleClass={this.props.symbolEvaluatedStyleClass}
              symbols={slot.symbols} />
          ) }
        </div>
      </div>
    )
  }

  spin() {
    if (!this.state.isSpinning) {
      this.setState({ isSpinning: true, isJackpot: false })
    }
  }

  saveSingleResult(slotIndex, symbol) {
    this.slots[slotIndex].evaluation = symbol

    return this.slots.filter(slot => slot.evaluation === null).length === 0
      ? this.broadcastResult()
      : null
  }

  broadcastResult() {
    const isJackpot = this.slots.every(slot => slot.evaluation === this.slots[0].evaluation)

    this.setState({ isSpinning: false, isJackpot })
    this.props.onSpinningEnd(isJackpot)
    this.prepareSlots(false)
  }

  prepareSlots(initital) {
    this.slots = this.slots.map(slot => ({
      ...slot,
      evaluation: null,
      symbols: !initital
        ? [
          ...slot.symbols.slice(slot.symbols.length - 3, slot.symbols.length),
          ...utils.fillByWithRandomElement(this.props.symbolsPerSlot - 1, this.props.symbols)
        ]
        : [
          ...utils.fillByWithRandomElement(this.props.symbolsPerSlot - 1, this.props.symbols),
          ...slot.symbols.slice(slot.symbols.length - 3, slot.symbols.length)
        ]
    }))
  }

  createSlot(initialSymbol) {
    return {
      symbols: [
        utils.getRandomElementFromList(this.props.symbols),
        initialSymbol,
        utils.getRandomElementFromList(this.props.symbols)
      ],
      evaluation: null
    }
  }
}

SlotMachine.defaultProps = {
  symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  initialSymbols: ['1', '2', '3'],
  symbolsPerSlot: 20,
  symbolDefaultStyleClass: 'slotMachine__symbol',
  symbolEvaluatedStyleClass: 'slotMachine__symbol--evaluated',
  onSpinningEnd: () => {}
}
