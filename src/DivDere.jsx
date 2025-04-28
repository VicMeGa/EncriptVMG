import { useState } from "react";
import {descifrado2 } from "../scripts/cifrado.js";

function DivDere(){
    const [mensajeDescifrar, setMensajeDescifrar] = useState("");
    const [claveDescifrar, setClaveDescifrar] = useState("");
    const [resultadoDescifrado, setResultadoDescifrado] = useState("");

    function handleDescifrar() {
        try {
            const descifrado = descifrado2(mensajeDescifrar, claveDescifrar);
            setResultadoDescifrado(descifrado);
        } catch (error) {
            alert("Error al descifrar: " + error.message);
        }
    }
return (
    <>
     <div>
                <h2>Descifrar mensaje</h2>
                <textarea
                    placeholder="Ingresa el mensaje cifrado"
                    value={mensajeDescifrar}
                    onChange={(e) => setMensajeDescifrar(e.target.value)}
                />
                <input className="campostexto"
                    type="password"
                    placeholder="Ingresa la clave de cifrado"
                    value={claveDescifrar}
                    onChange={(e) => setClaveDescifrar(e.target.value)}
                />
                <br />
                <button className="des" onClick={handleDescifrar}>
                    Descifrar
                </button>
                <div className="result-container">
                    <h3 >Resultado:</h3>
                    <p className="result-textarea">{resultadoDescifrado}</p>
                </div>
            </div>
    </>
);

}

export default DivDere;