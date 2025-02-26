const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname)));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar el envío del formulario
app.post('/enviar-formulario', async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Token de tu bot y ID de chat
    const botToken = '7688090282:AAELVAUNZGa9Qvnp-bVpmhKNv7PmWh1DFmI'; // Reemplaza con tu token
    const chatId = '5423242286'; // Reemplaza con tu ID de chat

    // Mensaje que se enviará a Telegram
    const textoMensaje = `
    Nombre: ${nombre}
    Correo Electrónico: ${email}
    Mensaje: ${mensaje}
    `;

    try {
        // Enviar mensaje a Telegram
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: textoMensaje,
        });

        // Respuesta al cliente
        res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
    } catch (error) {
        console.error('Error al enviar el mensaje a Telegram:', error);
        res.status(500).json({ success: false, message: 'Error al enviar el mensaje.' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});