import React, { Component } from "react";

export default class ControlledInput extends Component {
  constructor(props) {
    super(props);
    this.allowedChars = props.allowedChars
      ? new RegExp(props.allowedChars)
      : "";
    this.onChange = this.onChange.bind(this);
  }

  onChange({ target: { value = "" } }) {
    const input = value.trim();
    if (this.isValidInput(input)) {
      this.props.onChange(input);
    } else {
      this.props.onChange(this.props.value);
    }
  }

  isValidInput(input) {
    if (input && this.allowedChars) {
      return this.allowedChars.test(input);
    } else {
      return true;
    }
  }

  render() {
    return <input value={this.props.value} onChange={this.onChange} />;
  }
}
