import React from 'react';
import ClientJobsCreatedListItem from './ClientJobsCreatedListItem/ClientJobsCreatedListItem';

const clientJobsCreatedList = (props) => {

    let jobs = [];

    jobs = props.listOfJobs.map(((job, index) => {
        return (
            <ClientJobsCreatedListItem key={index} {...job}
                viewProposalsReceived={props.viewProposalsReceived}
                viewFullJobPost={props.viewFullJobPost}
            ></ClientJobsCreatedListItem>
        )
    }));

    return jobs;

}

export default clientJobsCreatedList;