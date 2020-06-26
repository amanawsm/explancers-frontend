import React from 'react';
import MarketFreelancersListItem from './MarketFreelancersListItem/MarketFreelancersListItem';

const marketFreelancersList = (props) => {
  
  let marketFreelancers = [];

  marketFreelancers = props.freelancers.map(((freelancer, index) => {
    return <MarketFreelancersListItem key={index} {...freelancer}
    viewFullFreelancerProfile={props.viewFullFreelancerProfile}> </MarketFreelancersListItem>
  }));

  return marketFreelancers;
}

export default marketFreelancersList;