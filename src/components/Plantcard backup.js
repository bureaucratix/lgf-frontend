import React, {Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import placeholderImage from '../images/plant-clipart.png'
import {Link} from 'react-router-dom'
import EditPlantModal from '../components/EditPlantModal'



class Plantcard extends Component {
  

  render(){

    let plant = this.props.plant
    return (
      
      <Card className="center-content">
      <Card.Content>
          <Card.Header>{plant.name} <EditPlantModal reload={this.props.reload} plant={plant}/></Card.Header>
          <Card.Meta>
              <span className='subheader'>{plant.species}</span>
          </Card.Meta>
          <br/>
          <Image className="card-image" src={plant.img_url?plant.img_url:placeholderImage} fit ui={true} />
          <Card.Description>
            {plant.description}
          </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <a>
          <Icon name='leaf' />
          last watered {plant.last_watered_time}
      </a>
      </Card.Content>
      </Card>
     

    )
  }
 
}

export default Plantcard
