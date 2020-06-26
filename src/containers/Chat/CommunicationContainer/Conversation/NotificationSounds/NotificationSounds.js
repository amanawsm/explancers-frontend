import React, { Fragment } from 'react';
import newMessageSound from 'assets/sound/new-message.mp3';

const notificationSounds = (props) => {

    let content = (
        <Fragment>
            <audio autoPlay>
                <source src={newMessageSound} type="audio/mpeg"/>
            </audio>
        </Fragment>
    );

    
    let notificationSoundTimer = setTimeout(() => {
        clearTimeout(notificationSoundTimer);
        props.resetNotificationSoundAlert();        
    }, 1000);

    return (
      content  
    )

}

export default notificationSounds;