import React from 'react';
import JobItem from './JobItem/JobItem';

const jobItemList = (props) => {
  
  let jobs = [];

  jobs = props.listOfJobs.map(((job, index) => {
    return <JobItem key={index} {...job}
    submitProposal={props.submitProposal}
    viewFullJobPost={props.viewFullJobPost}> </JobItem>
  }));

  return jobs;
}

export default jobItemList;