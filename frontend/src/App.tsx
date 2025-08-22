import React, { useState, useEffect } from 'react';
import './App.css';

// A mesma interface do backend, garantindo a tipagem dos dados recebidos
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

function App() {
  // Estado para armazenar a lista de produtos
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // Estado para gerenciar o estado de carregamento
  const [carregando, setCarregando] = useState<boolean>(true);

  // O hook useEffect é executado uma vez, quando o componente é montado
  useEffect(() => {
    // Função assíncrona para buscar os produtos no backend
    const buscarProdutos = async () => {
      try {
        // Faz a requisição GET para a API do Express
        const resposta = await fetch('http://localhost:3001/api/produtos');

        // Se a resposta não for OK, lança um erro
        if (!resposta.ok) {
          throw new Error('Erro ao buscar os produtos!');
        }

        // Converte a resposta para JSON, que será tipado como 'Produto[]'
        const dados: Produto[] = await resposta.json();

        // Atualiza o estado com os produtos recebidos
        setProdutos(dados);
      } catch (erro) {
        console.error("Houve um erro:", erro);
      } finally {
        // Garante que o estado de carregamento seja atualizado, mesmo em caso de erro
        setCarregando(false);
      }
    };

    // Chama a função para buscar os produtos
    buscarProdutos();
  }, []); // O array vazio indica que este efeito deve ser executado apenas uma vez

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Produtos</h1>
        {/* Renderização condicional com base no estado de carregamento */}
        {carregando ? (
          <p>Carregando produtos...</p>
        ) : (
          <ul>
            {/* Mapeia a lista de produtos para renderizar um item de lista para cada um */}
            {produtos.map(produto => (
              <li key={produto.id}>
                {produto.nome} - R${produto.preco.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;