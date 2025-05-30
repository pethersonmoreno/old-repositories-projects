import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { operations } from 'controle-compras-frontend-redux/ducks/menu';
import AppBar from 'Molecules/AppBar';
import PageBaseTemplate from './PageBaseTemplate';

const PageTemplate = ({
  toggleMenu, titulo, onDone, withButtonAccount, ...otherProps
}) => (
  <PageBaseTemplate
    {...otherProps}
    appBar={(
      <AppBar toggleMenu={toggleMenu} onDone={onDone} withButtonAccount={withButtonAccount}>
        {titulo}
      </AppBar>
)}
  />
);
PageTemplate.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  titulo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onDone: PropTypes.func,
  withButtonAccount: PropTypes.bool,
};
PageTemplate.defaultProps = {
  onDone: null,
  withButtonAccount: null,
};
export default compose(
  connect(
    null,
    { toggleMenu: operations.toggleMenu },
  ),
)(PageTemplate);
