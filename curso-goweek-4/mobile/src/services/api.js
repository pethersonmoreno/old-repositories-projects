import axios from 'axios';

const api = axios.create({
  // baseURL: "http://10.0.2.2:3000",//Emulador Android
  baseURL: "http://10.0.3.2:3000",//Emulador Genymotion
  // baseURL: "http://localhost:3000",//Simulador IOS - Não cria uma máquina virtual
});

export default api;