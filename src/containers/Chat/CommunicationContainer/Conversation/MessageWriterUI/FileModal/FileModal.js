import React, { Component } from 'react';
import mime from 'mime-types';
import { Input, Button } from 'reactstrap';
import { Modal } from 'components';

class FileModal extends Component {
  state = {
    file: null,
    authorized: ['image/jpeg', 'image/png', 'image/gif']
  };

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;

    if (file !== null) {
      if (this.isAuthorizedFileMime(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  };

  isAuthorizedFileMime = filename =>
    this.state.authorized.includes(mime.lookup(filename));

  clearFile = () => this.setState({ file: null });

  render() {
    const { showFileUploadDialog, closeModal } = this.props;

    return (
      <Modal show={showFileUploadDialog} modalClosed={closeModal}>
        <h3>Select an Image File</h3>
        <div>
          <Input
            onChange={this.addFile}
            label='File types: jpg, png, gif'
            name='file'
            type='file'
          />
        </div>
        <div>
          <Button onClick={this.sendFile} color='primary'>
            Send
          </Button>
          <Button color='danger' onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }
}

export default FileModal;
