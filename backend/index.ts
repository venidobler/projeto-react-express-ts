// backend/index.ts

// Importa os módulos necessários
import express, { Request, Response } from 'express';
import cors from 'cors'; // Importa o pacote cors

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
let produtos: Produto[] = [ // Use `let` para permitir a modificação
  { id: 1, nome: "Notebook", preco: 5000 },
  { id: 2, nome: "Mouse Gamer", preco: 250 },
  { id: 3, nome: "Teclado Mecânico", preco: 400 }
];

// Middleware
app.use(express.json()); // Permite que o Express entenda requisições com corpo JSON
app.use(cors()); // Habilita o CORS para todas as origens (simples e seguro para desenvolvimento)

// Rota GET para listar os produtos
app.get('/api/produtos', (req: Request, res: Response) => {
  console.log("Requisição GET recebida para /api/produtos");
  res.json(produtos);
});

// NOVA ROTA POST para adicionar um novo produto
app.post('/api/produtos', (req: Request, res: Response) => {
  console.log("Requisição POST recebida para /api/produtos");
  const novoProduto: Produto = req.body; // Pega o corpo da requisição

  // Validação básica
  if (!novoProduto.nome || !novoProduto.preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
  }

  // Simula a criação de um ID
  const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

  const produtoComId = { ...novoProduto, id: novoId };
  produtos.push(produtoComId); // Adiciona o novo produto à lista

  console.log("Novo produto adicionado:", produtoComId);
  // Retorna o produto recém-criado com o status de '201 Created'
  res.status(201).json(produtoComId);
});

// Inicia o servidor e o faz "escutar" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});