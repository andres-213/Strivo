document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('payment-form');
    const modal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('close-modal');
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const transactionIdElement = document.getElementById('transaction-id');
    
    // Formatear número de tarjeta automáticamente
    cardNumberInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        this.value = formattedValue;
    });
    
    // Formatear fecha de expiración automáticamente
    expiryInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            this.value = value.substring(0, 2) + '/' + value.substring(2);
        } else {
            this.value = value;
        }
    });
    
    // Generar ID de transacción aleatorio
    function generateTransactionId() {
        return 'TX-' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    }
    
    // Procesar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí normalmente enviarías los datos al servidor de procesamiento de pagos
        
        // Simular procesamiento (2 segundos)
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Procesando...';
        
        setTimeout(function() {
            // Mostrar la ventana modal con el ID de transacción generado
            transactionIdElement.textContent = 'ID: ' + generateTransactionId();
            modal.style.display = 'flex';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Realizar Pago';
        }, 2000);
    });
    
    // Cerrar la ventana modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        form.reset();
    });
    
    // También cerrar al hacer clic fuera de la ventana
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});