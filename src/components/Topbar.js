import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class Topbar extends Component {



    render() {
        return(
            <div className="ui primary pointing menu" id="custom-header">
                <h1 id='header-text'>Little Green Friends</h1>
                <div className="ui item right menu" id="login-box">

                    {this.props.isLoggedIn?
                        <Link onClick={this.props.logout} to="/login"> <h2>Log Out</h2> </Link> 
                        :
                        <Link to="/login"> <h2>Login</h2> </Link> 
                    }                   
                    
                </div>
            </div>

        )
    }
}