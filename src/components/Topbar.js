import React, {Component} from 'react'
import { Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class Topbar extends Component {



    render() {
        return(
            <div className="ui primary pointing menu leaf-bg" id="custom-header">
                <h1 id='header-text'>Little Green Friends</h1>
                <div className="ui item right menu" id="login-box">

                    
                       <Button> <Link to="/login"> <h2>Login</h2> </Link> 
                       </Button>
                                    
                    
                </div>
            </div>

        )
    }
}