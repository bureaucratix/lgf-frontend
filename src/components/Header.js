import React, {Component} from 'react'
import { Header, Icon, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Link } from "react-router-dom";


class  CustomHeader extends Component{

render () {
    return (
        <div >
        <div className="float-left">
            <Link to="/">
            <Button animated>
            <Button.Content visible>Main Page</Button.Content>
            <Button.Content hidden>
                <Icon name='arrow left' />
            </Button.Content>
            </Button>
            </Link>
        </div>

        <div className="float-right">
        <Link to="/add">
            <Button animated>
            <Button.Content visible>Add New Plant</Button.Content>
            <Button.Content hidden>
                <Icon name='plus' />
            </Button.Content>
            </Button>
            </Link>
        </div>
        <Header textAlign="center" className="banner" as='h2' content={this.props.user ? `Hello, ${this.props.user.name}!` : 'Please log in!'}/>
        </div>
    )
}
} 

export default CustomHeader
