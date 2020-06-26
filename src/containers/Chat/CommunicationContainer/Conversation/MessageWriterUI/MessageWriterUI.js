import React, { Fragment } from 'react';
import classes from './MessageWriterUI.module.css';
import FileModal from './FileModal/FileModal';

const messageWriterUI = (props) => {

    let typerActionClasses = [classes.ChatBottom, classes.UploadBtn, "pull-left"];

    return (
        <Fragment>
            <div className={classes.MessageWrite}>
                <textarea
                    value={props.messageValue}
                    onChange={props.inputChangedHandler}
                    onKeyPress={props.sendMessageHandler}
                    className="form-control"
                    placeholder="Type a message"></textarea>
                <div className="clearfix"></div>
                <div className={typerActionClasses.join(' ')}>
                    <span onClick={props.toggleFileUploadModal}><i className="fa fa-cloud-upload"></i>Add Files</span>
                    <FileModal 
                        closeModal={props.toggleFileUploadModal}
                        showFileUploadDialog={props.showFileUploadDialog}
                        uploadFile={props.uploadFile}>
                    </FileModal>

                    <button className="pull-right btn btn-success" 
                    onClick={props.sendMessageHandler}>Send</button>
                </div>
            </div>
        </Fragment >
    )

}

export default messageWriterUI;