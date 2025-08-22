// Importa o módulo 'express'
import express, { Request, Response } from 'express';

// Define a interface para o tipo de dado 'Produto'
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

// Cria a aplicação Express
const app = express();
const PORT = 3001;

// Dados de exemplo (simulando um banco de dados)
const produtos: Produto[] = [
  { id: 1, nome: "Notebook", preco: 5000 },
  { id: 2, nome: "Mouse Gamer", preco: 250 },
  { id: 3, nome: "Teclado Mecânico", preco: 400 }
];

// Middleware para permitir requisições de outras origens (CORS)
// Isso é crucial para que o frontend (em outra porta) possa se comunicar
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Permite apenas a origem do nosso React
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define a rota para a API de produtos
// Quando o React fizer uma requisição GET para '/api/produtos', esta função será executada
app.get('/api/produtos', (req: Request, res: Response) => {
  console.log("Requisição recebida para /api/produtos");
  // Envia os dados de produtos em formato JSON como resposta
  res.json(produtos);
});

// Inicia o servidor e o faz "escutar" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});