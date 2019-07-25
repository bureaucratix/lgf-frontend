import React, {Component} from 'react';
import PlantContainer from '../containers/PlantContainer'
import {Redirect} from 'react-router-dom'

class Main extends Component {



    render (){

        if(this.props.loggedIn === false){
            return <Redirect to="/login" />}
        return (

            <PlantContainer getProfile={this.props.getProfile} waterPlant={this.props.waterPlant} reload={this.props.reload} removePlant={this.props.removePlant} setEditPlant={this.props.setEditPlant} plants={this.props.plants} user={this.props.user}/>

        )
    }
}

export default Main;