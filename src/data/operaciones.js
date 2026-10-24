// funciones sencillas para crear, buscar, editar y eliminar registros
export function crearRegistro(lista, datos) {
  const id = Math.max(0, ...lista.map((item) => Number(item.id))) + 1;
  return [...lista, { ...datos, id }];
}

export function buscarRegistro(lista, id) {
  return lista.find((item) => item.id === Number(id));
}

export function editarRegistro(lista, id, datos) {
  return lista.map((item) =>
    item.id === Number(id) ? { ...item, ...datos, id: item.id } : item,
  );
}

export function eliminarRegistro(lista, id) {
  return lista.filter((item) => item.id !== Number(id));
}
