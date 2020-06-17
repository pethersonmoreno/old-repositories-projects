import React from 'react';
import { TopAppBar, IconButton } from '@morenobr/guideline-react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleMenu } from '../appCover/actions/actionsApp';

const AppContentWithMenuButton = ({
  // eslint-disable-next-line react/prop-types
  drawerAlwaysVisible, className, title, contextBack, children
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let navigationIconButton = (drawerAlwaysVisible ? undefined : <IconButton aria-label="Open navigation menu" icon="menu" onClick={() => dispatch(toggleMenu())} />);
  if (contextBack) {
    navigationIconButton = <IconButton aria-label="Close" icon="close" onClick={() => history.push(contextBack)} />;
  }

  return (
    <div className={className}>
      <TopAppBar
        title={title}
        secondary={!!contextBack}
        navigationIconButton={navigationIconButton}
      />
      <div className="cf-paper">
        {children}
      </div>
    </div>
  );
};

export default AppContentWithMenuButton;
