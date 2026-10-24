import { resumenCarrito, validarRun } from '../src/utils/tienda';
import { crearRegistro, eliminarRegistro } from '../src/data/operaciones';

// aqui se prueban reglas de la tienda
const producto = { id: 1, precio: 10000, oferta: false, descuento: 0 };

describe('Reglas de EcoMarket', () => {
  it('T01 aplica el descuento ECO10', () => {
    const resultado = resumenCarrito([{ id: 1, cantidad: 2 }], [producto], 'ECO10');
    expect(resultado.descuento).toBe(2000);
    expect(resultado.total).toBe(18000);
  });

  it('T02 comprueba el RUN chileno', () => {
    expect(validarRun('12.345.678-5')).toBeTrue();
    expect(validarRun('12.345.678-9')).toBeFalse();
  });

  it('T03 crea un registro nuevo', () => {
    const datos = crearRegistro([{ id: 1, nombre: 'Uno' }], { nombre: 'Dos' });
    expect(datos.length).toBe(2);
    expect(datos[1].nombre).toBe('Dos');
  });

  it('T04 elimina un registro', () => {
    const datos = eliminarRegistro([{ id: 1 }, { id: 2 }], 1);
    expect(datos.length).toBe(1);
    expect(datos[0].id).toBe(2);
  });
});
