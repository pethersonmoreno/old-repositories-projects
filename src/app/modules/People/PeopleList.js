import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableBody, TableCell, TableRow,
  Button
} from 'grommet';
import { Edit, AddCircle, Trash } from 'grommet-icons';
import { usePeopleList, useForceUpdate } from './hooks';
import { getState } from '../../hooks/useAuthState';
import peopleApi from '../../../api/people';
import getMessageFromError from '../../../helpers/getMessageFromError';

const PeopleList = ({ match, history }) => {
  const [tick, forceUpdate] = useForceUpdate();
  const list = usePeopleList(tick);
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = person => () => { history.push(`${match.path}/edit/${person.id}`); };
  const deletePerson = person => async () => {
    const { token } = getState();
    try {
      await peopleApi.delete(token, person.id);
      forceUpdate();
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <div>
      <Button
        icon={<AddCircle />}
        onClick={goAdd}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Action
            </TableCell>
            <TableCell scope="col" border="bottom">
              Name
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(person => (
            <TableRow key={person.id}>
              <TableCell scope="row">
                <Button
                  icon={<Edit />}
                  onClick={goEdit(person)}
                />
                <Button
                  icon={<Trash />}
                  onClick={deletePerson(person)}
                />
              </TableCell>
              <TableCell scope="row">{person.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

PeopleList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default PeopleList;
