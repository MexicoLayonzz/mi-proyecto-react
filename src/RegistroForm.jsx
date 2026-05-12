import { useState } from "react";
import "./RegistroForm.css";

const initialFormData = {
  nombres: "",
  apellidos: "",
  correo: "",
  cuenta: "",
  promedio: "",
  pais: "",
};

function RegistroForm() {
  const [formData, setFormData] = useState(initialFormData);

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = "El nombre es obligatorio";
    }

    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = "Los apellidos son obligatorios";
    }

    if (!formData.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.correo)
    ) {
      nuevosErrores.correo = "Correo inválido";
    }

    if (!formData.cuenta.trim()) {
      nuevosErrores.cuenta = "El número de cuenta es obligatorio";
    }

    if (!formData.promedio.trim()) {
      nuevosErrores.promedio = "El promedio es obligatorio";
    }

    if (!formData.pais.trim()) {
      nuevosErrores.pais = "El país es obligatorio";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const limpiarCampos = () => {
    setFormData(initialFormData);
  };

  const limpiarFormulario = () => {
    limpiarCampos();
    setErrores({});
    setMensaje("");
  };

  const guardarFormulario = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      setMensaje("Enviando formulario...");

      const formDataToSend = new FormData();
      const payload = {
        name: formData.nombres,
        lastName: formData.apellidos,
        email: formData.correo,
        account: formData.cuenta,
        avg: formData.promedio,
        country: formData.pais,
      };

      formDataToSend.append("name", payload.name);
      formDataToSend.append("lastName", payload.lastName);
      formDataToSend.append("email", payload.email);
      formDataToSend.append("account", payload.account);
      formDataToSend.append("avg", payload.avg);
      formDataToSend.append("country", payload.country);

      const response = await fetch("https://masksoft.com.mx/register", {
        method: "POST",
        body: formDataToSend,
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok) {
        setMensaje("Datos guardados correctamente.");
        limpiarCampos();
        setErrores({});
      } else {
        setMensaje(data?.message || "Error al guardar");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión");
    }
  };

  return (
    <div className="container">
      <h2>Formulario de Registro</h2>

      <form className="registro-form" onSubmit={guardarFormulario}>
        <div className="form-group">
          <label>Nombre(s)</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
          />
          {errores.nombres && <p className="error-text">{errores.nombres}</p>}
        </div>

        <div className="form-group">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
          />
          {errores.apellidos && <p className="error-text">{errores.apellidos}</p>}
        </div>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errores.correo && <p className="error-text">{errores.correo}</p>}
        </div>

        <div className="form-group">
          <label>Número de cuenta</label>
          <input
            type="text"
            name="cuenta"
            value={formData.cuenta}
            onChange={handleChange}
          />
          {errores.cuenta && <p className="error-text">{errores.cuenta}</p>}
        </div>

        <div className="form-group">
          <label>Promedio</label>
          <input
            type="number"
            step="0.01"
            name="promedio"
            value={formData.promedio}
            onChange={handleChange}
          />
          {errores.promedio && <p className="error-text">{errores.promedio}</p>}
        </div>

        <div className="form-group">
          <label>País</label>
          <input
            type="text"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
          />
          {errores.pais && <p className="error-text">{errores.pais}</p>}
        </div>

        <div className="actions">
          <button className="secondary-button" type="button" onClick={limpiarFormulario}>
            Limpiar
          </button>

          <button className="primary-button" type="submit">
            Guardar
          </button>
        </div>
      </form>

      {mensaje && <p className="status-message">{mensaje}</p>}
    </div>
  );
}

export default RegistroForm;