import React, {Component} from 'react';
import { API_ROOT } from '../constants/index.js';
import Login from '../components/Login.js'
import Main from '../components/Main.js'
import '../App.css';
import CustomHeader from '../components/Header.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'


class MainContainer extends Component {


    //-----Things that were in Login.js, maybe want them here to pass info to Header to display name and logout option-----
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
            currentPage: "Your Plants"
        }

        // this.logout = this.props.logout.bind(this)
    } 

   
    //Set to true for development; uncomment to test login page
    getToken() {
        // return true
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
    //-------------------------------

    reload = () => {
        this.forceUpdate();
    }

    render() {
        
        return (
            
            <div className="App">
                <main>
                    {/* Header not updating dynamically, possibly due to user being passed as props */}
                    <div className="ui segment">
                    <CustomHeader content={this.state.currentPage} logout={this.logout} user={this.getToken()?this.getToken():null}/>
                    </div>
                    <Route exact path='/' component={this.getToken()?Main:Login} />
                    {/* <Route path='/add' component={this.getToken()?NewPlant:Login} /> */}
                    <Route path='/login' render={() => <Login loginreload={this.reload}/>} />
                 
                </main>
            </div>
           
        );
    }
}

export default MainContainer;