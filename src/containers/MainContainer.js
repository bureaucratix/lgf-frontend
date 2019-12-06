import React, {Component} from 'react';
import { Loader } from 'semantic-ui-react'
import { API_ROOT } from '../constants/index.js';
import Login from '../components/Login.js'
import Example from '../components/Example.js'
import Privacy from '../components/Privacy.js'
import PlantContainer from '../containers/PlantContainer.js'
import NewPlant from '../components/NewPlant'

import '../App.css';
import CustomHeader from '../components/Header.js'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'


class MainContainer extends Component {


    constructor() {
        super()

        this.state = {
            editPlant:null,
        }

        this.setEditPlant = this.setEditPlant.bind(this)
    } 

    setEditPlant(plant) {
        
        this.setState({
            editPlant: plant,
            isLoaded: true
        }, ()=>console.log("setting edit plant:", this.state))
      
    }

    editPlantChange = (plant, attribute, value) => {
        if (this.state.editPlant.id === plant.id ){
                this.setState((prevState) => ({
                    editPlant:{
                    ...prevState.editPlant, [attribute]: value}
                }))
                console.log(this.state)
            } else {
                console.log("plant/editplant id mismatch on change")
            }
        }

    editPlantSubmit = (ev, plant) => {
        if (this.state.editPlant.id === plant.id ){ 
            ev.preventDefault()
            let token = this.props.getToken()
        fetch(`${API_ROOT}/plants/${plant.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({plant: this.state.editPlant   }),
        })
            .then(res => res.json() )
            .then(json => {
                console.log(json)
                this.props.getProfile()   

            }
            )
        } else {
            console.log("plant/editplant id mismatch on submit")

        }

    }
   
  

    waterPlant = (plant) => {
        console.log("watering")
        let newWateredTime = new Date().toUTCString()
        plant.last_watered_time = newWateredTime
            let token = this.props.getToken()
        fetch(`${API_ROOT}/plants/${plant.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({plant:plant}),
        })
            .then(res => res.json() )
            .then(json => {
                this.props.getProfile()   
            }
            )
    }

    


    render() {  

        return (
            
            <div className="App">
                <main>
                    <div className="ui segment" id="secondary-header">
                    <CustomHeader isLoggedIn={this.props.isLoggedIn} content={this.state.currentPage} logout={this.props.logout} user={this.props.user?this.props.user:null}/>
                    </div>

                    <Route exact path='/' render={() => <PlantContainer editPlantSubmit={this.editPlantSubmit} editPlantChange={this.editPlantChange} daysUntilWater={this.props.daysUntilWater} getToken={this.props.getToken} getProfile={this.props.getProfile} waterPlant={this.waterPlant} removePlant={this.props.removePlant} setEditPlant={this.setEditPlant} plants={this.props.plants} isLoggedIn={this.props.isLoggedIn} user={this.props.user}/>}/ >
                    <Route exact path='/example' render={() => <Example editPlantSubmit={this.editPlantSubmit} editPlantChange={this.editPlantChange} daysUntilWater={this.props.daysUntilWater} getToken={this.props.getToken} getProfile={this.props.getProfile} waterPlant={this.waterPlant} removePlant={this.props.removePlant} setEditPlant={this.setEditPlant} plants={this.props.plants} isLoggedIn={this.props.isLoggedIn} user={this.props.user}/>}/ >
                    <Route path='/add' render={() => <NewPlant getToken={this.props.getToken} addPlant={this.props.addPlant} isLoggedIn={this.props.isLoggedIn} user={this.props.user} />} />
                    <Route path='/login' render={() => <Login isLoggedIn={this.props.isLoggedIn} login={this.props.login} getToken={this.props.getToken} getProfile={this.props.getProfile} loginreload={this.reload}/>} />
                    <Route path='/privacy' render={() => <Privacy />} />
                </main>
            </div>
           
        );
    }
}

export default MainContainer;