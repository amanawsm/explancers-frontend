import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import LongText from 'components/UI/LongText/LongText';
import { SERVER_BASE_URL } from 'shared/app-constants';

const viewPortfolioListItem = (props) => {

    let portfolio = (
        <Row>
            <Col md="6">
                <Row>
                    <Col md="2">
                        <label><strong>Title</strong></label>
                    </Col>
                    <Col md="8">
                        <div>{props.title}</div>
                    </Col>
                </Row>
            </Col>
            <Col md="6">
                <Row>
                    <Col md="2">
                        <label><strong>Display Image</strong></label>
                    </Col>
                    <Col md="8">
                        <img style={{ width: '50%' }} src={SERVER_BASE_URL + '/' + props.displayImage} alt="Portfolio"></img>
                    </Col>
                    {props.actionMode === "EDIT" ? <Col md="2">
                        <Button onClick={() => props.edit(props.id)}
                            color="link" className="card-header-action btn-setting">
                            Edit <i className="fa fa-edit"></i>
                        </Button>
                        <Button onClick={() => props.delete(props.id)}
                            color="link" className="card-header-action btn-setting">
                            Delete <i className="fa fa-trash"></i>
                        </Button>
                    </Col> : null}
                </Row>
            </Col>
            {props.description ? <Col md="12">
                <Row>
                    <Col md="2">
                        <label><strong>Description</strong></label>
                    </Col>
                    <Col md="8">
                        <LongText content={props.description} limit={200}></LongText>
                    </Col>
                </Row>
            </Col> : null}
        </Row>
    );

    return portfolio;
}

export default viewPortfolioListItem;