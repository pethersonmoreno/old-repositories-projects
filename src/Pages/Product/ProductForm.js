import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles, List, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { asyncOperation } from 'HOC/withAsyncOperation';
import InvisibleButtonSubmit from 'Atoms/InvisibleButtonSubmit';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
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
class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: { ...props.product },
      productInStores: [...props.productInStores],
    };
  }

  onSave = async (event) => {
    const { save, onSaved } = this.props;
    event.preventDefault();
    const { product: { description } } = this.state;
    if (description) {
      asyncOperation(() => save({ ...this.state }), {
        successMessage: 'Sucesso ao salvar produto',
        successCallback: onSaved,
        errorMessage: 'Erro ao salvar produto',
      });
    }
  };

  existProductInStore = (storeId) => {
    const { productInStores } = this.state;
    return (productInStores.find(p => p.storeId === storeId));
  }

  addToStore = (storeId) => {
    const { productInStores } = this.state;
    if (this.existProductInStore(storeId)) {
      return;
    }
    this.setState({
      productInStores: productInStores.concat({
        storeId,
        price: null,
      }),
    });
  }

  updatePriceInStore = (storeId, price) => {
    const { productInStores } = this.state;
    if (!this.existProductInStore(storeId)) {
      return;
    }
    const newProductInStores = productInStores.map(productInStore => (
      productInStore.storeId === storeId
        ? {
          ...productInStore,
          price,
        }
        : productInStore
    ));
    this.setState({ productInStores: newProductInStores });
  }

  removeProductInStore = (storeId) => {
    const { productInStores } = this.state;
    this.setState({
      productInStores: productInStores.filter(productInStore => productInStore.storeId !== storeId),
    });
  }

  setProductState = (productChanges) => {
    const { product } = this.state;
    this.setState({
      product: { ...product, ...productChanges },
    });
  }

  render() {
    const {
      classes,
      editing, backPath, title,
      stores,
    } = this.props;
    const {
      product: { id, description, ean },
      productInStores,
    } = this.state;
    let content;
    let onDone;
    if (editing && !id) {
      onDone = null;
      content = <Typography>Produto não encontrada</Typography>;
    } else {
      onDone = this.onSave;

      const storesOptions = stores
        .filter(store => !productInStores.find(p => (p.storeId === store.id)))
        .map(store => ({
          value: store.id,
          label: store.name,
        }));
      content = (
        <form noValidate autoComplete="on" onSubmit={this.onSave}>
          <InvisibleButtonSubmit />
          <TextField
            label="Descrição"
            value={description}
            autoFocus
            fullWidth
            onChange={event => this.setProductState({ description: event.target.value })}
          />
          <TextField
            label="EAN"
            value={ean}
            fullWidth
            onChange={event => this.setProductState({ ean: event.target.value })}
          />
          <ReactSelect
            label="Adicionar Loja"
            value={null}
            options={storesOptions}
            onChange={value => this.addToStore(value.value)}
          />
          <List>
            {productInStores
              .map(productInStore => ({
                ...productInStore,
                store: stores.find(s => (s.id === productInStore.storeId)),
              }))
              .filter(productInStore => productInStore.store)
              .map(({ storeId, price, store }) => (
                <PaperListItem
                  key={storeId}
                >
                  <div className="content">
                    {store.name}
                  </div>
                  <div className="contentRight">
                    <TextEditable
                      className={classes.textEditable}
                      onConfirm={value => this.updatePriceInStore(storeId, value)}
                      value={price}
                      inputProps={{
                        type: 'number',
                        step: '0.01',
                      }}
                    />
                    <IconButton
                      onClick={() => this.removeProductInStore(storeId)}
                    >
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
ProductForm.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  editing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    ean: PropTypes.string,
  }),
  productInStores: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  stores: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
ProductForm.defaultProps = {
  editing: false,
  product: {
    id: null,
    description: '',
    ean: '',
  },
  productInStores: [],
};

const mapStateToProps = state => ({
  stores: state.stores,
});
const mapDispatchToProps = null;
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(ProductForm);
