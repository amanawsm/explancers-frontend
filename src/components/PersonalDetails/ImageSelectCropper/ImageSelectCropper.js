import React, { Component } from 'react';
import Avatar from 'react-avatar-edit';
import { Row, Col, Button } from 'reactstrap';
import classes from './ImageSelectCropper.module.css';

class ImageSelectCropper extends Component {

    constructor(props) {

        super(props);
        const src = '';
        this.state = {
            preview: null,
            src
        };
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({ preview: null });
    }

    onCrop(preview) {
        this.setState({ preview });
    }

    render() {
        return (
            <Row className="">
                <Col md="12" className={classes.ImageSelectCropper}>
                    <Avatar
                        width={350}
                        height={300}
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        src={this.state.src}
                    />
                </Col>
                <Col md="12">
                    {/* <img src={this.state.preview} alt="Preview" /> */}
                    <Button onClick={() => this.props.uploadImage(this.state.preview)}>Upload Image</Button>
                </Col>
            </Row>
        )
    }
}

export default ImageSelectCropper;