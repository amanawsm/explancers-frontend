import React from 'react';
import { Card, CardBody, CardText, Button } from 'reactstrap';
import * as classes from './ViewSubmittedProposalsListDummyItem.module.css';
import LongText from 'components/UI/LongText/LongText';
import TimeFromNowUpdateLive from 'components/UI/TimeFromNowUpdateLive/TimeFromNowUpdateLive';

const viewSubmittedProposalsListDummyItem = (props) => {

    // View Full Job Proposal Button Option
    let viewFullProposalButton = (
        <Button onClick={(e) => {
            e.stopPropagation();
            props.viewFullProposal(props.id);
        }} size="sm" className="btn-success btn-square float-right">View Full Proposal</Button>
    );

    // Update Time for Proposal Send in RealTime
    let sentTimeFromNow = null;
    if (props.createdAt) {
        sentTimeFromNow = updateSentTimeFromNow(props.createdAt);
    }

    let proposal = (
        <Card className={"card-user " + classes.JobCard} onClick={() => props.viewFullProposal(props.id)}>
            <CardBody>
                {/* <CardTitle>{props.type === 'fixed' ?
                    <div className={classes.JobTypeFixed}>
                        <div className="float-left"><strong>Job Type: </strong>Fixed</div>
                        <div className="float-right"><strong>Price: </strong> {props.fixedPrice}$</div>
                    </div> :
                    <div className={classes.JobTypeHourly}>
                        <div className="float-left"><strong>Job Type: </strong> Hourly</div>
                        <div className="float-right"><strong>Hourly Rate: </strong> {props.hourlyRate}$/Hour</div>
                    </div>
                }</CardTitle> */}
                <CardText>
                    <LongText content={props.job} limit={200}></LongText>
                </CardText>
                {sentTimeFromNow}
                {viewFullProposalButton}
            </CardBody>
        </Card>
    );

    return proposal;
}

const updateSentTimeFromNow = (time) => {
    return (<div>
        <strong>Sent From Now: </strong> <TimeFromNowUpdateLive timestamp={time}></TimeFromNowUpdateLive>
    </div>
    );
}

export default viewSubmittedProposalsListDummyItem;