import React from 'react';
import { Card, CardHeader, Button, CardBody, CardFooter, Form } from 'reactstrap';
import { formGenerator } from 'shared/form-generator';

const submitJobProposalFormDetails = (props) => {
    
    let form =
        (
            <Form className="form-horizontal">
                {formGenerator(props.form, props.form.data, props.inputChangedHandler)}
            </Form>
        );

    let content = (
        <Card>
            <CardHeader>
                <strong>Submit Proposal</strong>
                <div className="card-header-actions">
                    <Button color="link" className="card-header-action btn-setting">Cancel <i className="fa fa-eye"></i></Button>
                </div>
            </CardHeader>
            <CardBody>
                {form}
            </CardBody>
            {!props.loading ? <CardFooter>
                <Button type="submit" size="sm" color="primary" disabled={!props.form.isValid}
                    onClick={props.submitHandler}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            </CardFooter> : null}
        </Card>
    )


    return (content);
}


export default submitJobProposalFormDetails;