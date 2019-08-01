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
        <a id="about" className="menu-item" href="/habitsPage"><Icon name='list layout' />Create Habits</a>
        <a id="habitsList" className="menu-item" href="/habitsList"><Icon name='list ol' />Habits List</a>
        <a id="habitsList" className="menu-item" href="/calendareList"><Icon name='list ol' />Calendar List</a>
        <a id="habitsList" className="menu-item" href="/chart"><Icon name='list ol' />Chart</a>
        {/* <a onClick={ this.showSettings } className="menu-item--small" href=""><Icon name='settings' />Settings</a>
        <a id="contact" className="menu-item" href="/books"><Icon name='book' />Books</a> */}
      </Menu>
    );
  }
}

export default Nav;
