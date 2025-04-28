function validarFortalezaClave(clave) {
    // Requisitos mínimos
    const requisitos = [
        { cond: clave.length >= 10, error: "Mínimo 10 caracteres" },
        { cond: /[A-Z]/.test(clave), error: "1 mayúscula mínimo" },
        { cond: /[a-z]/.test(clave), error: "1 minúscula mínimo" },
        { cond: /[0-9]/.test(clave), error: "1 número mínimo" },
        { cond: /[!@#$%^&*(),.?":{}|<>]/.test(clave), error: "1 carácter especial mínimo" },
        { cond: /[TCDIXG]/.test(clave), error: "Debe incluir al menos una letra de instrucción (T,C,D,I,X,G)" },
        { cond: !/(.)\1\1/.test(clave), error: "No más de 2 caracteres repetidos seguidos" },
        { cond: !/(123|abc|qwert|asdf|password)/i.test(clave), error: "Secuencias comunes no permitidas" }
    ];

    // Verificar todos los requisitos
    const errores = requisitos.filter(req => !req.cond).map(req => req.error);
    
    return {
        valida: errores.length === 0,
        errores: errores.length > 0 ? errores : undefined,
        fortaleza: calcularNivelFortaleza(clave) // "baja", "media", "alta"
    };
}

function calcularNivelFortaleza(clave) {
    let puntuacion = 0;
    if (clave.length >= 12) puntuacion += 25;
    if (/[A-Z]/.test(clave)) puntuacion += 15;
    if (/[a-z]/.test(clave)) puntuacion += 15;
    if (/[0-9]/.test(clave)) puntuacion += 15;
    if (/[^A-Za-z0-9]/.test(clave)) puntuacion += 20;
    if (clave.length > 15) puntuacion += 10;
    
    return puntuacion >= 80 ? "alta" : puntuacion >= 60 ? "media" : "baja";
}

export function validarFort(clave){
    return validarFortalezaClave(clave);
}