import React, { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableBody, TableCell, TableRow,
  Button
} from 'grommet';
import { Edit } from 'grommet-icons';
import peopleApi from '../../../api/people';
import { getState } from '../../hooks/useAuthState';
import PeopleForm from './PeopleForm';

const PeopleList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await peopleApi.getList(token);
      setList(listLoaded);
    };
    fetchData();
  }, []);
  return (
    <div>
      <PeopleForm />
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
                  onClick={() => { alert('not implemented'); }}
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

export default PeopleList;
