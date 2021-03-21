# React Slot Machine

![Example](https://raw.githubusercontent.com/ThomasRutzer/react-slot-machine/master/example/example.png)
[See live](https://thomasrutzer.github.io/404)

```
npm install github:thomasrutzer/react-slot-machine#v1.0.2
```

## Props

| Property         | Description                                           | Type     | Default                                           |
| -----------------| ----------------------------------------------------- | -------- | --------------------------------------------------|
| ref              | Exposed ref                                | React.ref|null                                               |
| symbols          | Symbols in use                 | String[] |["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] |
| initialSymbols   | the result of the initial spin                        | String[] |["0", "1", "2"]                                    |
| symbolsPerSlot   | Amount of symbols per slot                            | Number   |20                                                 |
| symbolDefaultStyleClass | Class which will be added to slot DOM element         | String   |"slotMachine__symbol"   
| symbolEvaluatedStyleClass | Class which will be added after a symbol is evaluated         | String   |"slotMachine__symbol--evaluated"                              |
| onSpinningEnd    | Callback which will be invoked with result after spin | Function   |() => {}                                           |

## Usage

```js
<SlotMachine
  symbols={ ["🐵", "🐷", "🐴"] }
  symbolDefaultStyleClass="🔦"
  symbolEvaluatedStyleClass="💈"
  initialSymbols={ ["🐵", "🐷", "🐴"] }
  onSpinningEnd={ onSpinningEnd }
  ref={ slotMachineRef } />
```

Use `ref` to start spinning by calling exposed method `spin`

## Local Development

Run a local version of rollup that will watch your `src/` component and automatically recompile it into `dist/` whenever you make changes.

```bash
npm link # the link commands are important for local development
npm install # disregard any warnings about missing peer dependencies
npm start # runs rollup with watch flag
```

Run `example/` create-react-app that's linked to the local version of your `react-slot-machine`.

```bash
# (in another tab)
cd example
npm link react-slot-machine
npm install
npm start # runs create-react-app dev server
```

## Build

```bash
# note this will build `commonjs` and `es`versions of your module to dist/
npm run build
```
