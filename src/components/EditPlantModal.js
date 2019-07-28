import React from 'react'
import { Button, Header, Image, Modal, Form, Input, Select, Dropdown } from 'semantic-ui-react'
import { API_ROOT } from '../constants/index';
import DeleteConfirmModal from './DeleteConfirmModal'


class ModalModalExample extends React.Component {

    handleClick = () =>{
        this.props.setEditPlant(this.props.plant)
        this.handleOpen()
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })


    constructor() {
        super()
        this.state = {
            modalOpen: false
        }

    }

    getToken() {
        return localStorage.getItem('jwt')
    }

    handleChange = (ev, { name, value }) => {
        this.props.editPlantChange(this.props.plant, name, value)
        // this.setState(editPlant:{{ [name]: value })
    }
    
    handleUpdate = (ev) => {
        ev.preventDefault()
        this.props.editPlantSubmit(ev, this.props.plant)
        this.handleClose()

    }

    handlePlantUpdate = (ev, plant) => {
        ev.preventDefault()
            let token = this.props.getToken()
        fetch(`${API_ROOT}/plants/${plant.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({plant: plant}),
        })
            .then(res => res.json() )
            .then(json => {
                console.log(json)
                this.handleClose()
            }
            )
    }

    deletePlant = (ev) => {
        ev.preventDefault()
        
        let plant = this.props.plant
        let token = this.props.getToken()
        fetch(`${API_ROOT}/plants/${plant.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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
            <Modal trigger={<button onClick={this.handleClick} className="ui basic button float-right">  <i className="icon pencil"></i>Edit</button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Edit {this.props.plant?this.props.plant.name:null}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Edit Name</Header>
                            <Input  
                                name='name'
                                onChange={this.handleChange}
                                placeholder={this.props.plant?this.props.plant.name:null}
                            />
                        <Header>Edit Description</Header>
                            <Input  
                                name='description'
                                onChange={this.handleChange}
                                placeholder={this.props.plant?this.props.plant.description:null}
                            />
                            <Header>Change Image URL</Header>
                            <Input  
                                name='img_url'
                                onChange={this.handleChange}
                                placeholder={this.props.plant?this.props.plant.img_url:null}
                            />
                            <Header>Edit Watering Interval (In Days)</Header>
                            <Input  
                                name='water_interval'
                                onChange={this.handleChange}
                                placeholder={this.props.plant?this.props.plant.water_interval:null}
                            />
                        <Header>Water Amount</Header>
                        <Dropdown 
                            name='water_amount'
                            onChange={this.handleChange}
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