import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
  loginBackground: {
    width: '100%',
    height: '100%',
    background: '#fafafa',
  },
  loginBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '350px',
    padding: '1em',
  },
  headerTitle: {
    height: '1em',
    padding: '0px',
    textAlign: 'center',
    filter: 'hue-rotate(80deg)',
    transition: '.4s',
    '&:hover': {
      filter: 'hue-rotate(0)',
    },
  },
  campos: {
    '& > div': {
      display: 'block',
      marginTop: '10px',
      marginBottom: '10px',
    },
  },
  botoesContainer: {
    marginTop: '20px',
    textAlign: 'center',
    '& button, & a': {
      marginLeft: '5px',
      marginRight: '5px',
    },
  },
  errorMessage: {
    color: 'rgb(236, 61, 61)',
  },
  withoutAccount: {
    textAlign: 'center',
    fontSize: '0.95em',
    '& a': {
      marginLeft: '2px',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: '#303f9f',
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
  },
});

const FormPageTemplate = (props) => {
  const {
    children, botoes, links, classes, error, onSubmit,
  } = props;

  return (
    <div className={classes.loginBackground}>
      <div className={classes.loginBox}>
        <Paper>
          <form onSubmit={onSubmit}>
            <h1 className={classes.headerTitle}>Não esqueça!</h1>
            <div className={classes.campos}>{children}</div>
            <div className={classes.botoesContainer}>{botoes}</div>
            {error && <p className={classes.errorMessage}>{error.message}</p>}
          </form>
        </Paper>
        <div className={classes.withoutAccount}>{links}</div>
      </div>
    </div>
  );
};
FormPageTemplate.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  onSubmit: PropTypes.func.isRequired,
  botoes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  links: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
FormPageTemplate.defaultProps = {
  botoes: null,
  links: null,
  error: null,
};
export default withStyles(styles, { withTheme: true })(FormPageTemplate);
