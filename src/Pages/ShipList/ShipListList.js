import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import AddIcon from '@material-ui/icons/Add';

const styles = () => ({
  item: {
    margin: '1px 0px',
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2)',
    borderRadius: '1%',
    padding: '8px 16px',
    '& > div:first-child': {
      paddingLeft: 0,
    },
  },
});
const ShipListList = ({ history, classes, shipLists }) => (
  <PageTemplate titulo="Não esqueça!" removePadding>
    <List component="div" disablePadding>
      {shipLists.map(shipList => (
        <ListItem
          className={classes.item}
          key={shipList.id}
          button
          onClick={() => history.push(`/shipList/${shipList.id}`)}
        >
          <ListItemText inset primary={shipList.description} />
        </ListItem>
      ))}
    </List>
    <ButtonFabContainer>
      <ButtonFab onClick={() => history.push('/shipList/new')}>
        <AddIcon />
      </ButtonFab>
    </ButtonFabContainer>
  </PageTemplate>
);
ShipListList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  shipLists: state.shipLists.shipLists,
  categories: state.categories,
  products: state.products,
  productTypes: state.productTypes,
});

const mapDispatchToProps = null;
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(ShipListList);
