import React from 'react';
import PropTypes from 'prop-types';
import { DrawerResponsive } from '@morenobr/guideline-react';
import { useDispatch } from 'react-redux';
import { useShowMenu } from '../../selectors/selectorsApp';
import MenuDrawer from '../MenuDrawer';
import { hideMenu } from '../../actions/actionsApp';


const AppCoverView = ({
  children
}) => {
  const open = useShowMenu();
  const dispatch = useDispatch();
  return (
    <DrawerResponsive
      fixed
      minWidthDesktop={600}
      animate
      open={open}
      onClose={() => dispatch(hideMenu())}
      appContent={children}
    >
      <MenuDrawer />
    </DrawerResponsive>
  );
};

AppCoverView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppCoverView;
