'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var anime = _interopDefault(require('animejs'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".slot-module_slot__39zq1 {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  align-items: center; }\n";
var slotStyles = { "slot": "slot-module_slot__39zq1" };
styleInject(css);

var css$1 = ".symbol-module_symbol__2mcQp {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 33.333%;\n  width: 100%;\n  font-size: calc(48px + (102 - 48) * ((100vw - 300px) / (1280 - 300))); }\n";
var symbolStyles = { "symbol": "symbol-module_symbol__2mcQp" };
styleInject(css$1);

var _Symbol = function _Symbol(_ref) {
  var symbol = _ref.symbol,
      evaluated = _ref.evaluated,
      defaultStyleClass = _ref.defaultStyleClass,
      evaluatedStyleClass = _ref.evaluatedStyleClass;
  return React.createElement(
    "div",
    {
      className: "\n      " + symbolStyles.symbol + " \n      " + defaultStyleClass + " \n      " + (evaluated ? evaluatedStyleClass : "") },
    symbol
  );
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Slot = function (_React$Component) {
  inherits(Slot, _React$Component);

  function Slot(props) {
    classCallCheck(this, Slot);

    var _this = possibleConstructorReturn(this, (Slot.__proto__ || Object.getPrototypeOf(Slot)).call(this, props));

    _this.$symbols = React.createRef();
    _this.state = { complete: null };
    return _this;
  }

  createClass(Slot, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", this.reset.bind(this));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.spin && this.props.spin) {
        this.reset();
        this.start();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.reset.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { ref: this.$symbols, className: slotStyles.slot },
        this.props.symbols.map(function (symbol, index) {
          return React.createElement(_Symbol, {
            key: index,
            evaluated: _this2.state.complete && index === _this2.props.symbols.length - 2,
            symbol: symbol,
            evaluatedStyleClass: _this2.props.symbolEvaluatedStyleClass,
            defaultStyleClass: _this2.props.symbolDefaultStyleClass });
        })
      );
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({ complete: false });
      anime({
        targets: this.$symbols.current,
        translateY: 0,
        duration: 0
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      anime({
        targets: this.$symbols.current,
        translateY: "-" + this.$symbols.current.offsetHeight / 3 * (this.props.symbols.length - 3) + "px",
        duration: 2000,
        easing: "easeInOutQuad",
        delay: this.props.slotIndex * 500,
        complete: function complete() {
          _this3.setState({ complete: true }, _this3.props.evaluate(_this3.props.slotIndex, _this3.props.symbols[_this3.props.symbols.length - 2]));
        }
      });
    }
  }]);
  return Slot;
}(React.Component);

function getRandomElementFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function fillByWithRandomElement(count, randomElementCollection) {
  return Array.from(Array(count).keys()).reduce(function (acc) {
    return [].concat(toConsumableArray(acc), [getRandomElementFromList(randomElementCollection)]);
  }, []);
}

var css$2 = ".slotMachine-module_wrapper__3ERHR {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0;\n  opacity: 0;\n  width: 100%;\n  height: 100%; }\n\n.slotMachine-module_slotMachine__282LB {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  flex: 1 1 0; }\n";
var slotMachineStyles = { "wrapper": "slotMachine-module_wrapper__3ERHR", "slotMachine": "slotMachine-module_slotMachine__282LB" };
styleInject(css$2);

var SlotMachine = function (_React$Component) {
  inherits(SlotMachine, _React$Component);

  function SlotMachine(props) {
    classCallCheck(this, SlotMachine);

    var _this = possibleConstructorReturn(this, (SlotMachine.__proto__ || Object.getPrototypeOf(SlotMachine)).call(this, props));

    _this.state = {
      isSpinning: false,
      isJackpot: false
    };

    _this.slots = [_this.createSlot(_this.props.initialSymbols[0]), _this.createSlot(_this.props.initialSymbols[1]), _this.createSlot(_this.props.initialSymbols[2])];

    _this.prepareSlots(true);
    _this.slotMachineRef = React.createRef();
    return _this;
  }

  createClass(SlotMachine, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      anime({
        targets: this.slotMachineRef.current,
        duration: 1200,
        opacity: 1,
        easing: "easeInOutQuad",
        complete: function complete() {
          _this2.spin();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        {
          ref: this.slotMachineRef,
          className: slotMachineStyles.wrapper },
        React.createElement(
          "div",
          { className: slotMachineStyles.slotMachine },
          this.slots.map(function (slot, index) {
            return React.createElement(Slot, {
              key: index,
              slotIndex: index,
              spin: _this3.state.isSpinning,
              evaluate: function evaluate(slotIndex, symbol) {
                return _this3.saveSingleResult(slotIndex, symbol);
              },
              symbolDefaultStyleClass: _this3.props.symbolDefaultStyleClass,
              symbolEvaluatedStyleClass: _this3.props.symbolEvaluatedStyleClass,
              symbols: slot.symbols });
          })
        )
      );
    }
  }, {
    key: "spin",
    value: function spin() {
      if (!this.state.isSpinning) {
        this.setState({ isSpinning: true, isJackpot: false });
      }
    }
  }, {
    key: "saveSingleResult",
    value: function saveSingleResult(slotIndex, symbol) {
      this.slots[slotIndex].evaluation = symbol;

      return this.slots.filter(function (slot) {
        return slot.evaluation === null;
      }).length === 0 ? this.broadcastResult() : null;
    }
  }, {
    key: "broadcastResult",
    value: function broadcastResult() {
      var _this4 = this;

      var isJackpot = this.slots.every(function (slot) {
        return slot.evaluation === _this4.slots[0].evaluation;
      });

      this.setState({ isSpinning: false, isJackpot: isJackpot });
      this.props.onSpinningEnd(isJackpot);
      this.prepareSlots(false);
    }
  }, {
    key: "prepareSlots",
    value: function prepareSlots(initital) {
      var _this5 = this;

      this.slots = this.slots.map(function (slot) {
        return _extends({}, slot, {
          evaluation: null,
          symbols: !initital ? [].concat(toConsumableArray(slot.symbols.slice(slot.symbols.length - 3, slot.symbols.length)), toConsumableArray(fillByWithRandomElement(_this5.props.symbolsPerSlot - 1, _this5.props.symbols))) : [].concat(toConsumableArray(fillByWithRandomElement(_this5.props.symbolsPerSlot - 1, _this5.props.symbols)), toConsumableArray(slot.symbols.slice(slot.symbols.length - 3, slot.symbols.length)))
        });
      });
    }
  }, {
    key: "createSlot",
    value: function createSlot(initialSymbol) {
      return {
        symbols: [getRandomElementFromList(this.props.symbols), initialSymbol, getRandomElementFromList(this.props.symbols)],
        evaluation: null
      };
    }
  }]);
  return SlotMachine;
}(React.Component);


SlotMachine.defaultProps = {
  symbols: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  initialSymbols: ["1", "2", "3"],
  symbolsPerSlot: 20,
  symbolDefaultStyleClass: "slotMachine__symbol",
  symbolEvaluatedStyleClass: "slotMachine__symbol--evaluated",
  onSpinningEnd: function onSpinningEnd() {}
};

var index = React.forwardRef(function (props, ref) {
  return React.createElement(SlotMachine, _extends({ ref: ref }, props));
});

module.exports = index;
//# sourceMappingURL=index.js.map
