import React, { Component } from 'react';
import Header from '../components/Header';

export default class Drinks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Header title="Bebidas" />
    );
  }
}
