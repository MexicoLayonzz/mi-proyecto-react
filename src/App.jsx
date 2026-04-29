import React, { useState } from "react";
import './App.css';
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>¡Hola, React!</h1>
        <p>Bienvenido a tu primer proyecto React <strong>Fernando Aguilar</strong></p>
        <p>Has hecho clic {count} {count === 1 ? "vez" : "veces"}</p>
        <Button label="¡Hazme clic!" onClick={() => setCount(count + 1)} />
      </header>
    </div>
  );
}

export default App;