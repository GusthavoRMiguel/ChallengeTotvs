class Filial {
  constructor(codigo, nome, endereco, responsavel) {
    this.codigo = codigo;
    this.nome = nome;
    this.endereco = {
      cep: endereco.cep,
      rua: endereco.rua,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
    };
    this.responsavel = {
      codigo: responsavel.codigo,
      nome: responsavel.nome,
    };
    this.envios = []; 
    this.recebimentos = []; 
  }

  static validarCodigo(codigo) {
    const filiais = JSON.parse(localStorage.getItem('filiais')) || [];
    return !filiais.some(filial => filial.codigo === codigo);
  }

  criarFilial() {
    if (Filial.validarCodigo(this.codigo)) {
      const filiais = JSON.parse(localStorage.getItem('filiais')) || [];
      filiais.push(this);
      Filial.salvarFiliais(filiais);
      return true;
    } else {
      return false;
    }
  }

  static listar() {
    return JSON.parse(localStorage.getItem('filiais')) || [];
  }
 
  static salvarFiliais(filiais) {
    localStorage.setItem('filiais', JSON.stringify(filiais));
  }

  static criarEnvio(codigoFilial, envio) {
    const filiais = Filial.listar();
    const filial = filiais.find(filial => filial.codigo === codigoFilial);
    if (!filial) {
      throw new Error('Filial não encontrada');
    }

    filial.envios.push(envio);
    Filial.salvarFiliais(filiais);
  }

  static criarRecebimento(codigoFilial, recebimento) {
    const filiais = Filial.listar();
    const filial = filiais.find(filial => filial.codigo === codigoFilial);
    if (!filial) {
      throw new Error('Filial não encontrada');
    }

    filial.recebimentos.push(recebimento);
    Filial.salvarFiliais(filiais);
  }
}

export default Filial;