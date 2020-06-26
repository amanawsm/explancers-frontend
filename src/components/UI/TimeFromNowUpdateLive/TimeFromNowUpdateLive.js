import React, { useState, useEffect } from 'react';
import moment from 'moment';
const timeFromNowUpdateLive = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [updatedTimeStamp, setUpdatedTimeStamp] = useState(0);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setUpdatedTimeStamp(moment(props.timestamp).fromNow());

        const interval = setInterval(() => {
            setUpdatedTimeStamp(moment(props.timestamp).fromNow());            
        }, 30000);
        return () => {
            clearInterval(interval);
        };
    }, [props.timestamp]);

    return (
        <>
            {updatedTimeStamp}
        </>
    );
}

export default timeFromNowUpdateLive;