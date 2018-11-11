import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { operations } from '../../../state/ducks/menu';
import PageTemplate from './PageTemplate';

const PageTemplateContainer = compose(
  connect(
    null,
    { toggleMenu: operations.toggleMenu },
  ),
)(PageTemplate);
export default PageTemplateContainer;
