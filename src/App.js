import React, { Component } from 'react';
import XLSX from 'xlsx';
import './App.css';

class App extends Component {
  exportFile = () => {
    const data = [
      ['Nome', 'Perfil', 'Equipe'],
      ['Antonio', 'Diretor', 'Sem equipe'],
      ['Cassia', 'Corretor', 'Equipe hortolândia'],
      ['Júlio', 'Diretor', 'Sem equipe'],
      ['Daniel', 'Diretor', 'Sem equipe'],
      ['Douglas', 'Diretor', 'Sem equipe'],
      ['Gustavo', 'Diretor', 'Sem equipe'],
      ['Jefferson', 'Diretor', 'Sem equipe'],
      ['João', 'Corretor', 'Sem equipe'],
      ['Mariani', 'Diretor', 'Sem equipe'],
      ['Lucas', 'Diretor', 'Sem equipe'],
      ['Thiago', 'Diretor', 'Sem equipe'],
      ['Paulo', 'Diretor', 'Sem equipe'],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'sheetjs.xlsx');
  };
  render() {
    return (
      <div className="App">
        <h1>Teste de Exportação em Excel</h1>
        <p>
          <button onClick={this.exportFile}>Exportar</button>
        </p>
      </div>
    );
  }
}

export default App;
