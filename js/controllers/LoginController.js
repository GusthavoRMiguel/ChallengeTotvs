import Filial from '../models/Filial.js';
import Toast from '../models/Toast.js'; 

class LoginController {
  static toast = new Toast(); 
  
  static handleLogin(codigoFilial, codigoUsuario) {
   
    if (!codigoFilial || !codigoUsuario) {
      this.toast.showToast('Por favor, insira o código da filial e o código do usuário.', 'error');
      return false;
    }
 
    const filiais = Filial.listar();
    const filialEncontrada = filiais.find(filial => filial.codigo === codigoFilial);

    if (filialEncontrada && filialEncontrada.responsavel.codigo === codigoUsuario) {
      localStorage.setItem('auth', '1');
      localStorage.setItem('filial', JSON.stringify({ "codigo": filialEncontrada.codigo, "nome": filialEncontrada.nome }));
      this.toast.showToast('Login realizado com sucesso!', 'success'); 
      window.location.href = '/dashboard.html';
      return true;
    } else {
      this.toast.showToast('Código da filial ou usuário inválido.', 'error'); 
      return false;
    }
  }
}

export default LoginController;
