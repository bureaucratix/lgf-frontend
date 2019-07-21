import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


const Plantcard = () => (
  <Card className="centerContent">
    <Image  wrapped ui={false} />
    <Card.Content>
      <Card.Header>Johnny</Card.Header>
      <Card.Meta>
        <span className='subheader'>Ficus</span>
      </Card.Meta>
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
)

export default Plantcard
