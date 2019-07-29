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

    this.state = {
        plants:[],
        user: null,
        isLoggedIn: false,
        editPlant:null
    }

 
    // this.setEditPlant = this.setEditPlant.bind(this);
    this.addPlant = this.addPlant.bind(this);
    this.removePlant = this.removePlant.bind(this);

    // this.logout = this.props.logout.bind(this)
  } 

  addPlant = (p) => {
    this.setState(prevState => {
     
      const newPlantList = prevState.plants.slice();
      newPlantList.push(p)
      return {plants: newPlantList}

        // plants: [...prevState.plants, p.plant ]
     
    })
}

removePlant = (plant) => {
  console.log("target to remove", plant)
  console.log("old state", this.state)
    this.setState(prevState=>{
      const newPlantList = prevState.plants.slice();
      // const filteredPlantList = newPlantList.filter(function(p) { return p !== plant})
      const filteredPlantList= newPlantList.filter(currentPlant=> currentPlant.id !==plant.id)
      console.log("filtered list", filteredPlantList)
      return {plants: filteredPlantList}
    }, ()=>  console.log("this.state1", this.state))
    console.log("new state", this.state)

}

componentDidMount() {
  if (this.getToken()) {
    this.getProfile()
  } else {
    this.setState({
        isLoaded: true
    })
}
}


  getToken = () => {
    return localStorage.getItem('jwt')
  } 

  getProfile = () => {
    let token = this.getToken()
    fetch(`${API_ROOT}/profile`, {headers: {'Authorization': 'Bearer ' + token}}
    )
        .then(res => res.json())
        .then(json => {
            console.log('profile:', json.user.plants)
            this.setState({ isLoaded: true, plants: json.user.plants, user: json.user, isLoggedIn:true })
        })
  }

  sortByDaysLeft = (plantsArr) => {
    let sortedArray = plantsArr.sort((a, b) => this.daysUntilWater(a) - this.daysUntilWater(b));
    return sortedArray
}

daysUntilWater = (plant) =>{
   
  let waterInt = plant.water_interval
  if (plant.last_watered_time === null) {return waterInt}
  let displaySplit = plant.last_watered_time.split(" ").slice(1, 4)
  let lastWater = new Date(displaySplit)
  
  

  var oneDay = 24*60*60*1000;
  var todayDate = new Date()
  let lastWaterMilli = lastWater.getTime()-25200000
  let todayMilli = todayDate.getTime()
  // console.log("last watered date", this.props.plant.last_watered_time)
  // console.log("Today's date", todayDate)
  var daysSinceLast = Math.round((todayMilli - lastWaterMilli)/(oneDay));
  return waterInt-daysSinceLast+1
  
}


  logout = () => {
    localStorage.setItem('jwt', '')
    this.setState({
        username: '',
        plants:[],
        isLoggedIn: false
    })
}

  // <Header as='h2' textAlign='center' content={this.state.currentPageHeader}/>
  
  render(){
    
    return (
      <div >
        
      <Router>
        <div className="ui green" id="custom-header">
          <Topbar isLoggedIn={this.state.isLoggedIn} getToken={this.getToken} logout={this.logout}/>
        </div>
        <div id="amazon-root"></div>
          <MainContainer getToken={this.getToken} addPlant={this.addPlant} daysUntilWater={this.daysUntilWater} removePlant={this.removePlant} getProfile={this.getProfile} user={this.state.user} isLoggedIn={this.state.isLoggedIn} plants={this.sortByDaysLeft(this.state.plants)} />
          </Router>
      </div>
   
    );
  }
}

export default App;
