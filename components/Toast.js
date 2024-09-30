class Toast {
    constructor() {
        this.toastContainer = document.createElement('div');
        this.toastContainer.className = 'toast-container';
        document.body.appendChild(this.toastContainer); 
    }

    show(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-header">
                <strong class="mr-auto">${type === 'error' ? 'Erro' : 'Sucesso'}</strong>
                <button type="button" class="ml-2 mb-1 close" onclick="this.parentElement.parentElement.remove();">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;

        this.toastContainer.appendChild(toast); 

        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, 3000);
    }
}

export default Toast; 
