import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Button } from 'semantic-ui-react'
import HomeImage from "../assets/images/checklist.svg";
import LogoImage from "../assets/images/Habits66.png"
import "../App.css"
// import App from "../components/Charts.js";
import Charts from "../components/Charts/index.js";

export default withAuth(
  class Home extends Component {
    state = { authenticated: null };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login('/');
    };

    logout = async () => {
      this.props.auth.logout('/');
    };

    render() {
      if (this.state.authenticated === null) return null;

      const mainContent = this.state.authenticated ? (
        <div>
          <p className="lead">
            Lets form good HABITS,{' '}
            <Link to="/habitsPage">click here</Link>
          </p>
          <Button circular className="btn btn-light btn-lg" onClick={this.logout}>
            Logout
          </Button>
        </div>
      ) : (
          <div>
            <h3 className="lead">
              Welcome to Habits
          </h3>
            <Button circular className="btn btn-light btn-lg" onClick={this.login}>
              Login
          </Button>
          </div>
        );

      return (
        <div className="text-light text-center" id="main-div">
          <img src={LogoImage} width={350} height={50} className="img-fluid logo-animation" alt="Habits66"></img>
          <h1 className="display-4">40% of our daily lives are Habits</h1>
          {mainContent}



        </div>
      );
    }
  }
);
