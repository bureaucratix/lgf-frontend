import React, {Component} from 'react'
import { API_ROOT } from '../constants/index';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class  Login extends Component {  

  constructor() {
    super()
    this.username = React.createRef()
    this.password = React.createRef()

    this.state = {
      username: '',
      isLoggedIn: false
  }
}
        
  handleSubmit = (event) => {
    event.preventDefault();
    let username = event.target[0].value
    let name = event.target[1].value
    let email = event.target[2].value
    let password = event.target[3].value
    fetch(`${API_ROOT}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
    },
        body: JSON.stringify({
            username: username,
            name: name,
            password: password,
            email: email
        })

    }
    ).then(
        setTimeout(() => {
            this.login()
        }, 1000))
}


login = (ev) => {
    ev.preventDefault()
    console.log(ev)

    let username = this.username.current.value
    let password = this.password.current.value
    console.log(username, password)
    fetch(`${API_ROOT}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { username, password } })
    })
        .then(res => res.json())
        .then(json => {
            console.log('login:', json)
            if (json && json.jwt) {
                // let base64Url = json.jwt.split('.')[1];
                // let base64 = base64Url.replace('-', '+').replace('_', '/');
                // let userInfo =  JSON.parse(atob(base64));
                // console.log(userInfo)
                this.saveToken(json.jwt)
                this.props.getProfile()
                this.setState({isLoggedIn:true})
            } else {
                alert(json.message)
            }
        })
}


saveToken = (jwt) => {
    localStorage.setItem('jwt', jwt)
}


render(){
    if(this.state.isLoggedIn){
        return <Redirect to="/" />}

  return(
      
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <form onSubmit={this.login}>
                    <div className="ui form">
                        <div className="fields">
                            <div className="field">
                                <label>Username</label>
                                <input id='username' placeholder='Username' ref={this.username}  />
                            </div>
                        </div>
                        <div className="fields">
                            
                            <div className="field">
                                <label>Password</label>
                                <input id='password' type='password' placeholder='Password' ref={this.password} />
                            </div>
                        </div>
                    </div>
                   
                   
                    <input className="ui secondary button" type="submit" value="Log In" />
                </form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
  
   
        {this.state.isLoggedIn === true?
             <Redirect to="/" />:
            <div className="">
                <form onSubmit={this.handleSignUp}>
                    <div className="ui form">
                        <div className="fields">
                            <div className="field">
                                <label>Username</label>
                                <input type="text" placeholder="username" id="usernameSignup" />
                            </div>
                            <div className="field">
                                <label>Name</label>
                                <input type="text" placeholder="name" id="nameSignup"/>
                            </div>
                        </div>
                    </div>
                    <div className="ui form">
                        <div className="fields">
                            <div className="field">
                                <label>Email</label>
                                <input type="text" placeholder="email" id="emailSignup"/>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="password" placeholder="password" id="passwordSignup" />
                            </div>
                        </div>
                    </div>
                    {/* <input  type="text" placeholder="username" id="username" />
                    <input type="text" placeholder="name"  id='name'/>
                    <input type="text" placeholder="email" id ="email"/>
                    <input type="password" placeholder="password"  id="password"/> */}
                    <input className="ui secondary button" type="submit" value="Sign Up" />
                </form>
            </div>
        }
        
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
  )}
}

export default Login
