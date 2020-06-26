import React, { Fragment } from 'react';
import { Form, FormGroup, InputGroup, Col, Input, InputGroupAddon, Button, Collapse, Row, Card, CardBody } from 'reactstrap';
import { formGenerator } from 'shared/form-generator';

const searchFilterComponent = (props) => {

    let content = (
        <Fragment>
            <Form className="form-horizontal">
                <FormGroup row>
                    <Col md="12">
                        <InputGroup>
                            <Input type="text" placeholder={"Search Keywork for Query"}
                                onChange={(event) => props.inputChangedHandler(event, "searchKeywordQuery")}
                                onKeyPress={(e) => { if (e.key === 'Enter') props.submitHandler(e); }} />
                            {/* onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} */}
                            <InputGroupAddon addonType="prepend">
                                <Button type="button" color="primary" onClick={props.submitHandler}><i className="fa fa-search"></i></Button>
                                <Button className="ml-2" onClick={props.toggleShowFilter} type="button" color="success"><i className="fa fa-filter"></i> Filter</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
            </Form>
            <Collapse isOpen={props.showFilter}>
                <Card>
                    <CardBody>
                        <Form className="form-horizontal">
                            <Row>
                                {formGenerator(props.filtersFormDef, props.filtersFormDef.data, props.inputChangedHandler)}
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        </Fragment>
    )


    return (content);
}

export default searchFilterComponent;