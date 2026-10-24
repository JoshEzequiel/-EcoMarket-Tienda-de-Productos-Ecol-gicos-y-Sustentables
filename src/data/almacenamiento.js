// localStorage guarda texto, por eso se usa JSON
export function leerDato(clave, inicial) {
  try {
    const dato = localStorage.getItem(clave);
    return dato === null ? inicial : JSON.parse(dato);
  } catch {
    return inicial;
  }
}
export function guardarDato(clave, dato) {
  try {
    localStorage.setItem(clave, JSON.stringify(dato));
  } catch {
  }
}
