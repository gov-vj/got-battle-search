import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class Locations extends Component {
  renderLocations() {
    return this.props.locations.map((location, index) => (
      <li key={index}>{location}</li>
    ));
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Locations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>{this.renderLocations()}</ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
          Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Locations;
