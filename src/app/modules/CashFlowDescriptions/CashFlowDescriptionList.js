import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableBody, TableCell, TableRow,
  Button
} from 'grommet';
import { Edit, AddCircle, Trash } from 'grommet-icons';
import { useRegistriesList, useForceUpdate } from './hooks';
import { getState } from '../../hooks/useAuthState';
import cashFlowDescriptionsApi from '../../../api/cashFlowDescriptions';
import getMessageFromError from '../../../helpers/getMessageFromError';

const CashFlowDescriptionList = ({ match, history }) => {
  const [tick, forceUpdate] = useForceUpdate();
  const list = useRegistriesList(tick);
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
    const { token } = getState();
    try {
      await cashFlowDescriptionsApi.delete(token, registry.id);
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
          {list.map(cashFlowDescription => (
            <TableRow key={cashFlowDescription.id}>
              <TableCell scope="row">
                <Button
                  icon={<Edit />}
                  onClick={goEdit(cashFlowDescription)}
                />
                <Button
                  icon={<Trash />}
                  onClick={deleteRegistry(cashFlowDescription)}
                />
              </TableCell>
              <TableCell scope="row">{cashFlowDescription.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

CashFlowDescriptionList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default CashFlowDescriptionList;
