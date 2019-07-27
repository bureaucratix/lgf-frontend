import React, {Component} from 'react';
import { Loader } from 'semantic-ui-react'
import { API_ROOT } from '../constants/index.js';
import Login from '../components/Login.js'
import PlantContainer from '../containers/PlantContainer.js'
import NewPlant from '../components/NewPlant'

import '../App.css';
import CustomHeader from '../components/Header.js'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'


class MainContainer extends Component {


    //-----Things that were in Login.js, maybe want them here to pass info to Header to display name and logout option-----
    constructor() {
        super()

        this.state = {
            editPlant:null,
        }

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
        // if (!this.state.isLoggedIn){
        //     return <Login loginreload={this.reload}/>
        // }

        if(this.props.isLoggedIn===false) {
            return (<div>not logged in</div>)
        }

        return (
            
            <div className="App">
                <main>
                    <div className="ui segment" id="secondary-header">
                    <CustomHeader content={this.state.currentPage} logout={this.logout} user={this.props.user?this.props.user:null}/>
                    </div>

                    <Route exact path='/' render={() => <PlantContainer daysUntilWater={this.props.daysUntilWater} getToken={this.props.getToken} getProfile={this.props.getProfile} waterPlant={this.waterPlant} removePlant={this.props.removePlant} setEditPlant={this.setEditPlant} plants={this.props.plants} isLoggedIn={this.props.isLoggedIn} user={this.props.user}/>}/ >
                    <Route path='/add' render={() => <NewPlant getToken={this.props.getToken} addPlant={this.props.addPlant} isLoggedIn={this.props.isLoggedIn} user={this.props.user} />} />
                    <Route path='/login' render={() => <Login getToken={this.props.getToken} getProfile={this.props.getProfile} loginreload={this.reload}/>} />
                </main>
            </div>
           
        );
    }
}

export default MainContainer;