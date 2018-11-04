import React from 'react';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const BarTabs = props => {
  const {className, tabList, value, onChange} = props;
  return (
    <AppBarMaterialUI position="static" color="default" className={className}>
      <Tabs
        value={value}
        onChange={onChange}
        scrollable
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
      >
        {tabList.map(tab=>(
          <Tab key={tab.value} value={tab.value} label={tab.label} icon={tab.icon} />
        ))}
      </Tabs>
    </AppBarMaterialUI>
  );
}
export default BarTabs;