import React, {Component} from 'react';
import { API_ROOT } from '../constants/index.js';
import {Input, Button, Divider, Form, Grid, Segment, Dropdown, Label, Icon} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import NewSpeciesModal from './NewSpeciesModal.js'

class NewPlant extends Component {

    constructor() {
        super()
        
        this.state = {
            submitted: false,
            specList: null,
            selectedSpecies: null,
            newWaterInt: null,
            newWaterAmt: null,
            newName: null,
            newDesc: null,
            newimg_url: null
        }
        this.addNewSpecies = this.addNewSpecies.bind(this);

    }

    getSpeciesList = () => {
                let token = this.props.getToken()
        fetch(`${API_ROOT}/species`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            
        })
            .then(res => res.json() )
            .then(json => {
                let specList = []
                json.map(spec=>{
                    specList.push({
                        key: spec.id,
                        value: spec,
                        text: spec.common_name
                    })
                })
                this.setState({
                    specList: specList
                })

            }
            )
    }

    componentDidMount(){

        if(this.props.isLoggedIn === true){
        this.getSpeciesList()}
    }

    handleSubmit = (ev) => {
        console.log("submitting", this.state)
        ev.preventDefault()
    
        if (this.state.selectedSpecies===null){
            alert("Please select a species for your plant-- You can choose custom to forego suggested details, or add a new species to help our list grow!")
        } else {
        let token = this.props.getToken()
        fetch(`${API_ROOT}/plants`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                plant: {
                    name: this.state.newName,
                    description: this.state.newDesc,
                    water_interval: this.state.newWaterInt,
                    water_amount: this.state.newWaterAmt,
                    img_url: this.state.newimg_url,
                    user_id: this.props.user.id,
                    species_id: this.state.selectedSpecies.id,
                }
            }),
        })
            .then(res => res.json() )
            .then(json => {
                this.setState({
                    submitted:true
                })
                const plant = json.plant
                this.props.addPlant({
                    description: plant.description,
                    id: plant.id,
                    img_url: plant.img_url,
                    last_watered_time: null,
                    name: plant.name,
                    species: plant.species.common_name,
                    toxicity: plant.species.toxicity,
                    water_amount: plant.water_amount,
                    water_interval: plant.water_interval
                })

            }
            )
            .catch(err=>console.log(err))
        }
    }   

    

    addNewSpecies = (spec) => {
        this.setState(prevState => {
            const newSpecList = prevState.specList.slice();
            newSpecList.push({
                key: spec.id,
                value: spec,
                text: spec.common_name
            })
            return {specList: newSpecList}
        })
    }
  

    handleSpeciesSelect = (ev, data) => {
        ev.persist()
       
       this.setState({
           selectedSpecies: data.value
       })
    } 

    handleNameChange = (ev, data) => {
        this.setState({
            newName: data.value
        })
    }
    handleDescChange = (ev, data) => {
        this.setState({
            newDesc: data.value
        })
    }
    handleWaterIntChange = (ev, data) => {
        this.setState({
            newWaterInt: data.value
        })
    }
    handleWaterAmtChange = (ev, data) => {
        ev.persist()
        this.setState({
            newWaterAmt: data.value
        })
    }
    handleimg_urlChange = (ev, data) => {
        this.setState({
            newimg_url: data.value
        })
    }

    render (){
        if(!this.props.isLoggedIn){
            return <Redirect to="/login" />}
        if(this.state.submitted){
                return <Redirect to='/' />}
        
        return (
        <Segment placeholder>
            <Form onSubmit={this.handleSubmit}>

            <Grid columns={2} relaxed='very'>
            <Grid.Column verticalAlign='left'>
                <h3 display="inline">Select Species</h3> <Dropdown
                    label="Select Species"
                    onChange={this.handleSpeciesSelect}
                    placeholder='Select Species'
                    search
                    selection
                    options={this.state.specList}
                />

                 <br/><br/>  
                <Input label="Suggested Water Interval" disabled value={this.state.selectedSpecies?`${this.state.selectedSpecies.default_water_interval} days`:"..."} />
                 <br/><br/>  
                <Input label="Suggested Water Amount" disabled value={this.state.selectedSpecies?`${this.state.selectedSpecies.default_water_amount}`:"..."} />
                 <br/><br/>  
                <Input label="Preferred Temperature" disabled value={this.state.selectedSpecies?`${this.state.selectedSpecies.heat_preference}`:"..."} />
                 <br/><br/>  
                <Input label="Preferred Light Amount" disabled value={this.state.selectedSpecies?`${this.state.selectedSpecies.light_preference}`:"..."} />
                 <br/><br/>  
                <Input label="Toxic to Pets?" disabled value={this.state.selectedSpecies?`${this.state.selectedSpecies.toxicity}`:"..."} />
            </Grid.Column>

            <Grid.Column verticalAlign='left'>
            <h3 display="inline">Your New Plant Info</h3>
            <Input label="Name" onChange={this.handleNameChange} placeholder="Gotta name them!" />
                <br/><br/>
                <Input label="Description" onChange={this.handleDescChange} placeholder="Where it lives, etc." />
                <br/><br/>      
            <Input label="Water Interval (In days)" placeholder="How often to water" onChange={this.handleWaterIntChange} placeholder={this.state.selectedSpecies?`${this.state.selectedSpecies.default_water_interval}`:null} />
                 <br/><br/>                  
                <Label size="large">Water Amount</Label><Dropdown
                    label="Water Amount"
                    onChange={this.handleWaterAmtChange}
                    placeholder='Water amount'
                    search
                    selection
                    options={[{value: "low", text: "low"},{value: "medium", text: "medium"},{value: "high", text: "high"}]}
                />
                <br/><br/>    
                <Input label="Image URL" onChange={this.handleimg_urlChange} placeholder="Paste URL here (Optional)" />
                <br/><br/>    
                <Button positive fluid type='submit'>Submit</Button>
            </Grid.Column>
            </Grid>

            <Divider vertical><Icon color="green" name='leaf'/> </Divider>
            </Form>
            <br/>
            <div className="ui align-left">
                <NewSpeciesModal getToken={this.props.getToken} addNewSpecies={this.addNewSpecies}/>
            </div>
          

        </Segment>
        )
    }
}

export default NewPlant;