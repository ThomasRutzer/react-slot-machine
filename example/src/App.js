import React, { useRef, useState } from "react"
import SlotMachine from "react-slot-machine"

const App = () => {
  const slotMachineRef = useRef()
  const [isSpinning, setIsSpinning] = useState(false)
  const [isJackpot, setIsJackpot] = useState(false)

  const onSpinningEnd = result => {
    setIsSpinning(false)
    setIsJackpot(result)
  }

  const onStartSpinning = () => {
    slotMachineRef.current.spin()
    setIsSpinning(true)
  }

  return (
    <React.Fragment>
      <div className="🤡">
        <SlotMachine
          symbols={ ["1", "2"] }
          symbolDefaultStyleClass="🔦"
          symbolEvaluatedStyleClass="💈"
          initialSymbols={ ["🐵", "🐷", "🐴"] }
          onSpinningEnd={ onSpinningEnd }
          ref={ slotMachineRef } />
      </div>

      { !isSpinning && isJackpot &&
        <div className="🎉">
          🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
        </div>
      }

      <div className="🧱">
        <button
          disabled={ isSpinning ? "disabled" : null }
          onClick={ onStartSpinning }>
          Spin to Win!
        </button>
      </div>
    </React.Fragment>
  )
}

export default App
