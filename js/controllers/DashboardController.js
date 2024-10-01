import Entrega from '../models/Entrega.js';
import Toast from '../models/Toast.js';
import Filial from '../models/Filial.js';

class DashboardController {
  static toast = new Toast();


  static adicionarEnvio() {
    const filialDestinoCodigo = document.getElementById('selectFilialDestino').value;
    const item = document.getElementById('inputItem').value;
    const dataChegada = document.getElementById('inputDataChegada').value;

    const dataChegadaObj = new Date(dataChegada + 'T00:00:00'); 
    const dataChegadaFormatted = dataChegadaObj.toLocaleDateString('pt-BR');
  
  
    const filialLogada = JSON.parse(localStorage.getItem('filial'));
    
    
    if (!filialDestinoCodigo || !item || !dataChegadaFormatted) {
      this.toast.showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      return; 
    }
  
    
    const filiais = Filial.listar();
    const filialOrigem = filiais.find(filial => filial.codigo === filialLogada.codigo);
    const filialDestino = filiais.find(filial => filial.codigo === filialDestinoCodigo);
  

    const entrega = new Entrega(filialOrigem, filialDestino, dataChegadaFormatted, item);
    
    
    entrega.enviar();
    this.toast.showToast('Envio cadastrado com sucesso!', 'success');
    
    document.getElementById('selectFilialDestino').value = '';
    document.getElementById('inputItem').value = '';
    document.getElementById('inputDataChegada').value = '';
    
    $('#modalNovoEnvio').modal('hide');
  }
  
  static receberEntrega(id) {
    const filiais = Filial.listar();
    const filialLogada = JSON.parse(localStorage.getItem('filial'));
    const filialAtual = filiais.find(filial => filial.codigo === filialLogada.codigo);

    if (!filialAtual) {
        this.toast.showToast('Filial não encontrada.', 'error');
        return;
    }

    const recebimento = filialAtual.recebimentos.find(r => r.id === id);

    if (!recebimento) {
        this.toast.showToast('Recebimento não encontrado.', 'error');
        return;
    }

    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');

    const dataRecebimentoFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;

   
    recebimento.status = `Recebido em ${dataRecebimentoFormatada}`;
    
    
    const filialOrigem = filiais.find(filial => filial.codigo === recebimento.filialOrigem.codigo);
    if (filialOrigem) {
        const envioCorrespondente = filialOrigem.envios.find(e => e.id === id);
        if (envioCorrespondente) {
            envioCorrespondente.status = `Recebido em ${dataRecebimentoFormatada}`;
        }
    }


    Filial.salvarFiliais(filiais);
    this.toast.showToast('Recebimento confirmado com sucesso!', 'success');
    
    
    $('#modalConfirmacaoRecebimento').modal('hide'); 
}

  static handleLogout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('filial');
    window.location.href = '/index.html';
  }

}
 
export default DashboardController;
