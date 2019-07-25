import React from 'react'
import { Button, Header, Image, Modal, Form, Input, Select, Dropdown } from 'semantic-ui-react'
import { API_ROOT } from '../constants/index';
import DeleteConfirmModal from './DeleteConfirmModal'


class ModalModalExample extends React.Component {

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })


    constructor() {
        super()
        this.state = {
            plant: null,

            modalOpen: false
        }

    }


    
    componentDidMount() {
        this.setState({
            plant:this.props.plant
        })

    }

    getToken() {
        return localStorage.getItem('jwt')
    }

    handleNameChange = (ev, { value }) => {
        console.log(value)
        this.setState((prevState) => ({
            plant:{
            ...prevState.plant, name: value}
        }))
        console.log(this.state)
    }

    handleDescriptionChange = (ev, { value }) => {
        console.log(value)
        this.setState((prevState) => ({
            plant:{
            ...prevState.plant, description: value}
        }))
        console.log(this.state)
    }

    handleWaterAmountChange = (ev, { value }) => {
    this.setState((prevState) => ({
        plant:{
        ...prevState.plant, water_amount: value}
    }))
    }

    handleWaterIntervalChange = (ev, { value }) => {
    this.setState((prevState) => ({
        plant:{
        ...prevState.plant, water_interval: value.replace(/\D/,'')}
    }))
    }

    handleimg_urlChange = (ev, { value }) => {
        this.setState((prevState) => ({
            plant:{
            ...prevState.plant, img_url: value}
        }))
        }

    
    handleUpdate = (ev) => {
        ev.preventDefault()
        
        let plant = this.state.plant
        this.handlePlantUpdate(ev, plant)
    }

    handlePlantUpdate = (ev, plant) => {
        ev.preventDefault()
            // let token = this.getToken()
        fetch(`${API_ROOT}/plants/${plant.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({plant: plant}),
        })
            .then(res => res.json() )
            .then(json => {
                console.log(json)
                this.handleClose()
                this.props.getProfile()
            }
            )
    }

    deletePlant = (ev) => {
        ev.preventDefault()
        
        let plant = this.state.plant
        // let token = this.getToken()
        fetch(`${API_ROOT}/plants/${plant.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'Authorization': 'Bearer ' + token
            },
        })
            .then(res => res.json() )
            .then(json => {
                console.log(json)
                this.handleClose()
                this.props.removePlant(plant)
            }
            )

    }


    render() {
        return (
            <Modal trigger={<button onClick={this.handleOpen} className="ui basic button float-right">  <i className="icon pencil"></i>Edit</button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Edit {this.state.plant?this.state.plant.name:null}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Edit Name</Header>
                            <Input  
                                onChange={this.handleNameChange}
                                placeholder={this.state.plant?this.state.plant.name:null}
                            />
                        <Header>Edit Description</Header>
                            <Input  
                                onChange={this.handleDescriptionChange}
                                placeholder={this.state.plant?this.state.plant.description:null}
                            />
                            <Header>Change Image URL</Header>
                            <Input  
                                onChange={this.handleimg_urlChange}
                                placeholder={this.state.plant?this.state.plant.img_url:null}
                            />
                            <Header>Edit Watering Interval (In Days)</Header>
                            <Input  
                                onChange={this.handleWaterIntervalChange}
                                placeholder={this.state.plant?this.state.plant.water_interval:null}
                            />
                        <Header>Water Amount</Header>
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
                      
                    </Modal.Description>
                            <br/>
                    <Button positive onClick={this.handleUpdate}>Update</Button>
                    <DeleteConfirmModal deletePlant={this.deletePlant} />

                </Modal.Content>
            </Modal>

        )
    }
}

export default ModalModalExample