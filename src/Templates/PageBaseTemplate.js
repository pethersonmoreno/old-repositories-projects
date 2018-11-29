import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { menuWidth } from '../config';

const styles = theme => ({
  main: {
    height: '100%',
    overflowY: 'auto',
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
  contentPage: {},
});
const PageBaseTemplate = (props) => {
  const {
    classes, appBar, children, removePadding,
  } = props;
  let classContent = classes.content;
  if (!removePadding) {
    classContent += ` ${classes.contentPadding}`;
  }
  return (
    <main className={classes.main}>
      {appBar}
      <div className={classContent}>
        <div className={classes.toolbar} />
        <div className={classes.contentPage}>{children}</div>
      </div>
    </main>
  );
};
PageBaseTemplate.propTypes = {
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  appBar: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  removePadding: PropTypes.bool,
};
PageBaseTemplate.defaultProps = {
  removePadding: false,
};
export default compose(withStyles(styles, { withTheme: true }))(PageBaseTemplate);
