import Filial from '../models/Filial.js';

function generateSecureId() {
  return crypto.randomUUID(); 
}

class Entrega {
  constructor(filialOrigem, filialDestino, dataChegada, item) {
    this.id = generateSecureId();
    this.filialOrigem = {
      codigo: filialOrigem.codigo,
      nome: filialOrigem.nome,
      endereco: filialOrigem.endereco,
      responsavel: filialOrigem.responsavel,
    }; 
    this.filialDestino = {
      codigo: filialDestino.codigo,
      nome: filialDestino.nome,
      endereco: filialDestino.endereco,
      responsavel: filialDestino.responsavel,
    }; 
    this.dataEnvio = null; 
    this.dataChegada = dataChegada;
    this.status = 'pendente'; 
    this.item = item;
  }

  

  enviar() {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
 
    const dataEnvio = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;

    const envio = {
      id: this.id,
      filialOrigem: this.filialOrigem,
      filialDestino: this.filialDestino,
      dataEnvio: dataEnvio,
      dataChegada: this.dataChegada,
      status: 'enviado',
      item: this.item
    };

    const recebimento = {
      id: this.id,
      filialOrigem: this.filialOrigem,
      filialDestino: this.filialDestino,
      dataEnvio: dataEnvio,
      dataChegada: this.dataChegada,
      status: 'pendente',
      item: this.item
    };

    Filial.criarEnvio(this.filialOrigem.codigo, envio);
    Filial.criarRecebimento(this.filialDestino.codigo, recebimento);

    this.dataEnvio = dataEnvio;
    this.status = 'enviado';
  }
}

export default Entrega;