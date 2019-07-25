import React from "react";
import { Link } from "react-router-dom";
import { elastic as Menu } from 'react-burger-menu';
import { Icon } from 'semantic-ui-react';
import "./style.css";


class Nav extends React.Component {
  showSettings (event) {
    event.preventDefault();

  }

  render () {
    return (
      <Menu>
        {/* <img src="../../assets/images/Habits661.svg"></img> */}
        <a id="home" className="menu-item" href="/"><Icon name='home' />Home</a>
        <a id="about" className="menu-item" href="/habitsPage"><Icon name='list layout' />Habits</a>
        <a id="contact" className="menu-item" href="/books">Books</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

export default Nav;
