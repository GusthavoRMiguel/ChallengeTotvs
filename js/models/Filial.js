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
      localStorage.setItem('filiais', JSON.stringify(filiais));
      return true;
    } else {
      return false;
    }
  }

  static listar() {
    return JSON.parse(localStorage.getItem('filiais')) || [];
  }
}

export default Filial;
