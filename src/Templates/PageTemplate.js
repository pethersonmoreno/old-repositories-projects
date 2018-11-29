import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { operations } from 'controle-compras-frontend-redux/ducks/menu';
import AppBar from 'Molecules/AppBar';
import PageBaseTemplate from './PageBaseTemplate';

const PageTemplate = ({ toggleMenu, titulo, ...otherProps }) => (
  <PageBaseTemplate {...otherProps} appBar={<AppBar toggleMenu={toggleMenu}>{titulo}</AppBar>} />
);
PageTemplate.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  titulo: PropTypes.string.isRequired,
};
// export default PageTemplate;
export default compose(
  connect(
    null,
    { toggleMenu: operations.toggleMenu },
  ),
)(PageTemplate);
