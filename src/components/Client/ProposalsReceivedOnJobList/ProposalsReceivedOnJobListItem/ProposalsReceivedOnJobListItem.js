import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button, CardHeader } from 'reactstrap';
import * as classes from './ProposalsReceivedOnJobListItem.module.css';
import LongText from 'components/UI/LongText/LongText';

const proposalsReceivedOnJobListItem = (props) => {

    let proposal = (
        <Card className="card-user">
            <CardHeader tag="h5">{props.freelancer.firstName} {props.freelancer.lastName}</CardHeader>
            <CardBody>
                <CardTitle>{props.type === 'fixed' ?
                    <div className={classes.JobTypeFixed}>
                        <div className="float-left"><strong>Job Type: </strong>Fixed</div>
                        <div className="float-left ml-5"><strong>Price: </strong> {props.proposedFixedPrice}$</div>
                    </div> :
                    <div className={classes.JobTypeHourly}>
                        <div className="float-left"><strong>Job Type: </strong> Hourly</div>
                        <div className="float-left ml-5"><strong>Hourly Rate: </strong> {props.proposedHourlyRate}$/Hour</div>
                    </div>
                }</CardTitle>
                <CardText>
                <LongText content={props.coverLetter} limit={200}></LongText>
                </CardText>
                <Button size="sm" className="btn-square btn-success float-right"
                 onClick={() => props.viewFllProposalReceived(props.id)}>View Full Proposal</Button>
            </CardBody>
        </Card>
    );

    return proposal;
}

export default proposalsReceivedOnJobListItem;