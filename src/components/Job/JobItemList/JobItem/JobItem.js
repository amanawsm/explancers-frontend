import React from 'react';
import { Card, CardBody, Badge, CardHeader, CardTitle, CardText, Button } from 'reactstrap';
import * as classes from './JobItem.module.css';
import LongText from 'components/UI/LongText/LongText';
import TimeFromNowUpdateLive from 'components/UI/TimeFromNowUpdateLive/TimeFromNowUpdateLive';

const jobListItem = (props) => {

    const isProposalSent = props.freelancerJobProposal && props.freelancerJobProposal.isSent;
    let proposalSubmitButton = (
        <Button onClick={(e) => {
            e.stopPropagation();
            props.submitProposal(props.id);
        }} size="sm" className="btn-success btn-square float-right">Submit Proposal</Button>
    );

    if (isProposalSent) {
        proposalSubmitButton = null;
    }

    let job = (
        <Card className={"card-user " + classes.JobCard} onClick={() => props.viewFullJobPost(props.id)}>
            <CardHeader tag="h5" >{props.title}</CardHeader>
            <CardBody>
                <CardTitle>{props.type === 'fixed' ?
                    <div className={classes.JobTypeFixed}>
                        <div className="float-left"><strong>Job Type: </strong>Fixed</div>
                        <div className="float-right"><strong>Price: </strong> {props.fixedPrice}$</div>
                    </div> :
                    <div className={classes.JobTypeHourly}>
                        <div className="float-left"><strong>Job Type: </strong> Hourly</div>
                        <div className="float-right"><strong>Hourly Rate: </strong> {props.hourlyRate}$/Hour</div>
                    </div>
                }</CardTitle>
                <CardText>
                    <LongText content={props.requirement} limit={200}></LongText>
                </CardText>
                <div className="CategoryOfServiceNeeded">
                    <h5>Category of Skills Needed:
                        {props.categoryOfService.map(category => {
                        return <Badge key={category} className="mr-1 ml-1" color="dark">{category}</Badge>
                    })}
                    </h5>
                </div>
                {props.createdAt ?
                    <div>
                        <strong>Posted:</strong> <TimeFromNowUpdateLive timestamp={props.createdAt}></TimeFromNowUpdateLive>
                    </div>
                    : null}
                {proposalSubmitButton}
            </CardBody>
        </Card>
    );

    return job;
}

export default jobListItem;