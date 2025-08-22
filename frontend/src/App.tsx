// frontend/src/App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [novoProdutoNome, setNovoProdutoNome] = useState('');
  const [novoProdutoPreco, setNovoProdutoPreco] = useState('');

  // Função para buscar os produtos no backend
  const buscarProdutos = async () => {
    try {
      const resposta = await fetch('http://localhost:3001/api/produtos');
      if (!resposta.ok) {
        throw new Error('Erro ao buscar os produtos!');
      }
      const dados: Produto[] = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      console.error("Houve um erro:", erro);
    } finally {
      setCarregando(false);
    }
  };

  // Efeito para buscar os produtos quando o componente é montado
  useEffect(() => {
    buscarProdutos();
  }, []);

  // Nova função para adicionar um produto via API
  const handleAdicionarProduto = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita o recarregamento da página

    // Validação básica do formulário
    if (!novoProdutoNome || !novoProdutoPreco) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const produtoParaEnviar = {
        nome: novoProdutoNome,
        preco: parseFloat(novoProdutoPreco), // Converte a string para número
      };

      // Requisição POST para o backend
      const resposta = await fetch('http://localhost:3001/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoParaEnviar), // Converte o objeto para JSON string
      });

      if (!resposta.ok) {
        throw new Error('Erro ao adicionar o produto!');
      }

      const produtoAdicionado: Produto = await resposta.json();
      
      // Atualiza o estado da lista de produtos com o novo produto
      setProdutos([...produtos, produtoAdicionado]);
      
      // Limpa os campos do formulário
      setNovoProdutoNome('');
      setNovoProdutoPreco('');

    } catch (erro) {
      console.error("Houve um erro:", erro);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Produtos</h1>
        {carregando ? (
          <p>Carregando produtos...</p>
        ) : (
          <ul>
            {produtos.map(produto => (
              <li key={produto.id}>
                {produto.nome} - R${produto.preco.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        
        <hr style={{ width: '100%' }} />

        <h2>Adicionar Novo Produto</h2>
        <form onSubmit={handleAdicionarProduto}>
          <input 
            type="text"
            placeholder="Nome do produto"
            value={novoProdutoNome}
            onChange={(e) => setNovoProdutoNome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            value={novoProdutoPreco}
            onChange={(e) => setNovoProdutoPreco(e.target.value)}
          />
          <button type="submit">Adicionar</button>
        </form>
      </header>
    </div>
  );
}

export default App;