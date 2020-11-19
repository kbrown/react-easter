var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var HotKey = require('react-shortcut');


module.exports = createReactClass({
  propTypes: {
    keys: PropTypes.array,
    simultaneous: PropTypes.bool,
    timeout: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ])
  },

  getInitialState: function initialState() {
    return {
      timer: null
    };
  },

  componentDidMount: function didMount() {},

  render: function renderComponent() {
    var props = this.props || {};
    var state = this.state || {};

    var children = props.children || null;
    var timer = state.timer || null;

    if (timer !== null) {
      return children;
    }

    return React.createElement(HotKey, {
      keys: props.keys,
      simultaneous: props.simultaneous,
      onKeysCoincide: this.onKeysCoincide
    }, null);
  },

  onKeysCoincide: function keysCoincide() {
    var props = this.props || {};
    var timeout = props.timeout || null;

    if (timeout) {
      this.setState({
        timer: setTimeout((function resolveTimeout() {
          var state = this.state || {};

          clearTimeout(state.timer);

          this.setState({
            timer: null
          });
        }).bind(this), timeout)
      });
    } else {
      this.setState({
        timer: Number.POSITIVE_INFINITY
      });
    }
  },

  getDefaultProps: function defaultProps() {
    return {
      keys: [],
      simultaneous: false,
      timeout: null
    };
  }
});
