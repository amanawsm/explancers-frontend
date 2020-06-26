import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import classes from './ViewFullProposalForFreelancer.module.css';

const viewFullProposalForFreelancer = (props) => {

    let jobType = getContentForJobType(props.proposal);

    let content = (
        <Card className="card-user">
            <CardHeader tag="h5">Cover Letter</CardHeader>
            <CardBody>
                <div className={classes.CoverLetter}>
                    {props.proposal.coverLetter}
                </div>
                <hr></hr>
                <div className={classes.JobType}>
                    {jobType}
                </div>
                {/* <hr></hr> */}
                {/* <Button size="sm"
                    className="btn-success btn-square float-right"
                    onClick={ () => props.changeFixedPrice(props.proposal.id)}>Change FixedPrice</Button>
                <Button size="sm"
                    className="btn-success btn-square float-right"
                    onClick={ () => props.changeHourlyRate(props.proposal.id)}>Change HourlyRate</Button> */}
            </CardBody>
        </Card>
    );
    return content;
}

const getContentForJobType = (proposal) => {
    if (proposal && proposal.type === 'fixed') {
        return <Fragment>
            <div className="float-left"><strong>Job Type: </strong>Fixed</div>
            <div className="float-right"><strong>Your Proposed Price: </strong> {proposal.proposedFixedPrice}$</div>
        </Fragment>
    } else if (proposal && proposal.type === 'hourly') {
        return <Fragment>
            <div className="float-left"><strong>Job Type: </strong>Hourly</div>
            <div className="float-right"><strong>Your Proposed Price: </strong> {proposal.proposedHourlyRate}$</div>
        </Fragment>
    }

    return null;
}

export default viewFullProposalForFreelancer;