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
      name: '',
      email: '',
      password: '',
  }
}
        
handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    console.log(this.state)}


handleSignUp = (ev) => {
    console.log(ev)
    ev.preventDefault()
    let username = this.state.username
    let name = this.state.name
    let email = this.state.email
    let password = this.state.password
    console.log("password:", password)
    let payload =  {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user:{
            username: username,
            name: name,
            password: password,
            email: email}
        })
    }
    console.log("payload body:", payload.body)

    fetch(`${API_ROOT}/users`, payload)
        .then(res => res.json())
        .then(json => {
            if (json && json.jwt) {
                console.log("after create json:",json)
                document.getElementById("signupForm").reset();
                // let base64Url = json.jwt.split('.')[1];
                // let base64 = base64Url.replace('-', '+').replace('_', '/');
                // let userInfo =  JSON.parse(atob(base64));
                // console.log(userInfo)
                // this.saveToken(json.jwt)
                // this.setState({isLoggedIn:true})
                
            } else {
                console.log("failed",json)
            }
        })
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
            <div >
                <Form id={'signupForm'} onSubmit={this.handleSignUp}>
                    <Form.Group>
                            <div className="field">

                                <Form.Input label='Username' placeholder='Username' name='username' value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div className="field">
                            <Form.Input label='name' placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange} />
                            </div>
                    </Form.Group>
                    <Form.Group>
                            <div className="field">
                            <Form.Input label='E-mail Address' placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <div className="field">
                            <Form.Input type='password' label='Password' placeholder='Password' name='password' value={this.state.password} onChange={this.handleChange} />
                            </div>
                    </Form.Group>
                    
                    <input className="ui secondary button" type="submit" value="Sign Up" />
                </Form>
            </div>
        
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
  )}
}

export default Login
