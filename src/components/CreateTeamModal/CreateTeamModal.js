import React, { Component } from 'react';
// import styles from './CreateTeamModal.module.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import ImageUploader from 'react-images-upload';

class CreateTeamModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      createTeamName: '',
      acro: '',
      pictures: null,
    };
  };

  createNewTeam = () => {
    if (this.state.pictures === null || this.state.createTeamName === '') {
      return
    }

    const data = new FormData()
    data.append('file', this.state.pictures[0], this.state.pictures[0].name)
    data.append('teamName', this.state.createTeamName);
    data.append('acro', this.state.acro)

    fetch("http://localhost:3002/create-team", {
      method: 'POST',
      body: data
    })
      .then(
        (result) => {
          this.props.closeModal();
        },
        (error) => { }
      );
  }

  hideCreateNewTeamModal = () => {
    this.setState({
      showCreateModal: false
    });
  }

  onDrop = (picture) => {
    this.setState({
      pictures: picture,
    });
  }

  render() {
    return (
      <Modal
        size="lg"
        show={this.props.show}
        onHide={() => this.hideCreateNewTeamModal()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create New Team
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => { e.preventDefault() }}>
            <Form.Group className="mb-3" controlId="teameNameId">
              <Form.Label>Team Name</Form.Label>
              <Form.Control type="text" placeholder="Enter team name" onChange={(e) => { this.setState({ createTeamName: e.target.value }) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="teameNameId">
              <Form.Label>Team Acronym (2 to 4 letters)</Form.Label>
              <Form.Control type="text" placeholder="Enter team acronym" onChange={(e) => { this.setState({ acro: e.target.value }) }} />
            </Form.Group>
            {/* <Form.Group controlId="teamLogoFileId" className="mb-3">
              <Form.Label style={{ marginRight: '20px' }}>Default file input example</Form.Label>
              <Form.Control type="file" />
            </Form.Group> */}
            <ImageUploader
              withIcon={false}
              buttonText='Choose Team logo images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png']}
              maxFileSize={200971520}
              label={''}
              singleImage
              withPreview
            />
            <Button variant="primary" type="submit" onClick={this.createNewTeam}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default CreateTeamModal;