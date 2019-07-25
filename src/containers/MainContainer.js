import React, {Component} from 'react';
import { Loader } from 'semantic-ui-react'
import { API_ROOT } from '../constants/index.js';
import Login from '../components/Login.js'
import PlantContainer from '../containers/PlantContainer.js'
import NewPlant from '../components/NewPlant'

import '../App.css';
import CustomHeader from '../components/Header.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'


class MainContainer extends Component {


    //-----Things that were in Login.js, maybe want them here to pass info to Header to display name and logout option-----
    constructor() {
        super()
        this.username = React.createRef()
        this.password = React.createRef()

        this.state = {
            plants:[],
            user: null,
            isLoaded: false,
            isLoggedIn: false,
            editPlant:null,
        }

        if (this.getToken()) {
            this.getProfile()
        } else {
            this.setState({
                isLoaded: true
            })
        }

        this.addPlant = this.addPlant.bind(this);
        this.removePlant = this.removePlant.bind(this);

        // this.logout = this.props.logout.bind(this)
    } 

    setEditPlant(plant) {
        this.setState({            
            isLoaded: false
        })
        setInterval(
        this.setState({
            editPlant: plant,
            isLoaded: true
        })
        .then(console.log(this.state))
        , 1000)
        console.log(this.state)
    }
   
    //Set to true for development; uncomment to test login page
    getToken() {
        return true
        // return localStorage.getItem('jwt')
    } 
   
    getProfile = () => {
        // let token = this.getToken()
        fetch(`${API_ROOT}/profile`
        // ,{headers: {'Authorization': 'Bearer ' + token}}
        )
            .then(res => res.json())
            .then(json => {
                console.log('profile:', json.user.plants)
                this.setState({ isLoaded: true, plants: json.user.plants, user: json.user, isLoggedIn:true })
                this.render()
            })
    }

    waterPlant = (plant) => {
        console.log("watering")
        let newWateredTime = new Date().toUTCString()
        plant.last_watered_time = newWateredTime
            // let token = this.getToken()
        fetch(`${API_ROOT}/plants/${plant.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({plant:plant}),
        })
            .then(res => res.json() )
            .then(json => {
                this.getProfile()   
            }
            )
    }

    addPlant = (p) => {
        this.setState(prevState => {
         
            const newPlantList = prevState.plants.slice();
            newPlantList.push(p)
            return {plants: newPlantList}

            // plants: [...prevState.plants, p.plant ]
         
        })
    }

    removePlant(plant) {
        this.setState({plants: this.state.plants.filter(function(p) { 
            return p !== plant 
        })
        });

    }



    render() {

        if (!this.state.isLoaded) {
            return <Loader />
        }

        return (
            
            <div className="App">
                <main>
                    <div className="ui segment" id="secondary-header">
                    <CustomHeader content={this.state.currentPage} logout={this.logout} user={this.getToken()?this.state.user:null}/>
                    </div>

                    <Route exact path='/' render={() => <PlantContainer getProfile={this.getProfile} waterPlant={this.waterPlant} removePlant={this.removePlant} setEditPlant={this.setEditPlant} plants={this.state.plants} isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>}/ >
                    <Route path='/add' render={() => <NewPlant addPlant={this.addPlant} isLoggedIn={this.state.isLoggedIn} user={this.state.user} />} />
                    <Route path='/login' render={() => <Login loginreload={this.reload}/>} />
                </main>
            </div>
           
        );
    }
}

export default MainContainer;