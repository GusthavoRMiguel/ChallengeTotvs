import Filial from '../models/Filial.js';
import Toast from '../models/Toast.js'; 

class LoginController {

  static toast = new Toast(); 
  
  static handleLogin(codigoFilial, codigoUsuario) {
    const filiais = Filial.listar();
    const filialEncontrada = filiais.find(filial => filial.codigo === codigoFilial);

    if (filialEncontrada && filialEncontrada.responsavel.codigo === codigoUsuario) {
    
      localStorage.setItem('auth', '1');
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
