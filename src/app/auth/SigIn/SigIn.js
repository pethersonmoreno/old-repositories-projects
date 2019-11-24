import React from 'react';
import { Paper } from 'react-md';
import FormSigIn from './FormSigIn';
import withAuthorization from '../../hoc/withAuthorization';


const SigIn = () =>
  (
    <Paper
      zDepth={1}
      raiseOnHover
    >
      <h1>Cash Flow</h1>
      <FormSigIn />
    </Paper>
  );

export default withAuthorization({ authenticated: false }, '/notAuthorized')(SigIn);
