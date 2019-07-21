import React, {Component} from 'react'
import { Header, Icon } from 'semantic-ui-react'


class  CustomHeader extends Component{

render () {
    return (
        <Header textAlign="center" className="banner" as='h2' content={this.props.content}/>
    )
}
} 

export default CustomHeader
