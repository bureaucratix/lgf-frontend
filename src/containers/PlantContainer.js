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

    daysUntilWater = (plant) =>{
   
        let waterInt = plant.water_interval
        if (plant.last_watered_time === null) {return waterInt}
        let displaySplit = plant.last_watered_time.split(" ").slice(1, 4)
        let lastWater = new Date(displaySplit)
        
        
    
        var oneDay = 24*60*60*1000;
        var todayDate = new Date()
        let lastWaterMilli = lastWater.getTime()-25200000
        let todayMilli = todayDate.getTime()
        // console.log("last watered date", this.props.plant.last_watered_time)
        // console.log("Today's date", todayDate)
        var daysSinceLast = Math.round((lastWaterMilli - todayMilli)/(oneDay)-1);
       
        return waterInt-daysSinceLast
        
      }

      
    sortByDaysLeft = (plantsArr) => {
        let sortedArray = plantsArr.sort((a, b) => this.daysUntilWater(a) - this.daysUntilWater(b));
        return sortedArray
    }

    handleOnClick = (plant) => {
        this.setState({editPlant:plant, redirect: true});
    }

    render(){

       

        if(this.props.loggedIn === false){
            return <Redirect to="/login" />}
       
        return (
            
            <Card.Group itemsPerRow={2}>
                {this.sortByDaysLeft(this.props.plants).map(plant=>{
                    return <Plantcard daysUntilWater={this.daysUntilWater} getProfile={this.props.getProfile} waterPlant={this.props.waterPlant} removePlant={this.props.removePlant} reload={this.props.reload} setEditPlant={this.props.setEditPlant} plant={plant}/>
                })}
            </Card.Group>
            
        )
    }

}

export default PlantContainer
