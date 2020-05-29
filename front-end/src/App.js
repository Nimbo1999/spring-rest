import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    fetch('http://localhost:8080/curso-api/usuario/', {mode: 'cors', method: 'GET'})
    .then(resp => console.log(resp))
  }, []);

  return (
    <div className="App">
      <div className='header-space'>
        <h2>Usuários</h2>
      </div>
    </div>
  );
}

export default App;
