import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { asyncOperation } from 'HOC/withAsyncOperation';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import InvisibleButtonSubmit from 'Atoms/InvisibleButtonSubmit';
import ReactSelect from 'Atoms/ReactSelect';
import PaperListItem from 'Atoms/PaperListItem';
import TextEditable from 'Atoms/TextEditable';

const styles = () => ({
  textEditable: {
    display: 'inline-block',
    width: '90px',
    textAlign: 'center',
  },
});
class StoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: { ...props.storeShop },
      productsInStore: [...props.productsInStore],
    };
  }

  onSave = async (event) => {
    const { save, onSaved } = this.props;
    const { store: { name } } = this.state;
    event.preventDefault();
    asyncOperation(() => save({ ...this.state }), {
      successMessage: `Sucesso ao salvar Loja ${name}`,
      successCallback: onSaved,
      errorMessage: 'Erro ao salvar Loja',
    });
  }


  existProductInStore = (productId) => {
    const { productsInStore } = this.state;
    return (productsInStore.find(p => p.productId === productId));
  }

  addProductToStore = (productId) => {
    const { productsInStore } = this.state;
    if (this.existProductInStore(productId)) {
      return;
    }
    this.setState({
      productsInStore: productsInStore.concat({
        productId,
        price: null,
      }),
    });
  }

  updatePriceInProduct = (productId, price) => {
    const { productsInStore } = this.state;
    if (!this.existProductInStore(productId)) {
      return;
    }
    const newProductsInStore = productsInStore.map(productInStore => (
      productInStore.productId === productId
        ? {
          ...productInStore,
          price,
        }
        : productInStore
    ));
    this.setState({ productsInStore: newProductsInStore });
  }

  removeProductInStore = (productId) => {
    const { productsInStore } = this.state;
    this.setState({
      productsInStore: productsInStore
        .filter(productInStore => productInStore.productId !== productId),
    });
  }

  setStoreState = (storeChanges) => {
    const { store } = this.state;
    this.setState({
      store: { ...store, ...storeChanges },
    });
  }

  render() {
    const {
      classes,
      editing, backPath, title,
      products,
    } = this.props;
    const {
      store: {
        id, name, physicalStoreAddress, virtualStoreSite,
      },
      productsInStore,
    } = this.state;
    let content;
    let onDone;
    if (editing && !id) {
      onDone = null;
      content = <Typography>Loja não encontrada</Typography>;
    } else {
      onDone = this.onSave;

      const productsOptions = products
        .filter(product => !productsInStore.find(p => (p.productId === product.id)))
        .map(store => ({
          value: store.id,
          label: store.description,
        }));
      content = (
        <form noValidate autoComplete="on" onSubmit={this.onSave}>
          <InvisibleButtonSubmit />
          <TextField
            label="Nome"
            value={name}
            autoFocus
            fullWidth
            onChange={event => this.setStoreState({ name: event.target.value })}
          />
          <TextField
            label="Endereço da Loja Física"
            value={physicalStoreAddress}
            fullWidth
            onChange={event => this.setStoreState({ physicalStoreAddress: event.target.value })}
          />
          <TextField
            label="Site da Loja Virtual"
            value={virtualStoreSite}
            fullWidth
            onChange={event => this.setStoreState({ virtualStoreSite: event.target.value })}
          />
          <ReactSelect
            label="Adicionar Produto"
            value={null}
            options={productsOptions}
            onChange={value => this.addProductToStore(value.value)}
          />
          <List>
            {productsInStore
              .map(productInStore => ({
                ...productInStore,
                product: products.find(p => (p.id === productInStore.productId)),
              }))
              .filter(productInStore => productInStore.product)
              .map(({ productId, price, product }) => (
                <PaperListItem
                  key={productId}
                >
                  <div className="content">
                    {product.description}
                  </div>
                  <div className="contentRight">
                    <TextEditable
                      className={classes.textEditable}
                      onConfirm={value => this.updatePriceInProduct(productId, value)}
                      value={price}
                      inputProps={{
                        type: 'number',
                        step: '0.01',
                      }}
                    />
                    <IconButton onClick={() => this.removeProductInStore(productId)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </div>
                </PaperListItem>
              ))
            }
          </List>
        </form>
      );
    }
    return (
      <PageWithBackButtonTemplate
        backPath={backPath}
        titulo={title}
        onDone={onDone}
        withButtonAccount={false}
      >
        <Paper className="paper">{content}</Paper>
      </PageWithBackButtonTemplate>
    );
  }
}
StoreForm.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  editing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  storeShop: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    physicalStoreAddress: PropTypes.string,
    virtualStoreSite: PropTypes.string,
  }),
  productsInStore: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
StoreForm.defaultProps = {
  editing: false,
  storeShop: {
    id: null,
    name: '',
    physicalStoreAddress: '',
    virtualStoreSite: '',
  },
  productsInStore: [],
};

const mapStateToProps = state => ({
  products: state.products,
});
const mapDispatchToProps = null;
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(StoreForm);
