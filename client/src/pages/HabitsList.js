import React, { Component } from "react";
// import styles from './HabitsList.module.css';
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
// import {Animated} from "react-animated-css";
// import HabitPage from '../HabitPage/HabitPage';
// import SuccessInfo from '../SuccessInfo/SuccessInfo';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Modal from './Modals/Modal.js';

class HabitsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allhabits: []
        }
       this.idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
       this.id = this.idToken.idToken.claims.sub
    }

    componentDidMount() {
        console.log("hello");

         // var data = API.findHabits(idToken)
        console.log(this.id);
        this.fetchData(this.id);
    }

    fetchData(id) {
        fetch(`api/habits/${this.id}`)
            .then(res => res.json())
            .then((res) => {

                this.setState({ allhabits: res });
                console.log(res);
                // window.location.href= "/habitslist"
            })

    }

    deleteHabit = habitId => {
        API
        .deleteHabit(habitId)
        .then(() => {
            console.log(habitId);
            this.fetchData();
        })
        .catch(err => console.log(err))

    }

    render() {
        return (
            <div>

                <div>
                    <h3>Ongoing habits</h3>

                </div>
                <div>
                    {
                        this.state.allhabits.length > 0 &&

                        this.state.allhabits.map(e =>
                            <div key={e._id}>
                                <p>{e.description}</p>
                                <button
                                    onClick={()=>this.deleteHabit(e._id)}
                                    
                                >
                                    Delete
                                </button>
                            </div>




                        )
                    }
                </div>

                {/* <div >
                  {
                      this.state.allhabits.length > 0 &&
                      this.state.allhabits.map(e =>
                        <p key={e._id}>{e.description}</p>
                    )
                  }
              </div> */}
            </div>

        )
    }
}

export default HabitsList;