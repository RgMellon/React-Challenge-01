import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [listRepositories, setListRepositories] = useState([]);

  useEffect(() => {
    async function handleGetRepositories() {
      const response = await api.get('/repositories');

      const { data } = response;

      setListRepositories(data);
    }

    handleGetRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        url: 'https://github.com/josepholiveira',
        title: `Desafio ReactJS ${Date.now()}`,
        techs: ['React', 'Node.js']
      });

      const { data } = response;

      setListRepositories([...listRepositories, data]);
    } catch (e) {
      alert('Ops, ocorreu um erro ao adicionar um repo');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);

      if (response.status === 204) {
        const listRepos = listRepositories.filter(item => item.id !== id);

        setListRepositories(listRepos);
      }
    } catch (e) {
      alert('Ops, ocorreu um erro ao deletar');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {listRepositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
