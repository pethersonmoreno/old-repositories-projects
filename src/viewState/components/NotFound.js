import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppContent from './AppContent';

export default function NotFound(){
  return (
    <AppContent titulo="Controle de Compras">
      <Typography>
        Página não encontrada
      </Typography>
    </AppContent>
  );
}