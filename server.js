// Importações principais
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configurando o servidor
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://omiramarmurilo:<DwKx4HciPn5RbNNE>@eventos.yj7wy.mongodb.net/?retryWrites=true&w=majority&appName=eventos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((error) => console.log('Erro ao conectar ao MongoDB:', error));

// Criar schema para eventos
const EventoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    convidados: Number,
    tipoEvento: String,
    dataEvento: Date,
    horaEvento: String,
    observacoes: String
});

// Criar modelo
const Evento = mongoose.model('Evento', EventoSchema);

// Rota de agendamento de evento (POST)
app.post('/api/evento', async (req, res) => {
    const { nome, email, telefone, convidados, tipoEvento, dataEvento, horaEvento, observacoes } = req.body;
    
    try {
        const novoEvento = new Evento({
            nome,
            email,
            telefone,
            convidados,
            tipoEvento,
            dataEvento,
            horaEvento,
            observacoes
        });
        
        await novoEvento.save();
        res.json({ success: true, message: 'Evento agendado com sucesso!' });
    } catch (error) {
        res.json({ success: false, message: 'Erro ao agendar evento.' });
    }
});

// Inicializar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


