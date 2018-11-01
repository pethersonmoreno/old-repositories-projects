import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LabelIcon from '@material-ui/icons/Label';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AppContent from '../AppContent';
import {shipLists, categories, products, productTypes, brands, sizes, SELECAO_DIRETA, SELECAO_POR_TIPO_TAMANHO} from '../dataApp';

const styles = theme => ({
  root:{
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabsBar:{
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  fabContainer: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fab: {
    marginLeft: '5px',
  },
  categoryItem: {
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  badgeRoot: {
    flex: '1 1 auto',
  },
  badgeBadge: {
    top: 1,
    right: -2,
    // The border color match the background color.
    border: `0px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});
function BarTabs(props){
  const {classes, shipLists, tabSelected, handleTabChange} = props;
  return (
    <AppBarMaterialUI position="static" color="default" className={classes.tabsBar}>
      <Tabs
        value={tabSelected}
        onChange={handleTabChange}
        scrollable
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab value="new" label="Nova" icon={<AddCircleIcon />} />
        {shipLists.map(shipList=>(
          <Tab key={shipList.id} value={shipList.id} label={shipList.description} icon={<FavoriteIcon />} />
        ))}
      </Tabs>
    </AppBarMaterialUI>
  );
}
class ShipListItem extends Component{
  getDescription(productTypeId, brandId, sizeId){
    const productType = productTypes.find(productType=>productType.id === productTypeId);
    const brand = brands.find(brand=>brand.id === brandId);
    const size = sizes.find(size=>size.id === sizeId);
    let description = '';
    if(productType !== undefined){
      description += productType.description + ' ';
    }
    if(brand !== undefined){
      description += brand.description + ' ';
    }
    if(size !== undefined){
      description += size.description + ' ';
    }
    return description;
  }
  getDescriptionOfProduct(productId){
    const product = products.find(product=>product.id === productId);
    if(product === undefined){
      return '';
    }
    return this.getDescription(product.productTypeId, product.brandId, product.sizeId);
  }
  getDescriptionOfShipListItem(item){
    if(item.selecao === SELECAO_DIRETA){
      return this.getDescriptionOfProduct(item.productId);
    } else if(item.selecao === SELECAO_POR_TIPO_TAMANHO){
      return this.getDescription(item.productTypeId, null, item.sizeId);
    }
    return '?';
  }
  render(){
    const {classes, item} = this.props;
    const description = item.qtd + ' UN ' + this.getDescriptionOfShipListItem(item);
    return (
      <ListItem button className={classes.nested}>
        <ListItemText inset primary={description} />
      </ListItem>
    );
  }
}
class CategoryListItem extends Component{
  getShipListItemsOfCategory(category, shipList){
    if(shipList === undefined){
      return [];
    }
    return shipList.items.filter(item=>{
      let productType;
      if(item.selecao === SELECAO_DIRETA){
        const product = products.find(product=>product.id === item.productId);
        if(product !== undefined){
          productType = productTypes.find(productType=>productType.id === product.productTypeId);
        }
      } else if(item.selecao === SELECAO_POR_TIPO_TAMANHO){
        productType = productTypes.find(productType=>productType.id === item.productTypeId);
      }
      return (productType !== undefined && productType.categoryId === category.id);
    });
  }
  render(){
    const {classes, category, shipList, isExpanded, toggleCollapse} = this.props;
    const itemsOfCategory = this.getShipListItemsOfCategory(category, shipList);
    const expanded = isExpanded();
    if(itemsOfCategory.length > 0){
      return (
        <div>
          <ListItem button 
            className={classes.categoryItem}
            onClick={toggleCollapse}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <Badge badgeContent={itemsOfCategory.length} color="primary" classes={{ root: classes.badgeRoot, badge: classes.badgeBadge }}>
              <ListItemText inset primary={category.description} />
            </Badge>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {itemsOfCategory.map((item, index)=>(
                  <ShipListItem key={index} classes={classes} item={item} />
              ))}
            </List>
          </Collapse>
        </div>
      );
    }
    return (<div></div>);
  }
}
class CategoryList extends Component{
  constructor(props){
    super(props);
    const {shipList} = props;
    this.state = {
      categoriesCollapsed: (shipList !== undefined && shipList.items.length > 10
        ?categories.map(category=>category.id)
        :[]),
      shipList: shipList,
    };
  }
  handleCategoryExpandable(category){
    const {categoriesCollapsed} = this.state;
    let newCategoriesCollapsed = categoriesCollapsed.concat();
    const index = newCategoriesCollapsed.indexOf(category.id);
    if(index === -1){
      newCategoriesCollapsed.push(category.id);
    } else {
      newCategoriesCollapsed.splice(index, 1);
    }
    this.setState({ categoriesCollapsed: newCategoriesCollapsed });
  }
  isCategoryExpanded(category){
    const {categoriesCollapsed} = this.state;
    return (categoriesCollapsed.find(categoryId => categoryId === category.id) === undefined);
  }
  render(){
    const {classes, shipList} = this.props;
    return (
      <div>
        {categories.map(category=>(
            <CategoryListItem key={category.id} classes={classes} 
              toggleCollapse={this.handleCategoryExpandable.bind(this, category)}
              isExpanded={this.isCategoryExpanded.bind(this, category)}
              category={category} shipList={shipList} />
        ))}
      </div>
    );
  }
}
class DetailedTabs extends Component{
  constructor(props){
    super(props);
    this.state = {
      shipListSelected: undefined,
    };
  }
  componentWillMount(){
    if(shipLists.length > 0){
      this.setState({ shipListSelected: shipLists[0]});
    }
  }
  handleTabChange = (event, tabSelected) => {
    const {history} = this.props;
    if(tabSelected === 'new'){
      history.push('/shipList/new');
    } else {
      const shipListSelected = shipLists.find(shipList=>shipList.id === tabSelected);
      this.setState({ shipListSelected});
    }
  }
  edit(){
    const { history } = this.props;
    const {shipListSelected} = this.state;
    if(shipListSelected !== undefined){
      history.push('/shipList/'+shipListSelected.id);
    }
  }
  
  render(){
    const { classes } = this.props;
    const { shipListSelected } = this.state;
    let tabSelected = (shipListSelected !== undefined?shipListSelected.id:'new');
    return (
      <AppContent titulo="Não esqueça!" removePadding={true}>
        <div className={classes.root}>
          <BarTabs classes={classes} shipLists={shipLists}
              tabSelected={tabSelected} handleTabChange={this.handleTabChange} />
          <CategoryList classes={classes} 
            shipList={shipListSelected} />
          {shipListSelected && (
            <div className={classes.fabContainer}>
              <Button variant="fab" className={classes.fab} color='primary'
                onClick={this.edit.bind(this)}>
                <EditIcon />
              </Button>
              <Button variant="fab" className={classes.fab} color='primary'>
                <AddIcon />
              </Button>
            </div>
          )}
        </div>
      </AppContent>
    );
  }
}
export default withStyles(styles, { withTheme: true })(DetailedTabs);