
import "./App.css";
import DivDere from './DivDere.jsx'
import DivIzq from './DivIzq.jsx'

function App() {


    return (
        <>
        <h1 className="text-xl font-bold mb-4">Cifrado basado en máquina de Post</h1>
        <h2>Victor Meneses Garcia</h2>
        <div className="princ">
            {/* Sección de Cifrar */}
            <div className="divI">
                <DivIzq />
            </div>
            {/* Sección de Descifrar */}
            <div className="divD">
                <DivDere />
            </div>
        </div>
        </>
    );
}

export default App;
