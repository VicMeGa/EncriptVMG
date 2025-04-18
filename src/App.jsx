import { useState } from "react";
import { cifrado2, descifrado2 } from "../scripts/cifrado.js";
import "./App.css";

function App() {
    const [mensajeCifrar, setMensajeCifrar] = useState("");
    const [claveCifrar, setClaveCifrar] = useState("");
    const [resultadoCifrado, setResultadoCifrado] = useState("");

    const [mensajeDescifrar, setMensajeDescifrar] = useState("");
    const [claveDescifrar, setClaveDescifrar] = useState("");
    const [resultadoDescifrado, setResultadoDescifrado] = useState("");

    const handleCifrar = () => {
        try {
            const cifrado = cifrado2(mensajeCifrar, claveCifrar);
            setResultadoCifrado(cifrado);
        } catch (error) {
            alert("Error al cifrar: " + error.message);
        }
    };

    const handleDescifrar = () => {
        try {
            const descifrado = descifrado2(mensajeDescifrar, claveDescifrar);
            setResultadoDescifrado(descifrado);
        } catch (error) {
            alert("Error al descifrar: " + error.message);
        }
    };

    return (
        <div className="princ">
            <h1 className="text-xl font-bold mb-4">Cifrador basado en máquina de Post</h1>
            <h2>Victor Meneses Garcia</h2>
            {/* Sección de Cifrar */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-2">Cifrar mensaje</h2>
                <textarea
                    className="border p-2 w-full mb-2"
                    placeholder="Ingresa el mensaje a cifrar"
                    value={mensajeCifrar}
                    onChange={(e) => setMensajeCifrar(e.target.value)}
                />
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Ingresa la clave"
                    value={claveCifrar}
                    onChange={(e) => setClaveCifrar(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCifrar}>
                    Cifrar
                </button>
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Resultado:</h3>
                    <p className="result">{resultadoCifrado}</p>
                </div>
            </div>

            {/* Sección de Descifrar */}
            <div>
                <h2 className="text-lg font-bold mb-2">Descifrar mensaje</h2>
                <textarea
                    className="border p-2 w-full mb-2"
                    placeholder="Ingresa el mensaje cifrado"
                    value={mensajeDescifrar}
                    onChange={(e) => setMensajeDescifrar(e.target.value)}
                />
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Ingresa la clave"
                    value={claveDescifrar}
                    onChange={(e) => setClaveDescifrar(e.target.value)}
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleDescifrar}>
                    Descifrar
                </button>
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Resultado:</h3>
                    <p className="result">{resultadoDescifrado}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
