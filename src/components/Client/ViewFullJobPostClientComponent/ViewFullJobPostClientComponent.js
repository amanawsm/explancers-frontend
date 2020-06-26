import React, { Fragment } from 'react';
import { Card, CardBody, Badge, CardHeader } from 'reactstrap';
import classes from './ViewFullJobPostClientComponent.module.css';

const viewFullJobPostClientComponent = (props) => {

    let jobType = getContentForJobType(props.jobPost);

    let content = (
        <Card className="card-user">
            <CardHeader tag="h5">{props.jobPost.title}</CardHeader>
            <CardBody>
                <div className={classes.JobRequirement}>
                    {props.jobPost.requirement}
                </div>
                <hr></hr>
                <div className={classes.JobType}>
                    {jobType}
                </div>
                <hr></hr>
                <div className="CategoryOfServiceNeeded">
                    <h5>Category of Skills Needed:
                        {props.jobPost.categoryOfService.map(category => {
                        return <Badge key={category} className="mr-1 ml-1" color="dark">{category}</Badge>
                    })}
                    </h5>
                </div>
            </CardBody>
        </Card>
    );
    return content;
}

const getContentForJobType = (jobPost) => {
    if (jobPost && jobPost.type === 'fixed') {
        return <Fragment>
            <div className="float-left"><strong>Job Type: </strong>Fixed</div>
            <div className="float-right"><strong>Price: </strong> {jobPost.fixedPrice}$</div>
        </Fragment>
    } else if (jobPost && jobPost.type === 'hourly') {
        return <Fragment>
            <div className="float-left"><strong>Job Type: </strong>Hourly</div>
            <div className="float-right"><strong>Price: </strong> {jobPost.hourlyRate}$</div>
        </Fragment>
    }

    return null;
}

export default viewFullJobPostClientComponent;