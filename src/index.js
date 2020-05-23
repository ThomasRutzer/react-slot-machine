import React from "react"
import SlotMachine from "./slotMachine"

export default React.forwardRef(
  (props, ref) => <SlotMachine ref={ ref } { ...props } />
)
