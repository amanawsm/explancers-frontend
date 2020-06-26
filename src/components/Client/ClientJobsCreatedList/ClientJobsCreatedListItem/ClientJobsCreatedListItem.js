import React from 'react';
import { Card, CardBody, CardHeader, CardText, Button } from 'reactstrap';
import LongText from 'components/UI/LongText/LongText';
import TimeFromNowUpdateLive from 'components/UI/TimeFromNowUpdateLive/TimeFromNowUpdateLive';

const clientJobsCreatedListItem = (props) => {

    let job = (
        <Card className="card-user">
            <CardHeader tag="h5">{props.title}</CardHeader>
            <CardBody>
                <CardText>
                    <LongText content={props.requirement} limit={200}></LongText>
                </CardText>
                {props.createdAt ?
                    <div>
                        <strong>Posted:</strong> <TimeFromNowUpdateLive timestamp={props.createdAt}></TimeFromNowUpdateLive>
                    </div>
                    : null}
                <Button onClick={() => props.viewProposalsReceived(props.id)} 
                size="sm" className="ml-2 btn-success btn-square float-right">View Proposals</Button>
                <Button onClick={() => props.viewFullJobPost(props.id)}
                size="sm" className="btn-success btn-square float-right">View Full job</Button>
            </CardBody>
        </Card>
    );

    return job;
}

export default clientJobsCreatedListItem;