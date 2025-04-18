// 1. Crear la tabla personalizada con acentos y caracteres adicionales
const tabla = [
    " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", 
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", 
    "@", "A", "Á", "B", "C", "D", "E", "É", "F", "G", "H", "I", "Í", "J", "K", "L", "M", "N", "Ñ", 
    "O", "Ó", "P", "Q", "R", "S", "T", "U", "Ú", "Ü", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", 
    "_", "`", "a", "á", "b", "c", "d", "e", "é", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", 
    "ñ", "o", "ó", "p", "q", "r", "s", "t", "u", "ú", "ü", "v", "w", "x", "y", "z", "{", "|", "}", "~",
    "·", "=", "'", "´", "+", ";", ">", "<", "¬", "}", "~", "{", "*", "/", "\\", "¿", "?", "!","¡","\"","%","°","\n"
];
// Calcula el tamaño de la tabla para facilitar cálculos de desplazamiento
const tamañoTabla = tabla.length;

// 2. Función para interpretar la clave
function interpretarClave(clave) {
    return clave.split("") // Divide la clave en caracteres individuales
        .map((char) => {
            if (!isNaN(char)) return { tipo: "D", valor: parseInt(char, 10) }; // Si es un número, es un desplazamiento positivo
            if (char === "T") return { tipo: "T" }; // Si es 'T', es una transposición completa
            if (char === "D") return { tipo: "D", valor: 1 }; // Si es 'D', desplazamiento positivo genérico
            if (char === "I") return { tipo: "I", valor: -1 }; // Si es 'I', desplazamiento negativo genérico
            return null; // Si no es válido, ignora el carácter
        })
        .filter(instruccion => instruccion !== null); // Elimina valores nulos del resultado
}

// 3. Función para transponer el mensaje completo
function transponerMensajeCompleto(mensaje) {
    // Invierte el orden de los caracteres en el mensaje
    return mensaje.split("").reverse().join("");
}

// 4. Función para validar caracteres del mensaje y clave
function validarCaracteres(cadena) {
    // Verifica si todos los caracteres de la cadena están en la tabla
    for (const char of cadena) {
        if (!tabla.includes(char)) {
            // Si no está permitido, lanza un error
            throw new Error(`El carácter "${char}" no está permitido.`);
        }
    }
}

// 5. Función para cifrar un mensaje con una clave
function cifrarMensajeConClave(mensaje, clave) {
    validarCaracteres(mensaje); // Verifica que el mensaje use caracteres válidos
    validarCaracteres(clave); // Verifica que la clave use caracteres válidos

    const instrucciones = interpretarClave(clave); // Convierte la clave en instrucciones
    let mensajeArray = mensaje.split(""); // Divide el mensaje en un array de caracteres

    instrucciones.forEach((instruccion) => {
        const tipo = instruccion.tipo; // Obtiene el tipo de instrucción
        const valor = instruccion.valor; // Obtiene el valor de desplazamiento, si aplica

        if (tipo === "T") {
            // Si la instrucción es de tipo "T", invierte el mensaje
            mensajeArray = transponerMensajeCompleto(mensajeArray.join("")).split("");
        } else if (tipo === "D" || tipo === "I") {
            // Si es desplazamiento, desplaza cada carácter en la tabla
            mensajeArray = mensajeArray.map((char) => {
                const actualIndex = tabla.indexOf(char); // Encuentra el índice del carácter en la tabla
                if (actualIndex === -1) return char; // Si no está en la tabla, lo deja igual
                const nuevoIndice = (actualIndex + valor + tamañoTabla) % tamañoTabla; // Calcula el nuevo índice de manera circular
                return tabla[nuevoIndice]; // Obtiene el carácter en el nuevo índice
            });
        }
    });

    return mensajeArray.join(""); // Une los caracteres en un mensaje cifrado
}

// 6. Función para descifrar un mensaje cifrado con una clave
function descifrarMensajeConClave(mensajeCifrado, clave) {
    validarCaracteres(mensajeCifrado); // Verifica que el mensaje cifrado use caracteres válidos
    validarCaracteres(clave); // Verifica que la clave use caracteres válidos

    const instrucciones = interpretarClave(clave).reverse(); // Convierte la clave en instrucciones y las invierte
    let mensajeArray = mensajeCifrado.split(""); // Divide el mensaje cifrado en un array de caracteres

    instrucciones.forEach((instruccion) => {
        const tipo = instruccion.tipo; // Obtiene el tipo de instrucción
        const valor = instruccion.valor; // Obtiene el valor de desplazamiento, si aplica

        if (tipo === "T") {
            // Si la instrucción es de tipo "T", invierte el mensaje
            mensajeArray = transponerMensajeCompleto(mensajeArray.join("")).split("");
        } else if (tipo === "D" || tipo === "I") {
            // Si es desplazamiento, ajusta cada carácter en la tabla en dirección opuesta
            mensajeArray = mensajeArray.map((char) => {
                const actualIndex = tabla.indexOf(char); // Encuentra el índice del carácter en la tabla
                if (actualIndex === -1) return char; // Si no está en la tabla, lo deja igual
                const nuevoIndice = (actualIndex - valor + tamañoTabla) % tamañoTabla; // Calcula el índice en dirección inversa
                return tabla[nuevoIndice]; // Obtiene el carácter en el nuevo índice
            });
        }
    });

    return mensajeArray.join(""); // Une los caracteres en el mensaje descifrado
}

// Exporta las funciones para usarlas en otros archivos
export function cifrado2(mensaje, clave) {
    return cifrarMensajeConClave(mensaje, clave); // Cifra el mensaje
}

export function descifrado2(mensajeCifrado, clave) {
    return descifrarMensajeConClave(mensajeCifrado, clave); // Descifra el mensaje
}
