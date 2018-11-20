import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/productTypes';
import Form from '../ProductTypeForm';

// const updateList = (productTypeId, baseList, newList) => {
//   baseList
//     .filter(item => item.productTypeId === productTypeId)
//     .filter(item => newList.indexOf(item.description) === -1)
//     .forEach((item) => {
//       baseList.splice(baseList.indexOf(item), 1);
//     });
//   newList
//     .filter(description => baseList.find(item => item.description === description) === undefined)
//     .forEach(description => baseList.push({
//       id: baseList.length,
//       productTypeId,
//       description,
//     }));
// };

// const add = ({ productTypes, sizes, brands }, history, valores) => {
//   const productTypeId = productTypes.length + 1;
//   productTypes.push({ id: productTypeId, ...valores });
//   updateList(productTypeId, sizes, valores.sizes);
//   updateList(productTypeId, brands, valores.brands);
//   history.push('/productType');
// };

const Add = (props) => {
  const { history, add } = props;
  return (
    <PageTemplate titulo="Novo Tipo de Produto">
      <Form textoBotao="Adicionar" save={add} onSaved={() => history.push('/productType')} />
    </PageTemplate>
  );
};
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  add: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    add: operations.add,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add);
