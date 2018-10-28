import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppContent from '../AppContent';

export default function AddProduct(){
  return (
    <AppContent titulo="Controle de Compras - Nova Lista">
      <Typography paragraph>
        Conteúdo da nova lista de compras
      </Typography>
    </AppContent>
  );
}