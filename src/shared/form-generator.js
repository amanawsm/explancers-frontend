/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import FormControlError from 'components/UI/FormControlError/FormControlError';

export const formGenerator = (formDefinition, data, inputChangedHandler) => {

    let formControls = [];

    formControls = formDefinition.controls.map((control, index) => {
        if (!control.show) {
            return null;
        }
        switch (control.elementType) {
            case 'input':
                return (
                    <Col {...control.style.col} key={index}>
                        {createInputControl(control, data, inputChangedHandler, index)}
                    </Col>
                );
            case 'radioGroup':
                return (
                    <Col {...control.style.col} key={index}>
                        {createRadioGroupControl(control, data, inputChangedHandler, index)}
                    </Col>
                );
            default:
                return null;
        }
    });

    return formControls;
}

const createRadioGroupControl = (control, data, inputChangedHandler, index) => {
    return (
        <FormGroup row key={control.key + index}>
            <Col md="3">
                <Label>{control.displayLabel}</Label>
            </Col>
            <Col md="9">
                {
                    control.elementConfig.options.map((option, optIndex) => {
                        return <FormGroup key={optIndex} {...control.elementConfig.formGroupInput}>
                            <Input className="form-check-input" type="radio"
                                checked={data[control.key] === option.value}
                                value={option.value}
                                onChange={(event) => inputChangedHandler(event, control.key)} />
                            <Label className="form-check-label" check>{option.displayValue}</Label>
                        </FormGroup>
                    })
                }
            </Col>

            <Col md="12">
                <FormControlError showErrorMessage={!control.valid &&
                    control.touched}
                    errors={control.errors}></FormControlError>
            </Col>

        </FormGroup>
    )
}

const createInputControl = (control, data, inputChangedHandler, index) => {
    switch (control.elementConfig.type) {
        case 'text':
            return createTextInputControl(control, data, inputChangedHandler, index);
        case 'textarea':
            return createTextareaInputControl(control, data, inputChangedHandler, index);
        case 'select':
            return createSelectInputControl(control, data, inputChangedHandler, index);
        case 'multi-select':
            return createMultiSelectInputControl(control, data, inputChangedHandler, index);
        case 'file':
            return createFileInputControl(control, data, inputChangedHandler, index);
        default:
            return createDefaultInputControl(control, data, inputChangedHandler, index);
    }
}

const createTextInputControl = (control, data, inputChangedHandler, index) => {
    return (
        <FormGroup row key={control.key + index}>
            <Col md="3">
                <Label htmlFor="text-input">{control.displayLabel}</Label>
            </Col>
            <Col xs="12" md="9">
                <Input {...control.elementConfig}
                    value={data[control.key]}
                    onChange={(event) => inputChangedHandler(event, control.key)} />
                <FormControlError showErrorMessage={!control.valid && control.touched}
                    errors={control.errors}></FormControlError>
            </Col>
        </FormGroup>
    )
}

const createTextareaInputControl = (control, data, inputChangedHandler, index) => {
    return (
        <FormGroup row key={control.key + index}>
            <Col md="3">
                <Label htmlFor="textarea-input">{control.displayLabel}</Label>
            </Col>
            <Col xs="12" md="9">
                <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                    {...control.elementConfig}
                    value={data[control.key]}
                    onChange={(event) => inputChangedHandler(event, control.key)} />
                <FormControlError showErrorMessage={!control.valid && control.touched}
                    errors={control.errors}></FormControlError>
            </Col>
        </FormGroup>
    )
}

const createSelectInputControl = (control, data, inputChangedHandler, index) => {
    return (
        <FormGroup row key={control.key + index}>
            <Col md="3">
                <Label htmlFor="select">{control.displayLabel}</Label>
            </Col>
            <Col md="9">
                <Select options={control.elementConfig.options}
                    value={
                        control.elementConfig.options.find(option => option.value === data[control.key])
                    }
                    onChange={(event) => inputChangedHandler(event, control.key)} />

            </Col>
            <Col md="12">
                <FormControlError showErrorMessage={!control.valid && control.touched}
                    errors={control.errors}></FormControlError>
            </Col>
        </FormGroup>
    )
}

const createMultiSelectInputControl = (control, data, inputChangedHandler, index) => {
    
    return (
        <FormGroup row key={control.key + index}>
            <Col md="3">
                <Label htmlFor="multi-select">{control.displayLabel}</Label>
            </Col>
            <Col md="9">
                <Select isMulti options={control.elementConfig.options}
                    value={
                        data[control.key].map(selectedValue => {
                            return control.elementConfig.options.find(option => option.value === selectedValue)
                        })
                    }
                    onChange={(event) => inputChangedHandler(event, control.key)} />

            </Col>
            <Col md="12">
                <FormControlError showErrorMessage={!control.valid && control.touched}
                    errors={control.errors}></FormControlError>
            </Col>
        </FormGroup>
    )
}

const createFileInputControl = (control, data, inputChangedHandler, index) => {    
    return (
        <FormGroup row key={control.key + index}>
            <Col md="3">
                <Label htmlFor="textarea-input">{control.displayLabel}</Label>
            </Col>
            <Col xs="12" md="9">
                <Input type="file" name="file-input" id="file-input"
                    {...control.elementConfig}
                    onChange={(event) => inputChangedHandler(event, control.key)} />                
                <FormControlError showErrorMessage={!control.valid && control.touched}
                    errors={control.errors}></FormControlError>
            </Col>
        </FormGroup>
    )
}

const createDefaultInputControl = (control, data, inputChangedHandler, index) => {
    return (
        <FormGroup row key={control.key + index}>
            <Col md="3">
                <Label htmlFor="text-input">{control.displayLabel}</Label>
            </Col>
            <Col xs="12" md="9">
                <Input
                    {...control.elementConfig}
                    value={data[control.key]}
                    onChange={(event) => inputChangedHandler(event, control.key)} />
                <FormControlError showErrorMessage={!control.valid && control.touched}
                    errors={control.errors}></FormControlError>
            </Col>
        </FormGroup>
    )
}
