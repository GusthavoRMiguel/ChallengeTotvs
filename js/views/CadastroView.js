import CadastroController from '../controllers/CadastroController.js';

document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.getElementById('cadastroForm');

  const initializeTooltips = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    return [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  };

  const showErrorTooltip = (inputElement, message) => {
    inputElement.classList.add('is-invalid');
    inputElement.setAttribute('data-bs-title', message);
    new bootstrap.Tooltip(inputElement).show();
  };

  const clearErrorTooltip = (inputElement) => {
    inputElement.classList.remove('is-invalid');
    const tooltipInstance = bootstrap.Tooltip.getInstance(inputElement);
    if (tooltipInstance) {
      tooltipInstance.dispose();
    }
  };

  const preencherCamposComCep = (data) => {
    const erroCep = data.erro;
  
    if (erroCep) {
      // Exibir uma mensagem de erro para o usuário
      showErrorTooltip(document.getElementById('cep'), 'CEP não encontrado. Por favor, verifique e tente novamente.');
      return; // Não preenche os campos se houver erro
    }
  
    // Preenche os campos apenas se não houver erro
    document.getElementById('rua').value = data.logradouro || '';
    document.getElementById('bairro').value = data.bairro || '';
    document.getElementById('cidade').value = data.localidade || '';
    document.getElementById('estado').value = data.uf || '';
  
    // Bloqueia os campos para edição se preenchidos
    if (data.logradouro) {
      document.getElementById('rua').setAttribute('disabled', true);
      document.getElementById('bairro').setAttribute('disabled', true);
      document.getElementById('cidade').setAttribute('disabled', true);
      document.getElementById('estado').setAttribute('disabled', true);
    }
  };
  
  
  document.getElementById('buscarCep').addEventListener('click', async () => {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value;
  
    // Limpa qualquer erro anterior
    clearErrorTooltip(cepInput);
  
    // Valida o CEP antes de fazer a requisição
    const cepRegex = /^(?:\d{5}-\d{3}|\d{8})$/;
  
    if (!cepRegex.test(cep)) {
      showErrorTooltip(cepInput, 'CEP inválido. Formato: 00000-000');
      return;
    }
  
    try {
      const data = await CadastroController.buscarCep(cep);
      if (data) {
        preencherCamposComCep(data);
      } else {
        showErrorTooltip(cepInput, 'CEP não encontrado!');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  });
  

  cadastroForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const codigoFilial = document.getElementById('codigoFilial');
    const nomeFilial = document.getElementById('nomeFilial');
    const codResponsavelAlmox = document.getElementById('codResponsavelAlmox');
    const nomeResponsavelAlmox = document.getElementById('nomeResponsavelAlmox');
    const cep = document.getElementById('cep');
    const rua = document.getElementById('rua');
    const numero = document.getElementById('numero');
    const complemento = document.getElementById('complemento');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');

    clearErrorTooltip(codigoFilial);
    clearErrorTooltip(nomeFilial);
    clearErrorTooltip(codResponsavelAlmox);
    clearErrorTooltip(nomeResponsavelAlmox);
    clearErrorTooltip(cep);
    clearErrorTooltip(rua);
    clearErrorTooltip(numero);
    clearErrorTooltip(complemento);
    clearErrorTooltip(bairro);
    clearErrorTooltip(cidade);
    clearErrorTooltip(estado);

    const filialCadastrada = CadastroController.handleCadastro(codigoFilial.value, nomeFilial.value, codResponsavelAlmox.value, nomeResponsavelAlmox.value, cep.value, rua.value, numero.value, complemento.value, bairro.value, cidade.value, estado.value);

    if (!filialCadastrada) {
      showErrorTooltip(codigoFilial, 'Código da filial já existe!');
    }
  });

  initializeTooltips();
});
