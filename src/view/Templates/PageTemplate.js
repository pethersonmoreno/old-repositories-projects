import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from 'Molecules/AppBar';
import { operations } from 'controle-compras-frontend-redux/ducks/menu';
import { menuWidth } from '../config';

const styles = theme => ({
  main: {
    height: '100%',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${menuWidth}px)`,
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
  },
  contentPadding: {
    padding: theme.spacing.unit * 3,
  },
  contentPage: {
    height: '100%',
  },
});
const PageTemplate = ({
  toggleMenu, classes, children, titulo, removePadding,
}) => {
  let classContent = classes.content;
  if (!removePadding) {
    classContent += ` ${classes.contentPadding}`;
  }
  return (
    <main className={classes.main}>
      <AppBar toggleMenu={toggleMenu}>{titulo}</AppBar>
      <div className={classContent}>
        <div className={classes.toolbar} />
        <div className={classes.contentPage}>{children}</div>
      </div>
    </main>
  );
};
PageTemplate.propTypes = {
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  titulo: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  removePadding: PropTypes.bool,
};
PageTemplate.defaultProps = {
  removePadding: false,
};
export default compose(
  connect(
    null,
    { toggleMenu: operations.toggleMenu },
  ),
  withStyles(styles, { withTheme: true }),
)(PageTemplate);
