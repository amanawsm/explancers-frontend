import React from 'react';
import { FormFeedback } from 'reactstrap';

const formControlError = (props) => {
   let error = null;
   if (!props.showErrorMessage) {
      return error;
   }

   error = props.errors.map(error => {
      switch (error.type) {
         case "required":
            return <FormFeedback key={error.type} style={{ display: "block" }}>This field is Required</FormFeedback>;
         case "minLength":
            return <FormFeedback key={error.type} style={{ display: "block" }}>Minimum length should be {error.minLength}</FormFeedback>;
         case "maxLength":
            return <FormFeedback key={error.type} style={{ display: "block" }}>Maximum length should be {error.maxLength}</FormFeedback>;
         case "isEmail":
            return <FormFeedback key={error.type} style={{ display: "block" }}>This field should be an Email</FormFeedback>;
         case "isNumeric":
            return <FormFeedback key={error.type} style={{ display: "block" }}>This field should be a Number</FormFeedback>;
         case "minValue":
            return <FormFeedback key={error.type} style={{ display: "block" }}>Minimum value should be {error.minValue}</FormFeedback>;
            case "mime":
               return <FormFeedback key={error.type} style={{ display: "block" }}>File Types can only be {error.mimeTypes.join(", ")}</FormFeedback>;
         default:
            return null;
      }
   });
   return error;
}

export default formControlError;