import React from 'react';
import { Card, CardBody, Badge, CardHeader, Row, CardText, Col } from 'reactstrap';
import * as classes from './MarketFreelancersListItem.module.css';
import LongText from 'components/UI/LongText/LongText';
import UserAvatar from 'components/UI/UserAvatar/UserAvatar';

const marketFreelancersListItem = (props) => {

    // const isProposalSent = props.freelancerJobProposal && props.freelancerJobProposal.isSent;
    // let proposalSubmitButton = (
    //     <Button onClick={(e) => {
    //         e.stopPropagation();
    //         props.viewFullFreelancerProfile(props.id);
    //     }} size="sm" className="btn-success btn-square float-right">Submit Proposal</Button>
    // );

    // if (isProposalSent) {
    //     proposalSubmitButton = null;
    // }

    let job = (
        <Card className={"card-user " + classes.JobCard} onClick={() => props.viewFullFreelancerProfile(props.user.username)}>
            <CardHeader tag="h5" >{props.title}</CardHeader>
            <CardBody>
                <Row>
                    <Col md="2" className={classes.UserAvatarContainer}>
                        <UserAvatar username={props.user.username}
                            className={classes.UserAvatar}>
                        </UserAvatar>
                    </Col>
                    <Col md="10">
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
                        <label><strong>{props.user.firstName} {props.user.lastName}</strong></label>

                        <CardText>
                            <LongText content={props.aboutMe} limit={200}></LongText>
                        </CardText>
                        <div className="CategoryOfServiceNeeded">
                            <h5>Skilled In:
                        {props.categoryOfService.map(category => {
                                return <Badge key={category} className="mr-1 ml-1" color="dark">{category}</Badge>
                            })}
                            </h5>
                        </div>
                        {/* {proposalSubmitButton} */}
                    </Col>
                </Row>

            </CardBody>
        </Card>
    );

    return job;
}

export default marketFreelancersListItem;