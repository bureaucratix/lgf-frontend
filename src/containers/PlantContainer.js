import React, {Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Plantcard from '../components/Plantcard'
import placeholderImage from '../images/plant-clipart.png'

class PlantContainer extends Component {


    render(){
        return (
            <Card.Group itemsPerRow={2}>
                            
                <Card className="center-content">
                    <Card.Content>
                        <Card.Header>Johnny</Card.Header>
                        <Card.Meta>
                            <span className='subheader'>Ficus</span>
                        </Card.Meta>
                        <Image src={placeholderImage} wrapped ui={true} />
                        <Card.Description>
                            Johnny is in a blue pot by the windowsill
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='leaf' />
                        Needs water in 3 days
                    </a>
                    </Card.Content>
                </Card>


                <Card className="center-content">
                    <Card.Content>
                        <Card.Header>Johnny</Card.Header>
                        <Card.Meta>
                            <span className='subheader'>Ficus</span>
                        </Card.Meta>
                        <Image src={placeholderImage} wrapped ui={true} />

                        <Card.Description>
                            Johnny is in a blue pot by the windowsill
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='leaf' color="green" />
                        Needs water in 3 days
                    </a>
                    </Card.Content>
                </Card>
               
                <Card className="center-content">
                    <Card.Content>
                        <Card.Header>Johnny</Card.Header>
                        <Card.Meta>
                            <span className='subheader'>Ficus</span>
                        </Card.Meta>
                        <Image src={placeholderImage} wrapped ui={true} />

                        <Card.Description>
                            Johnny is in a blue pot by the windowsill
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='leaf' />
                        Needs water in 3 days
                    </a>
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }

}

export default PlantContainer
