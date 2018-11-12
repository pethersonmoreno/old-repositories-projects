import { connect } from 'react-redux';
import { operations } from '../../../state/ducks/menu';
import MenuResponsive from './MenuResponsive';

const MenuResponsiveContainer = connect(
  state => ({ ...state.menu }),
  { ...operations },
)(MenuResponsive);

export default MenuResponsiveContainer;
