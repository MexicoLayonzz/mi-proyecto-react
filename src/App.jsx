import React, { useState } from "react";
import './App.css';
import Button from "./components/Button";
import Fruit from "./Fruit";
import RegistroForm from "./RegistroForm";

function App() {
  const [fruits] = useState(["Manzana", "Banana", "Naranja", "Fresa"]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>¡Hola, React!</h1>
        <p>Bienvenido a tu primer proyecto React <strong>Fernando Aguilar</strong></p>

        <RegistroForm />
        
      </header>
    </div>
  );
}

export default App;