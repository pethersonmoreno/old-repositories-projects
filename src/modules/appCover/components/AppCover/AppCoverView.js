import React from 'react';
import PropTypes from 'prop-types';
import { DrawerResponsive, TopAppBar, IconButton } from '@morenobr/guideline-react';
import { useDispatch } from 'react-redux';
import { useShowMenu } from '../../selectors/selectorsApp';
import MenuDrawer from '../MenuDrawer';
import { hideMenu } from '../../actions/actionsApp';

const AppContent = ({
  // eslint-disable-next-line react/prop-types
  drawerAlwaysVisible, className, title, openMenu, children
}) => (
  <div className={`cf-paper ${className}`}>
    <TopAppBar
      title={title}
      navigationIconButton={drawerAlwaysVisible ? undefined : <IconButton aria-label="Open navigation menu" icon="menu" onClick={openMenu} />}
    />
    <div className="cf-paper">
      {children}
    </div>
  </div>
);

const AppCoverView = ({
  title,
  openMenu,
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
      appContent={<AppContent title={title} openMenu={openMenu}>{children}</AppContent>}
    >
      <MenuDrawer />
    </DrawerResponsive>
  );
};

AppCoverView.propTypes = {
  title: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppCoverView;
