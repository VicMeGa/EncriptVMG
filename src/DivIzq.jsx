import { useState, useEffect} from "react";
import { cifrado2} from "../scripts/cifrado.js";
import { validarFort } from "../scripts/Fortaleza.js";

function DivIzq() {
    const [mensajeCifrar, setMensajeCifrar] = useState("");
    const [claveCifrar, setClaveCifrar] = useState("");
    const [resultadoCifrado, setResultadoCifrado] = useState("");
    const [validacion, setValidacion] = useState({});

    const handleCifrar = () => {
        try {
            const cifrado = cifrado2(mensajeCifrar, claveCifrar);
            setResultadoCifrado(cifrado);
        } catch (error) {
            alert("Error al cifrar: " + error.message);
        }
    };
    useEffect(() => {
        setValidacion(validarFort(claveCifrar));
      }, [claveCifrar]);

    return(
        <>
        <div>
                <h2>Cifrar mensaje</h2>
                <textarea
                    placeholder="Ingresa el mensaje a cifrar"
                    value={mensajeCifrar}
                    onChange={(e) => setMensajeCifrar(e.target.value)}
                />
                <input className="campostexto"
                    type="password"
                    placeholder="Ingresa la clave de cifrado"
                    value={claveCifrar}
                    onChange={(e) => setClaveCifrar(e.target.value)}
                />
                {validacion.errores && (
                    <ul className="errores">
                    {validacion.errores.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))}
                    </ul>
                )}
                {claveCifrar && !validacion.errores && (
                    <div className={`fortaleza-${validacion.fortaleza}`}>
                    Fortaleza: {validacion.fortaleza}
                    </div>
                )}

                <button className="des" onClick={handleCifrar} disabled={!validacion.valida}>
                    Cifrar
                </button>
                <div className="result-container">
                    <h3 >Resultado:</h3>
                    <p className="result-textarea">{resultadoCifrado}</p>
                </div>
            </div>
        </>
    );
}

export default DivIzq;