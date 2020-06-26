import React, { Fragment } from 'react';
import ViewEducationListItem from './ViewEducationListItem/ViewEducationListItem';

const viewEducationList = (props) => {

    let educationListComponents = [];

    educationListComponents = props.educationList.map(((education, index) => {
        return (
            <Fragment key={index + education.id}>
                <ViewEducationListItem key={index} {...education}
                    edit={props.editEducation}
                    delete={props.deleteEducation}
                    actionMode={props.actionMode}
                > </ViewEducationListItem>
                <hr />
            </Fragment>
        )
    }));

    return educationListComponents;
}

export default viewEducationList;