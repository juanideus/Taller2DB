

export async function validateRut(rut) {
    // Eliminar puntos y guión
    const cleanRut = rut.replace(/\./g, "").replace(/-/g, "");
    // Validar formato básico
    if (!/^\d{7,8}[0-9kK]$/.test(cleanRut)) {
        return false;
    }
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toLowerCase();
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const expectedDv = 11 - (sum % 11);
    const expectedDvStr = expectedDv === 11 ? "0" : expectedDv === 10 ? "k" : expectedDv.toString();
    return dv === expectedDvStr;

}