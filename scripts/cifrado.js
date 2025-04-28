// Validar clave: longitud mínima y composición
function validarClave(clave) {
    const minLength = 10;
    const tieneNumero = /\d/;
    const tieneMayuscula = /[A-Z]/;
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (clave.length < minLength) {
        throw new Error("La clave debe tener al menos 10 caracteres.");
    }
    if (!tieneNumero.test(clave)) {
        throw new Error("La clave debe contener al menos un número.");
    }
    if (!tieneMayuscula.test(clave)) {
        throw new Error("La clave debe contener al menos una letra mayúscula.");
    }
    if (!tieneEspecial.test(clave)) {
        throw new Error("La clave debe contener al menos un carácter especial.");
    }
}

// Desplazar caracteres en base a su código ASCII
function desplazarASCII(char, desplazamiento) {
    const codigo = char.charCodeAt(0);
    const nuevoCodigo = (codigo + desplazamiento + 256) % 256;
    return String.fromCharCode(nuevoCodigo);
}

// Interpretar clave
function interpretarClave(clave) {
    return clave.split("")
        .map((char) => {
            if (!isNaN(char)) return { tipo: "D", valor: parseInt(char, 10) }; // Desplazamiento numérico
            if (char === "T") return { tipo: "T" }; // Transposición completa
            if (char === "D") return { tipo: "D", valor: 1 }; // Desplazamiento positivo
            if (char === "I") return { tipo: "I", valor: -1 }; // Desplazamiento negativo
            if (char === "C") return { tipo: "C" }; // Duplicar cada carácter
            if (char === "X") return { tipo: "X" }; // Intercala los caracteres
            if (char === "G") return { tipo: "G", valor: 3 }; // Agrupar en bloques de N
            return null; // Ignorar caracteres no válidos
        })
        .filter(instruccion => instruccion !== null);
}

// Aplicar las instrucciones al mensaje
function aplicarInstruccionesASCII(mensaje, instrucciones, descifrar = false) {
    let mensajeArray = mensaje.split("");

    instrucciones.forEach(({ tipo, valor }) => {
        const desplazamiento = descifrar ? -valor : valor;

        if (tipo === "T") {
            // Transposición completa: invertir el mensaje
            mensajeArray = mensajeArray.reverse();
        } else if (tipo === "D" || tipo === "I") {
            // Desplazar caracteres según la instrucción
            mensajeArray = mensajeArray.map((char) => desplazarASCII(char, desplazamiento));
        } else if (tipo === "C") {
            if (descifrar) {
                // Operación inversa: eliminar duplicados
                mensajeArray = mensajeArray.filter((_, index) => index % 2 === 0);
            } else {
                // Operación normal: duplicar caracteres
                mensajeArray = mensajeArray.flatMap(char => [char, char]);
            }
        } else if (tipo === "X") {
            if (descifrar) {
                // Operación inversa del intercalado
                const pares = [];
                const impares = [];
                mensajeArray.forEach((char, index) => {
                    (index % 2 === 0) ? pares.push(char) : impares.push(char);
                });
                mensajeArray = [...pares, ...impares];
            } else {
                // Operación normal de intercalado
                const mitad = Math.ceil(mensajeArray.length / 2);
                const primeraMitad = mensajeArray.slice(0, mitad);
                const segundaMitad = mensajeArray.slice(mitad);
                
                mensajeArray = [];
                for (let i = 0; i < mitad; i++) {
                    if (primeraMitad[i]) mensajeArray.push(primeraMitad[i]);
                    if (segundaMitad[i]) mensajeArray.push(segundaMitad[i]);
                }
            }
        } else if (tipo === "G") {
            const tamanoGrupo = valor || 3;
            let nuevoArray = [];
            for (let i = 0; i < mensajeArray.length; i += tamanoGrupo) {
                const grupo = mensajeArray.slice(i, i + tamanoGrupo);
                nuevoArray.push(...grupo.reverse());
            }
            mensajeArray = nuevoArray;
        }
    });

    return mensajeArray.join("");
}

// Cifrar mensaje
function cifrarMensajeConClave(mensaje, clave) {
    validarClave(clave); // Validar la clave
    const instrucciones = interpretarClave(clave); // Interpretar clave
    return aplicarInstruccionesASCII(mensaje, instrucciones); // Aplicar instrucciones
}

// Descifrar mensaje
function descifrarMensajeConClave(mensajeCifrado, clave) {
    validarClave(clave); // Validar la clave
    const instrucciones = interpretarClave(clave).reverse(); // Invertir instrucciones para descifrado
    return aplicarInstruccionesASCII(mensajeCifrado, instrucciones, true); // Aplicar instrucciones
}

// Exportar funciones
export function cifrado2(mensaje, clave) {
    return cifrarMensajeConClave(mensaje, clave);
}

export function descifrado2(mensajeCifrado, clave) {
    return descifrarMensajeConClave(mensajeCifrado, clave);
}
