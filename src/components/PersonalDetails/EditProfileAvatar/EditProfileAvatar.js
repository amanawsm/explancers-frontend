import React from 'react';
import { ImageSelectCropper } from 'components';
import Modal from 'components/UI/Modal/Modal';
import { Card, CardBody, CardHeader } from 'reactstrap';
import classes from './EditProfileAvatar.module.css';
import UserAvatar from 'components/UI/UserAvatar/UserAvatar';

const editProfileAvatar = (props) => {

    let cardBody = null;
    if (!props.showImageCropper) {
        cardBody = (
            <CardBody>
                <div style={{ textAlign: 'center' }}>

                    <div className={classes.ImageContainer}>
                        <UserAvatar className={classes.Avatar} username={props.userName}
                            click={props.toggleImageCropperShow}></UserAvatar>
                        <div onClick={props.toggleImageCropperShow}
                            className={classes.Edit}><i className="fa fa-pencil fa-lg"></i>
                        </div>
                    </div>
                </div>
            </CardBody>
        );
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <strong>Profile Picture</strong>
                </CardHeader>
                {cardBody}
            </Card>

            <Modal show={props.showImageCropper} modalClosed={props.toggleImageCropperShow}>
                <ImageSelectCropper uploadImage={props.updateUserProfileAvatar}></ImageSelectCropper>
            </Modal>
        </>
    )

}

export default editProfileAvatar;