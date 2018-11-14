import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'state/ducks/productTypes';
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
// const editProductType = ({ productTypes, sizes, brands }, productTypeId, history, valores) => {
//   const productType = productTypes.find(type => type.id === productTypeId);
//   productType.description = valores.description;
//   productType.categoryId = valores.categoryId;
//   updateList(productType.id, sizes, valores.sizes);
//   updateList(productType.id, brands, valores.brands);
//   history.push('/productType');
// };
const Edit = (props) => {
  const {
    history, match, productTypes, editProductType,
  } = props;
  const productTypeId = parseInt(match.params.id, 10);
  const productType = productTypes.find(type => type.id === productTypeId);
  let conteudo = <Typography>Tipo de Produto não encontrado</Typography>;
  if (productType !== undefined) {
    conteudo = (
      <Form
        productType={productType}
        textoBotao="Alterar"
        onSubmit={(data) => {
          editProductType(productTypeId, data);
          history.push('/productType');
        }}
      />
    );
  }
  return (
    <PageTemplate titulo={`Tipo de Produto ${productType ? productType.description : ''}`}>
      {conteudo}
    </PageTemplate>
  );
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  editProductType: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  productTypes: state.productTypes,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editProductType: operations.editProductType,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
