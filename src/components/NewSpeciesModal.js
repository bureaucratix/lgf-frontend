import React from 'react'
import { Button, Header, Image, Modal, Form, Input, Select, Dropdown } from 'semantic-ui-react'
import { API_ROOT } from '../constants/index';


class ModalModalExample extends React.Component {

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })


    constructor() {
        super()
        this.state = {
            species: {
            common_name: null,
            default_water_interval: null,
            default_water_amount: null,
            heat_preference: null,
            light_preference: null,
            toxicity: null
            },
            modalOpen: false
        }



    }


    handleNameChange = (ev, { value }) => {
        console.log(value)
        this.setState((prevState) => ({
            species:{
            ...prevState.species, common_name: value}
        }))
        console.log(this.state)
    }

    handleWaterAmountChange = (ev, { value }) => {
        console.log(value)
        this.setState((prevState) => ({
            species:{
            ...prevState.species, default_water_amount: value}
        }))
        console.log(this.state)
    }

    handleWaterIntervalChange = (ev, { value }) => {
        console.log(value)
        this.setState((prevState) => ({
            species:{
            ...prevState.species, default_water_interval: value.replace(/\D/,'')}
        }))
        console.log(this.state)
    }

    handleHeatPreferenceChange = (ev, { value }) => {
        console.log(value)
        this.setState((prevState) => ({
            species:{
            ...prevState.species, heat_preference: value}
        }))
        console.log(this.state)
    }

    handleLightPreferenceChange = (ev, { value }) => {
        console.log(value)
        this.setState((prevState) => ({
            species:{
            ...prevState.species, light_preference: value}
        }))
        console.log(this.state)
    }

    handleToxicityChange = (ev, { value }) => {
        console.log(value)
        this.setState((prevState) => ({
            species:{
            ...prevState.species, toxicity: value}
        }))
        console.log(this.state)
    }
    
    handleUpdate = (ev) => {
        ev.preventDefault()
        
        let species = this.state.species
        this.handleNewSpecies(ev, species)
    }

    handleNewSpecies = (ev, species) => {
        console.log("submitting", this.state)
        ev.preventDefault()
    
        let token = this.props.getToken()
        fetch(`${API_ROOT}/species`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({species: species}),
        })
            .then(res => res.json() )
            .then(json => {
                console.log(json.species)
                this.handleClose()
                this.props.addNewSpecies(json.species)
                
            }
            )
        
    }   


    render() {
        console.log(this.state)
        return (
            <Modal trigger={<button onClick={this.handleOpen} className="ui basic button float-left">  <i className="icon pencil"></i>Add New Species</button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Add a New Species to the List</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Species Common Name</Header>
                            <Input  
                                required
                                onChange={this.handleNameChange}
                                placeholder="e.g. 'Basil'"
                            />
                            <Header>Suggested Water Interval (In Days)</Header>
                             <Input  
                                required
                                onChange={this.handleWaterIntervalChange}
                                placeholder="e.g. '2'"
                            />
                            <Header>Recommended Water Amount</Header>
                        <Dropdown 
                            
                            onChange={this.handleWaterAmountChange}
                            placeholder='Select Amount'
                            selection
                            options={[
                                {key: "low",
                                text: "low",
                                value: "low"},
                                {key: "medium",
                                text: "medium",
                                value: "medium"},
                                {key: "high",
                                text: "high",
                                value: "high"}
                            ]}
                        />
                         <Header>Recommended Heat</Header>
                        <Dropdown 
                            
                            onChange={this.handleHeatPreferenceChange}
                            placeholder='Select Amount'
                            selection
                            options={[
                                {key: "low",
                                text: "low",
                                value: "low"},
                                {key: "medium",
                                text: "medium",
                                value: "medium"},
                                {key: "high",
                                text: "high",
                                value: "high"}
                            ]}
                        />
                        <Header>Recommended Light Amount</Header>
                        <Dropdown 
                            onChange={this.handleLightPreferenceChange}
                            placeholder='Select Amount'
                            selection
                            options={[
                                {key: "low",
                                text: "low",
                                value: "low"},
                                {key: "medium",
                                text: "medium",
                                value: "medium"},
                                {key: "high",
                                text: "high",
                                value: "high"}
                            ]}
                        />

                        <Header>Toxicity</Header>
                        <Dropdown 
                            required
                            onChange={this.handleToxicityChange}
                            placeholder='Is it Toxic to pets?'
                            selection
                            options={[
                                {key: "Not Toxic",
                                text: "Not Toxic",
                                value: "Not Toxic"},
                                {key: "Toxic to Dogs",
                                text: "Toxic to Dogs",
                                value: "Toxic to Dogs"},
                                {key: "Toxic to Cats",
                                text: "Toxic to Cats",
                                value: "Toxic to Cats"},
                                {key: "Toxic to Cats & Dogs",
                                text: "Toxic to Cats & Dogs",
                                value: "Toxic to Cats & Dogs"}
                            ]}
                        />
                        <br/>
                        <a href={`https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants/${this.state.species.common_name}`} target="_blank" >Check plant toxicity {this.state.species.common_name?`for ${this.state.species.common_name} here!`:" here!"}</a>
                      
                    </Modal.Description>
                            <br/>
                    <Button positive onClick={this.handleUpdate}>Create</Button>
                    <Button negative onClick={this.handleClose}>Cancel</Button>
                </Modal.Content>
            </Modal>

        )
    }
}


export default ModalModalExample