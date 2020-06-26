import React from 'react';
import ViewSubmittedProposalsListDummyItem from './ViewSubmittedProposalsListDummyItem/ViewSubmittedProposalsListDummyItem';

const viewSubmittedProposalsListDummy = (props) => {
  
  let proposals = [];

  proposals = props.listOfProposals.map(((proposal, index) => {
    return <ViewSubmittedProposalsListDummyItem key={index} {...proposal}
    viewFullProposal={props.viewFullProposal}> </ViewSubmittedProposalsListDummyItem>
  }));

  return proposals;
}

export default viewSubmittedProposalsListDummy;