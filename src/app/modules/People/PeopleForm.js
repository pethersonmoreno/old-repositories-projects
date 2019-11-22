/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Form, FormField,
  Button,
  Grid
} from 'grommet';
import peopleApi from '../../../api/people';
import { getState } from '../../hooks/useAuthState';

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return { value, onChange: handleChange };
};

const PeopleForm = () => {
  const name = useInputValue('');
  return (
    <Form style={{ width: 50 }}>
      <Grid
        rows={['xxsmall']}
        columns={['small', 'small']}
        gap="small"
        areas={[
          { name: 'field', start: [0, 0], end: [1, 0] },
          { name: 'button', start: [1, 0], end: [1, 0] },
        ]}
      >
        <FormField gridArea="field" name="name" label="Name" {...name} />
        <Button gridArea="button" type="submit" primary label="Save" onClick={() => peopleApi.add(getState().token, { name: name.value })} />
      </Grid>
    </Form>
  );
};


export default PeopleForm;
