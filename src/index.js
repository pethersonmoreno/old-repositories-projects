import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux'
import { Provider } from 'react-redux'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import App from './components/App';
import reducers from './reducers';
import ListCategories from './components/category/List';
import AddCategory from './components/category/Add';
import EditCategory from './components/category/Edit';
import ListProductTypes from './components/productType/List';
import AddProductType from './components/productType/Add';
import EditProductType from './components/productType/Edit';
import ListaProducts from './components/product/List';
import AddProduct from './components/product/Add';
import EditProduct from './components/product/Edit';
import DetailedTabsShipList from './components/shipList/DetailedTabs';
import AddShipList from './components/shipList/Add';
import EditShipList from './components/shipList/Edit';
import AddShipListItem from './components/shipListItem/Add';
import EditShipListItem from './components/shipListItem/Edit';

import NotFound from './components/NotFound';
import './index.css';

const store = createStore(reducers)

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
});
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App>
        {/* <Route path="/" component={App}> */}
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/shipList" />} />
            <Route path="/category/new" component={AddCategory}/>
            <Route path="/category/:id" component={EditCategory}/>
            <Route path="/category" component={ListCategories}/>
            <Route path="/productType/new" component={AddProductType}/>
            <Route path="/productType/:id" component={EditProductType}/>
            <Route path="/productType" component={ListProductTypes}/>
            <Route path="/product/new" component={AddProduct}/>
            <Route path="/product/:id" component={EditProduct}/>
            <Route path="/product" component={ListaProducts}/>
            <Route path="/shipList/new" component={AddShipList}/>
            <Route path="/shipList/:shipListId/item/new" component={AddShipListItem}/>
            <Route path="/shipList/:shipListId/item/:id" component={EditShipListItem}/>
            <Route path="/shipList/:id" component={EditShipList}/>
            <Route path="/shipList" component={DetailedTabsShipList}/>
            <Route component={NotFound} />
          </Switch>
        {/* </Route> */}
        </App>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
