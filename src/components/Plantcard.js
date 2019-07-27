import React, {Component} from 'react'
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react'
import placeholderImage from '../images/plant-clipart.png'
import {Link} from 'react-router-dom'
import EditPlantModal from '../components/EditPlantModal'
import dogIcon from '../images/dog-icon.svg'
import catIcon from '../images/cat-icon.svg'
import toxicIcon from '../images/toxic-icon.jpg'
import okIcon from '../images/ok-icon.png'

class Plantcard extends Component {
  
  constructor(){
    super()
    this.state={
      plant: null
     
    }
  }

  lastWateredToDate = (time) => {
    if (!time){
      return "Never! Oh no..."
    }
    const today = new Date()
    
    let todaySplit = today.toDateString().split(" ").slice(1, 4)    
    let displayDateSplit = time.split(" ").slice(1, 4)
    let displayDate = displayDateSplit.join(" ")
    let displayTimeSplit = time.split(" ")
    let displayTime = displayTimeSplit[4].split(":")
   
    if (todaySplit[0] === displayDateSplit[1] && todaySplit[1] === displayDateSplit[0] && todaySplit[2] === displayDateSplit[2] ) {
      return `Today at ${displayTime[0]}:${displayTime[1]} (${displayTimeSplit[5]})`
    }else{
      return `${displayDate} at ${displayTime[0]}:${displayTime[1]} (${displayTimeSplit[5]})`
    }
}

  componentDidMount(){
    this.setState({
      plant: this.props.plant
    })

  }

  leafColor = () => {
    if (this.props.plant.last === null){
      return "green"
    }
    if(this.props.daysUntilWater(this.props.plant) < 1) {
      return "red"
    } 
    if(this.props.daysUntilWater(this.props.plant) > 3) {
      return "green"
    } 
    return "yellow"
     
  }

  handleWater = () => {
    console.log("handling water")
    this.props.waterPlant(this.props.plant)
  }

  render(){

    return (
      
      <Card className="center-content">
      <Card.Content>
          <Card.Header>{this.props.plant.name} <EditPlantModal getToken={this.props.getToken} getProfile={this.props.getProfile}
           removePlant={this.props.removePlant} plant={this.props.plant}/></Card.Header>
          <Card.Meta>
              <span className='subheader'>{this.props.plant.species}</span>
          </Card.Meta>
          <br/>
          <Image className="card-image" src={this.props.plant.img_url?this.props.plant.img_url:placeholderImage} fit ui={true} />
        
          <Card.Description>
            {this.props.plant.description}
            <br/><br/>
          <Button onClick={this.handleWater} primary as='div' labelPosition='right'>
          <Button primary icon>
            <Icon name='shower' />
            </Button>
            
            <Label as='a' basic>
            I Watered {this.props.plant.name}!
            </Label>
            
          </Button>
          </Card.Description>

      </Card.Content>
      <Card.Content extra>
          Next Watering : {this.props.daysUntilWater(this.props.plant)} Days!  
          <Icon name='leaf' color={this.leafColor()} />
          <Icon name='leaf' color={this.leafColor()} />
          <Icon name='leaf' color={this.leafColor()} />
            Last Watered {this.lastWateredToDate(this.props.plant.last_watered_time)}
      </Card.Content>
      <Card.Content extra>
        <div className="toxicity-info">
        <div className="float-left padding">
      <Image left circular src={dogIcon} size='mini' />
      
      <Image left-floated circular src={this.props.plant.toxicity==="Not Toxic" || this.props.plant.toxicity === "Toxic to Cats"?okIcon:toxicIcon} size='mini' />
        </div>
        Toxicity to Pets
        <div className="float-right padding">
      <Image float left circular src={catIcon} size='mini' />
      <Image circular src={this.props.plant.toxicity==="Not Toxic" || this.props.plant.toxicity === "Toxic to Dogs"?okIcon:toxicIcon} size='mini' />
      </div>
      </div>
      </Card.Content>
      </Card>
     

    )
  }
 
}

export default Plantcard
