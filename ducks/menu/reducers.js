import { combineReducers } from "redux";
import types from "./types";
/* State Shape
{
    menuOpen: bool,
    menuShipListsOpen: bool,
    smUp: bool
}
*/
const menuOpenReducer = (state = false, action) => {
  if (action.type === types.TOGGLE_MENU) {
    return !state;
  }
  return state;
};
const menuShipListsOpenReducer = (state = true, action) => {
  if (action.type === types.TOGGLE_MENU_SHIPLISTS) {
    return !state;
  }
  return state;
};
const smUpReducer = (state = false, action) => {
  if (action.type === types.UPDATE_SMUP) {
    return action.payload.smUp;
  }
  return state;
};
const reducer = combineReducers({
  menuOpen: menuOpenReducer,
  menuShipListsOpen: menuShipListsOpenReducer,
  smUp: smUpReducer
});
export default reducer;
