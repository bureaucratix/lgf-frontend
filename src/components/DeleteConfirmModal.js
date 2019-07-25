import React, {Component} from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import { API_ROOT } from '../constants/index';

class DeleteConfirmModal extends Component {
    state = { open: false }
  
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
  
    render() {
      const { open } = this.state
  
      return (
        <Modal
          open={open}
          onOpen={this.open}
          onClose={this.close}
          size='small'
          trigger={
            <Button floated="right" negative icon>
              Delete Plant <Icon name='trash' />
            </Button>
          }
        >
          <Modal.Header>Really Delete?</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this plant? This can't be undone!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative icon='trash' content='Goodnight, sweet plant' onClick={this.props.deletePlant} />

            <Button icon='back' content='Never Mind' onClick={this.close} />
          </Modal.Actions>
        </Modal>
      )
    }
  }

  export default DeleteConfirmModal