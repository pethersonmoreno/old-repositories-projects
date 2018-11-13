import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { operations } from 'state/ducks/data';
import MainTemplate from './MainTemplate';

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadInitialData: operations.loadInitialData,
  },
  dispatch,
);
const MainTemplateContainer = connect(
  null,
  mapDispatchToProps,
)(MainTemplate);
export default withRouter(MainTemplateContainer);
