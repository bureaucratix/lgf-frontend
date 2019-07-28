import React, {Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Plantcard from '../components/Plantcard'
import {Redirect} from 'react-router-dom'
import { API_ROOT } from '../constants/index';



class PlantContainer extends Component {

    constructor() {
        super()
        this.state = {
            editPlant: null,
            redirect: false
        }

    }

    // componentDidMount(){
    //     this.setState({
    //         plants: this.props.plants
    //     })
    // }

    // componentWillReceiveProps(){
    //     this.setState({
    //         plants: this.props.plants
    //     })
    // }

    

      
   

    handleOnClick = (plant) => {
        this.setState({editPlant:plant, redirect: true});
    }

    render(){

       

        if(this.props.loggedIn === false){
            return <Redirect to="/login" />}
       
        return (
            
            <Card.Group itemsPerRow={2}>
                {(this.props.plants).map(plant=>{
                    return <Plantcard editPlantSubmit={this.props.editPlantSubmit} editPlantChange={this.props.editPlantChange} getToken={this.props.getToken} daysUntilWater={this.props.daysUntilWater} getProfile={this.props.getProfile} waterPlant={this.props.waterPlant} removePlant={this.props.removePlant} setEditPlant={this.props.setEditPlant} plant={plant}/>
                })}
            </Card.Group>
            
        )
    }

}

export default PlantContainer
