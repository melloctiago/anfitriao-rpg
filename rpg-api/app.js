require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io"); 
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log('Objeto de rotas de autenticação carregado:', authRoutes);

app.use('/api', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
  res.send('API do Anfitrião');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", 
    methods: ["GET", "POST"]
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(' Um usuário se conectou:', socket.id);

  socket.on('disconnect', () => {
    console.log(' Um usuário se desconectou:', socket.id);
  });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});