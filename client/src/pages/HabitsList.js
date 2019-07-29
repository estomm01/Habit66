import React, { Component } from "react";
import API from '../utils/API';
import { Button, Card, Icon } from 'semantic-ui-react'
import { ProgressBar } from 'react-bootstrap';
import Calendar from 'react-calendar';
// import styles from './HabitsList.module.css';
// import {Animated} from "react-animated-css";
// import HabitPage from '../HabitPage/HabitPage';
// import SuccessInfo from '../SuccessInfo/SuccessInfo';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';

import { Link } from "react-router-dom";
// import Modal from './Modals/Modal.js';
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";

class HabitsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habits: []
        }
       this.idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
       this.id = this.idToken.idToken.claims.sub
    }

    componentDidMount() {
        console.log("hello");

         // var data = API.findHabits(idToken)
        console.log(this.id);
        // this.fetchData(this.id);
        this.loadHabits();
    }

    loadHabits = () => {
        API.getHabits()
          .then(res =>
            this.setState({ habits: res.data, name: "", description: "", duration: "" })
          )
          .catch(err => console.log(err));
    };

    deleteHabit = id => {
        API.deleteHabit(id)
          .then(res => this.loadHabits())
          .catch(err => console.log(err));
    };

    completeHabit = id => {
      console.log(`complete habit for ${id}`);
      
    }



      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    // fetchData(id) {
    //     fetch(`api/habits`)
    //         .then(res => res.json())
    //         .then((res) => {

    //             this.setState({ allhabits: res });
    //             console.log(res);
    //             // window.location.href= "/habitslist"
    //         })

    // }

    // deleteHabit = habitId => {
    //     API
    //     .deleteHabit(habitId)
    //     .then(() => {
    //         console.log(habitId);
    //         this.fetchData();
    //     })
    //     .catch(err => console.log(err))

    // }

    render() {
        return (
            <>
            <div id="main-div">
            <h1 className="text-center text-light">My HabitsLit</h1>

            {this.state.habits.length ? (
                // console.log(this.state.allhabits.length)

                <div id="main-div">
                {this.state.habits.map(habit => (

                        <Card key={habit._id} className="ml-auto mr-auto mt-5 mb-5">
                        <Card.Content header={habit.name} />
                        <Card.Content description={habit.description} />
                        <Card.Content extra>
                        <Icon name='user' />
                            { habit.duration }
                        <ProgressBar animated now={45} />
                        </Card.Content>
                        <Button circular positive icon='check' onClick={() => this.completeHabit(habit._id)} />
                        <Button circular negative icon='delete' onClick={() => this.deleteHabit(habit._id)} />
                        </Card>
                ))}
                <Calendar />
                </div>

            ) : (
              <h3>No Results to Display</h3>
            )}

            </div>
            </>
        )
    }
}

export default HabitsList;
