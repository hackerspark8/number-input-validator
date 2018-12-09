import React from "react";
import "./App.css";

import ControlledInput from "../Controlled-Input/Controlled-Input";
import Notification from "../Notification/Notification";

const REG_EXP = /^(?:[\d]+|([-,\s])(?!\1))+$/;

const ORIGINAL_LIST = [1, 2, 3, 4, 5];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputList: [],
      inputValue: "",
      duplicates: [],
      newOnes: []
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.performDiff = this.performDiff.bind(this);
  }

  onChangeInput(value) {
    const values = this.extractValues(value);
    this.setState(
      Object.assign(this.state, { inputList: values, inputValue: value })
    );
  }

  extractValues(value = "") {
    const inputValues = value.split(",");
    let values = [];
    for (let inputValue of inputValues) {
      const val = inputValue.trim();
      if (val.indexOf("-") > 0) {
        const rangeValues = this.extractRange(val);
        values = [...values, ...rangeValues];
      } else if (val && !isNaN(val)) {
        values.push(parseInt(val, 10));
      }
    }
    return values;
  }

  extractRange(value = "") {
    const inputValues = value.split("-");
    let values = [];
    if (inputValues.length !== 2) {
      return [];
    } else {
      const firstValue = parseInt(inputValues[0], 10);
      const lastValue = parseInt(inputValues[1], 10);
      let min = firstValue <= lastValue ? firstValue : lastValue;
      let max = min === firstValue ? lastValue : firstValue;
      while (min <= max) {
        values.push(min++);
      }
      return values;
    }
  }

  performDiff(value) {
    this.onChangeInput(value);
    let duplicates = [];
    let newOnes = [];
    for (let value of this.state.inputList) {
      if (ORIGINAL_LIST.includes(value)) {
        duplicates.push(value);
      } else {
        newOnes.push(value);
      }
    }
    this.setState(Object.assign(this.state, { duplicates, newOnes }));
  }

  render() {
    return (
      <div>
        <label>Original List: {ORIGINAL_LIST.join(",")}</label>
        <div>
          <label>Input List: </label>
          <ControlledInput
            onChange={this.performDiff}
            value={this.state.inputValue}
            allowedChars={REG_EXP}
          />
        </div>
        <div>
          <Notification
            heading="Duplicates"
            notifications={this.state.duplicates}
          />
          <Notification
            heading="New Additions"
            notifications={this.state.newOnes}
          />
        </div>
      </div>
    );
  }
}
