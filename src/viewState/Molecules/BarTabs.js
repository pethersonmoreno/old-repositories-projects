import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const BarTabs = ({
  className, tabList, value, onChange,
}) => (
  <AppBar position="static" color="default" className={className}>
    <Tabs
      value={value}
      onChange={onChange}
      scrollable
      scrollButtons="on"
      indicatorColor="primary"
      textColor="primary"
    >
      {tabList.map(tab => (
        <Tab key={tab.value} value={tab.value} label={tab.label} icon={tab.icon} />
      ))}
    </Tabs>
  </AppBar>
);
BarTabs.propTypes = {
  className: PropTypes.string,
  tabList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    }),
  ).isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};
BarTabs.defaultProps = {
  className: '',
};
export default BarTabs;
