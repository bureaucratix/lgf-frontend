import React, {Component} from 'react';
import './App.css';
import Topbar from "./components/Topbar"
import MainContainer from "./containers/MainContainer"
import { Header } from 'semantic-ui-react'
import { API_ROOT } from './constants/index';
import {BrowserRouter as Router, Route} from 'react-router-dom'


class App extends Component {

  constructor() {
    super()
    this.username = React.createRef()
    this.password = React.createRef()

    if (this.getToken()) {
        this.getProfile()
    }

    this.state = {
        username: '',
        isLoggedIn: false,
        currentPageHeader: "Main Page"
    }

    this.logout = this.logout.bind(this)
} 
  
getToken() {
  return localStorage.getItem('jwt')
} 

getProfile = () => {
  let token = this.getToken()
  fetch(`${API_ROOT}/profile`, {
      headers: {
          'Authorization': 'Bearer ' + token
      }
  })
      .then(res => res.json())
      .then(json => {
          console.log('profile:', json)
          this.setState({ user: json.user, isLoggedIn:true })
      })
}

  logout = () => {
    localStorage.setItem('jwt', '')
    this.setState({
        username: '',
        isLoggedIn: false
    })
}

  // <Header as='h2' textAlign='center' content={this.state.currentPageHeader}/>
  
  render(){
    return (
      <div >
      <Router>
        <div className="ui green" id="custom-header">
          <Topbar isLoggedIn={this.state.isLoggedIn} logout={this.logout}/>
        </div>
          <MainContainer logout={this.logout}/>
          </Router>
      </div>
   
    );
  }
}

export default App;
