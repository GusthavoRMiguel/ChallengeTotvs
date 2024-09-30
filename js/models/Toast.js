class Toast {
  constructor() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'position-fixed bottom-0 end-0 p-3';
      container.style.zIndex = '11';
      document.body.appendChild(container);
    }
  }

 
  showToast(message, type = 'success') {
    const toastId = `toast-${Date.now()}`;  
    
    const toastElement = document.createElement('div');
    toastElement.id = toastId;
    toastElement.className = `toast hide ${type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`;
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');

    
    toastElement.innerHTML = `
      <div class="toast-header">
        <strong class="me-auto">Notificação</strong>
        <small>${new Date().toLocaleTimeString()}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;

    
    const container = document.getElementById('toast-container');
    container.appendChild(toastElement);

  
    const toastBootstrap = new bootstrap.Toast(toastElement);
    toastBootstrap.show();

    
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }
}

export default Toast;
