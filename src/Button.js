import React, { Component } from 'react';

export class Button extends Component {
    handleClick = () => {
      this.props.onClick(this.props.index);
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>{this.props.nota}</button>
      );
    }
  }