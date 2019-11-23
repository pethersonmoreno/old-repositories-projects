import React from 'react';
import {
  Table, TableHeader, TableBody, TableCell, TableRow,
  Button
} from 'grommet';
import { Edit } from 'grommet-icons';
import PeopleForm from './PeopleForm';
import { usePeopleList } from './hooks';

const PeopleList = () => {
  const list = usePeopleList();
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
