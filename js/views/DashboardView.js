import DashboardController from '../controllers/DashboardController.js';
import Filial from '../models/Filial.js';

document.addEventListener('DOMContentLoaded', () => {
  const filialLogada = JSON.parse(localStorage.getItem('filial'));
  const filialDisplay = document.getElementById('filial');
  const btnEnvios = document.getElementById('btnEnvios');
  const btnRecebimentos = document.getElementById('btnRecebimentos');
  const btnLogout = document.getElementById('btnLogout');
  const mainContent = document.getElementById('mainContent');
  const btnReceber = document.getElementById('btnConfirmarRecebimento');
  const formNovoEnvio = document.getElementById('formNovoEnvio');
  const selectFilialDestino = document.getElementById('selectFilialDestino'); 
  const conteudoRecebimento = document.getElementById('conteudoRecebimento');
  const conteudoDetalhesEnvio = document.getElementById('conteudoDetalhesEnvio');
  const conteudoDetalhesRecebimento = document.getElementById('conteudoDetalhesRecebimento');

  const verificarAutenticacao = () => {
    const auth = localStorage.getItem('auth');
    return auth === '1'; 
  };

  const protegerRotaPrivada = () => {
    if (!verificarAutenticacao()) {
      window.location.href = '/index.html'; 
    }
  };

  const populateSelectFilialDestino = () => {
    const filiais = Filial.listar();
    selectFilialDestino.innerHTML = '<option value="">Selecionar</option>'; 

    filiais.forEach(filial => {
      if (filial.codigo !== filialLogada.codigo) { 
        const option = document.createElement('option');
        option.value = filial.codigo;
        option.textContent = `${filial.codigo} - ${filial.nome}`;
        selectFilialDestino.appendChild(option);
      }
    });
  };

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

  const renderEnvios = (currentPage = 1, itemsPerPage = 9) => {
    const filiais = Filial.listar();
    const filialAtual = filiais.find(filial => filial.codigo === filialLogada.codigo);
    
    let html = '';
    const envios = filialAtual ? filialAtual.envios : [];
    const totalPages = Math.ceil(envios.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedEnvios = envios.slice(startIndex, endIndex);

    if (paginatedEnvios.length > 0) {
      paginatedEnvios.forEach(envio => {
        html += `
          <tr>
            <td class="align-middle" style="max-width: 300px; word-wrap: break-word;">${envio.item}</td>
            <td class="align-middle">${envio.filialDestino.nome}</td>
            <td class="align-middle">${envio.dataEnvio}</td>
            <td class="align-middle">${envio.dataChegada}</td>
            <td class="align-middle">${envio.status}</td>
            <td class="align-middle">
              <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalhesEnvio" onClick="renderDetalhesEnvio('${envio.id}')">Ver Detalhes</button>
            </td>
          </tr>
        `;
      });
    } else {
      html = `
        <tr>
          <td colspan="6" class="text-center p-5">Não há envios cadastrados.</td>
        </tr>
      `;
    }

    mainContent.innerHTML = `
      <h2>Envios</h2>
      <table class="table table-hover table-secondary mt-2">
        <thead class="table-dark">
          <tr>
            <th>Item</th>
            <th>Destino</th>
            <th>Data de Envio</th>
            <th>Previsão de Chegada</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${html}
        </tbody>
        <tfoot class="${totalPages === 1 ? 'd-none' : ''}">
         <tr>
         <th colspan="6">
          <ul class="pagination pagination-sm my-2 justify-content-center">
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
              <a class="page-link px-4 " href="#" aria-label="Previous" data-page="${currentPage - 1}">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            ${Array.from({ length: totalPages }, (_, index) => `
              <li class="page-item ${currentPage === index + 1 ? 'active' : ''}">
                <a class="page-link px-4 " href="#" data-page="${index + 1}">${index + 1}</a>
              </li>
            `).join('')}
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
              <a class="page-link px-4 " href="#" aria-label="Next" data-page="${currentPage + 1}">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul></th>
         </tr>
        </tfoot>
      </table>
    `;

    document.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = parseInt(event.target.getAttribute('data-page'));
        if (!isNaN(page)) {
          renderEnvios(page, itemsPerPage);
        }
      });
    });
  };

  const renderRecebimentos = (currentPage = 1, itemsPerPage = 9) => {
    const filiais = Filial.listar();
    const filialAtual = filiais.find(filial => filial.codigo === filialLogada.codigo);
    
    let html = '';
    const recebimentos = filialAtual ? filialAtual.recebimentos : [];
    const totalPages = Math.ceil(recebimentos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedRecebimentos = recebimentos.slice(startIndex, endIndex);

    if (paginatedRecebimentos.length > 0) {
      paginatedRecebimentos.forEach(recebimento => {
        html += `
          <tr>
            <td class="align-middle" style="max-width: 300px; word-wrap: break-word;">${recebimento.item}</td>
            <td class="align-middle">${recebimento.filialOrigem.nome}</td>
            <td class="align-middle">${recebimento.dataEnvio}</td>
            <td class="align-middle">${recebimento.dataChegada}</td>
            <td class="align-middle">${recebimento.status}</td>
            <td class="align-middle">
              ${recebimento.status === 'pendente' ? `<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalConfirmacaoRecebimento" onClick="renderConfirmacaoRecebimento('${recebimento.id}')">Receber</button>` : `<button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalhesRecebimento" onClick="renderDetalhesRecebimento('${recebimento.id}')">Ver Detalhes</button>`}
            </td>
          </tr>
        `;
      });
    } else {
      html = `
        <tr>
          <td colspan="6" class="text-center p-5">Não há recebimentos cadastrados.</td>
        </tr>
      `;
    }

    mainContent.innerHTML = `
      <h2>Recebimentos</h2>
      <table class="table table-hover table-secondary mt-2">
        <thead class="table-dark">
          <tr>
           <th>Item</th>
            <th>Origem</th>
            <th>Data de Envio</th>
            <th>Previsão de Chegada</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${html}
        </tbody>
         <tfoot class="${totalPages === 1 ? 'd-none' : ''}">
         <tr>
         <th colspan="6">
          <ul class="pagination pagination-sm my-2 justify-content-center">
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
              <a class="page-link px-4 " href="#" aria-label="Previous" data-page="${currentPage - 1}">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            ${Array.from({ length: totalPages }, (_, index) => `
              <li class="page-item ${currentPage === index + 1 ? 'active' : ''}">
                <a class="page-link px-4 " href="#" data-page="${index + 1}">${index + 1}</a>
              </li>
            `).join('')}
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
              <a class="page-link px-4 " href="#" aria-label="Next" data-page="${currentPage + 1}">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul></th>
         </tr>
        </tfoot>
      </table>
    `;

    document.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = parseInt(event.target.getAttribute('data-page'));
        if (!isNaN(page)) {
          renderRecebimentos(page, itemsPerPage);
        }
      });
    });
  };

  let idRecebimentoAtual = null;

  window.renderConfirmacaoRecebimento = (id) => {
    const filiais = Filial.listar();
    const filialAtual = filiais.find(filial => filial.codigo === filialLogada.codigo);
    const recebimento = filialAtual.recebimentos.find(r => r.id === id);

    idRecebimentoAtual = recebimento.id;
    const enderecoOrigem = recebimento.filialOrigem.endereco;

    conteudoRecebimento.innerHTML = `
    <div class="d-flex justify-content-between">
     <p><strong>Remetente:</strong> ${recebimento.filialOrigem.responsavel.nome}</p>
     <p><strong>Filial:</strong> ${recebimento.filialOrigem.codigo} - ${recebimento.filialOrigem.nome}</p>
    </div>
       <div class="d-flex justify-content-between">
      <p><strong>Data de Envio:</strong> ${recebimento.dataEnvio}</p>
      <p><strong>Previsão de Chegada:</strong> ${recebimento.dataChegada}</p>
    </div>
    <p><strong>Endereço:</strong> ${enderecoOrigem.rua}, ${enderecoOrigem.numero}${enderecoOrigem.complemento ? ', ' + enderecoOrigem.complemento : ''}, ${enderecoOrigem.bairro}, ${enderecoOrigem.cidade} - ${enderecoOrigem.estado}</p>
    <hr/>
    <p><strong>Item:</strong> ${recebimento.item}</p>
    <hr/> 
    <div class="d-flex justify-content-between">
       <p><strong>Filial Destino:</strong> ${recebimento.filialDestino.codigo} - ${recebimento.filialDestino.nome}</p>
       <p><strong>Responsavel:</strong> ${recebimento.filialDestino.responsavel.nome}</p>
    </div>
  
    `;
  };

  window.renderDetalhesRecebimento = (id) => {
    const filiais = Filial.listar();
    const filialAtual = filiais.find(filial => filial.codigo === filialLogada.codigo);
    const recebimento = filialAtual.recebimentos.find(r => r.id === id);

    idRecebimentoAtual = recebimento.id;
    const enderecoOrigem = recebimento.filialOrigem.endereco;

    conteudoDetalhesRecebimento.innerHTML = `
    <div class="d-flex justify-content-between">
     <p><strong>Remetente:</strong> ${recebimento.filialOrigem.responsavel.nome}</p>
     <p><strong>Filial:</strong> ${recebimento.filialOrigem.codigo} - ${recebimento.filialOrigem.nome}</p>
    </div>
       <div class="d-flex justify-content-between">
      <p><strong>Data de Envio:</strong> ${recebimento.dataEnvio}</p>
      <p><strong>Status:</strong> ${recebimento.status}</p>
    </div>
    <p><strong>Endereço:</strong> ${enderecoOrigem.rua}, ${enderecoOrigem.numero}${enderecoOrigem.complemento ? ', ' + enderecoOrigem.complemento : ''}, ${enderecoOrigem.bairro}, ${enderecoOrigem.cidade} - ${enderecoOrigem.estado}</p>
    <hr/>
    <p><strong>Item:</strong> ${recebimento.item}</p>
    <hr/> 
    <div class="d-flex justify-content-between">
       <p><strong>Filial Destino:</strong> ${recebimento.filialDestino.codigo} - ${recebimento.filialDestino.nome}</p>
       <p><strong>Responsavel:</strong> ${recebimento.filialDestino.responsavel.nome}</p>
    </div>
  
    `;
  };

  window.renderDetalhesEnvio = (id) => { 
    const filiais = Filial.listar();
    const filialAtual = filiais.find(filial => filial.codigo === filialLogada.codigo);
    const envio = filialAtual.envios.find(e => e.id === id);

    const enderecoDestino = envio.filialDestino.endereco;

    conteudoDetalhesEnvio.innerHTML = `
      <div class="d-flex justify-content-between">
       <p><strong>Remetente:</strong> ${envio.filialOrigem.responsavel.nome}</p>
       <p><strong>Filial:</strong> ${envio.filialOrigem.codigo} - ${envio.filialOrigem.nome}</p>
      </div>
      <div class="d-flex justify-content-between">
       <p><strong>Data de Envio:</strong> ${envio.dataEnvio}</p>
       <p><strong>Previsão de Chegada:</strong> ${envio.dataChegada}</p>
      </div>
      <hr/>
       <p><strong>Item:</strong> ${envio.item}</p>
       <hr/>
      <div class="d-flex justify-content-between">
       <p><strong>Filial Destino:</strong> ${envio.filialDestino.codigo} - ${envio.filialDestino.nome}</p>
       <p><strong>Responsavel:</strong> ${envio.filialDestino.responsavel.nome}</p>
      </div>
     
      <p><strong>Endereço:</strong> ${enderecoDestino.rua}, ${enderecoDestino.numero}${enderecoDestino.complemento ? ', ' + enderecoDestino.complemento : ''}, ${enderecoDestino.bairro}, ${enderecoDestino.cidade} - ${enderecoDestino.estado}</p>
    `;
  };

  formNovoEnvio.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const itemInput = document.getElementById('inputItem');
  const dataChegadaInput = document.getElementById('inputDataChegada'); 
  clearErrorTooltip(itemInput); 

  if (!itemInput.value) {
    showErrorTooltip(itemInput, 'Por favor, insira um item.');
    return; 
  }

  const dataChegada = new Date(dataChegadaInput.value + 'T00:00:00');
  const dataAtual = new Date().setHours(0, 0, 0, 0);
  
  if (dataChegada < dataAtual) {
    showErrorTooltip(dataChegadaInput, 'A data de chegada não pode ser inferior à data atual.');
    return;
  }

  DashboardController.adicionarEnvio();
  renderEnvios();
});

  btnEnvios.addEventListener('click', () => {
    renderEnvios();
  });

  btnRecebimentos.addEventListener('click', () => {
    renderRecebimentos();
  });

  btnLogout.addEventListener('click', () => {
    DashboardController.handleLogout();
  });

  btnReceber.addEventListener('click', () => {
  if (idRecebimentoAtual) { 
    DashboardController.receberEntrega(idRecebimentoAtual);
    renderRecebimentos(); 
  } else {
    console.error('ID do recebimento não está disponível.');
  }
  });
 
  filialDisplay.innerText = `${filialLogada.codigo} - ${filialLogada.nome}`;
  initializeTooltips();
  protegerRotaPrivada();
  populateSelectFilialDestino(); 
});