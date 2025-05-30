import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from 'Molecules/AppBar';
import { goBack } from 'HOC/withGoBack';
import PageBaseTemplate from './PageBaseTemplate';

const PageWithBackButtonTemplate = ({
  titulo,
  backPath,
  goBack: goBackProp,
  onDone,
  withButtonAccount,
  ...otherProps
}) => {
  let goBackUsed = goBackProp;
  if (!goBackUsed) {
    goBackUsed = goBack(backPath, otherProps);
  }
  return (
    <PageBaseTemplate
      {...otherProps}
      appBar={(
        <AppBar goBack={goBackUsed} onDone={onDone} withButtonAccount={withButtonAccount}>
          {titulo}
        </AppBar>
)}
    />
  );
};

PageWithBackButtonTemplate.propTypes = {
  titulo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  backPath: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  goBack: PropTypes.func,
  onDone: PropTypes.func,
  withButtonAccount: PropTypes.bool,
};
PageWithBackButtonTemplate.defaultProps = {
  backPath: '/',
  goBack: null,
  onDone: null,
  withButtonAccount: null,
};
export default withRouter(PageWithBackButtonTemplate);
