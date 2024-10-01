import LoginController from '../controllers/LoginController.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  
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
 
 
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const codigoFilial = document.getElementById('codigoFilial');
    const codigoUsuario = document.getElementById('codigoUsuario');

    
    clearErrorTooltip(codigoFilial);
    clearErrorTooltip(codigoUsuario);

   
    const loginSuccessful = LoginController.handleLogin(codigoFilial.value, codigoUsuario.value);

    if (!loginSuccessful) {
     
      showErrorTooltip(codigoFilial, 'Por favor, insira um código de Filial válido.');
      showErrorTooltip(codigoUsuario, 'Por favor, insira um código de usuário válido.');
    }
  });


  initializeTooltips();
});
