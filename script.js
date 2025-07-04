const form = document.getElementById('orderForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const pedidos = [];
    form.querySelectorAll('input[name="pedido"]:checked').forEach(item => {
        pedidos.push(item.value);
    });

    if (pedidos.length === 0) {
        msg.textContent = "Por favor selecciona al menos una hamburguesa.";
        msg.className = 'text-danger';
        return;
    }

    const data = {
        pedidos: pedidos.join(', '),
        fecha: new Date().toISOString()
    };

    // Reemplaza con tu URL del Webhook de Google Apps Script
    const url = 'https://script.google.com/macros/s/AKfycbw5JAebl5gbRr28yuXmwa41fpB25FsE-saLxcneL30XScjGerzgwM715VbTlidOLqj6xg/exec';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            msg.textContent = "¡Pedido enviado exitosamente!";
            msg.className = 'text-success';
            form.reset();
        } else {
            msg.textContent = "Error al enviar el pedido.";
            msg.className = 'text-danger';
        }
    } catch (error) {
        msg.textContent = "Error de conexión.";
        msg.className = 'text-danger';
    }
});
