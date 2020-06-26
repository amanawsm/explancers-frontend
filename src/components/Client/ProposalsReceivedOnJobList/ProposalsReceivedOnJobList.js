import React from 'react';
import ProposalsReceivedOnJobListItem from './ProposalsReceivedOnJobListItem/ProposalsReceivedOnJobListItem';

const proposalsReceivedOnJobList = (props) => {

  let proposals = [];

  proposals = props.proposals.map(((proposal, index) => {
    return <ProposalsReceivedOnJobListItem
      key={index} {...proposal}
      viewFllProposalReceived={props.viewFllProposalReceived}
    ></ProposalsReceivedOnJobListItem>
  }));

  return proposals;
}

export default proposalsReceivedOnJobList;