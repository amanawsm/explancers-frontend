import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import LongText from 'components/UI/LongText/LongText';

const viewEducationListItem = (props) => {

    let education = (
        <Row>
            <Col md="12">
                <Row>
                    <Col md="2">
                        <label><strong>Title</strong></label>
                    </Col>
                    <Col md="8">
                        <div>{props.title}</div>
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
            <Col md="12">
                <Row>
                    <Col md="2">
                        <label><strong>Description</strong></label>
                    </Col>
                    <Col md="8">
                        <LongText content={props.description} limit={200}></LongText>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

    return education;
}

export default viewEducationListItem;