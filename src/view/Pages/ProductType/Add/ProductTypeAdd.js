import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ProductTypeForm';

const updateList = (productTypeId, baseList, newList) => {
  baseList
    .filter(item => item.productTypeId === productTypeId)
    .filter(item => newList.indexOf(item.description) === -1)
    .forEach((item) => {
      baseList.splice(baseList.indexOf(item), 1);
    });
  newList
    .filter(description => baseList.find(item => item.description === description) === undefined)
    .forEach(description => baseList.push({
      id: baseList.length,
      productTypeId,
      description,
    }));
};

const addProductType = ({ productTypes, sizes, brands }, history, valores) => {
  const productTypeId = productTypes.length + 1;
  productTypes.push({ id: productTypeId, ...valores });
  updateList(productTypeId, sizes, valores.sizes);
  updateList(productTypeId, brands, valores.brands);
  history.push('/productType');
};

const Add = (props) => {
  const {
    history, productTypes, sizes, brands,
  } = props;
  return (
    <PageTemplate titulo="Novo Tipo de Produto">
      <Form
        textoBotao="Adicionar"
        onSubmit={valores => addProductType({ productTypes, sizes, brands }, history, valores)}
      />
    </PageTemplate>
  );
};
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  sizes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  brands: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default connect(
  state => ({ ...state.data }),
  null,
)(Add);
