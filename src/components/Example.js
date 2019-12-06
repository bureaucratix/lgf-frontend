import React, {Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Plantcard from '../components/Plantcard'
import {Redirect} from 'react-router-dom'
import noplants from '../images/noplants.png'



class Example extends Component {

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
       
        return (
             <div>
                Hello
             </div>
        )
    }

}

export default Example
