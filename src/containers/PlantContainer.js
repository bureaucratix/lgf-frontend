import React, {Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Plantcard from '../components/Plantcard'
import {Redirect} from 'react-router-dom'
import noplants from '../images/noplants.png'



class PlantContainer extends Component {

    constructor() {
        super()
        this.state = {
            editPlant: null,
            redirect: false
        }

    } 
   
    handleOnClick = (plant) => {
        this.setState({editPlant:plant, redirect: true});
    }

    render(){

        if(this.props.isLoggedIn === false){
            return <Redirect to="/login" />}
       
        return (
            <>
            {this.props.plants.length > 0 ?   
                <Card.Group itemsPerRow={2}>
                {(this.props.plants).map(plant=>{
                    return <Plantcard key={plant.id} editPlantSubmit={this.props.editPlantSubmit} editPlantChange={this.props.editPlantChange} getToken={this.props.getToken} daysUntilWater={this.props.daysUntilWater} getProfile={this.props.getProfile} waterPlant={this.props.waterPlant} removePlant={this.props.removePlant} setEditPlant={this.props.setEditPlant} plant={plant}/>
                })}
                </Card.Group>
            :
                <div>
                <img src={noplants} alt="No plants here"/>
                </div>
            }
            </>
        )
    }

}

export default PlantContainer
