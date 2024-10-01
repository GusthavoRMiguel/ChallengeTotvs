import Filial from '../models/Filial.js';
import Toast from '../models/Toast.js';

class CadastroController {
  static toast = new Toast(); 

  static async buscarCep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Erro ao buscar CEP');
      }
      const data = await response.json();

      if (data.erro) {
        this.toast.showToast('CEP inválido.', 'error'); 
        return null; 
      }

      this.toast.showToast('CEP encontrado com sucesso!', 'success'); 
      return data;

    } catch (error) {
      console.error(error);
      this.toast.showToast('Erro ao buscar CEP.', 'error'); 
      return null; 
    }
  }

  static handleCadastro(codigoFilial, nomeFilial, codResponsavelAlmox, nomeResponsavelAlmox, cep, rua, numero, complemento, bairro, cidade, estado) {
    const novaFilial = new Filial(codigoFilial, nomeFilial, {
      cep: cep,
      rua: rua,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    }, {
      codigo: codResponsavelAlmox,
      nome: nomeResponsavelAlmox,
    });

    if (!novaFilial.criarFilial()) {
      this.toast.showToast('Cadastro falhou.', 'error'); 
      return false; 
    }

 
    this.toast.showToast('Filial cadastrada com sucesso!', 'success'); 
    window.location.href = '/index.html';
    return true; 
  }
}

export default CadastroController;
