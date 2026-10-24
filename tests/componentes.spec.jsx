import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Producto from '../src/components/Producto';
import Catalogo from '../src/components/Catalogo';
import ContactoForm from '../src/components/ContactoForm';

afterEach(() => cleanup());

const producto = {
  id: 1,
  nombre: 'Botella reutilizable',
  descripcion: 'Botella sin plastico',
  precio: 12990,
  oferta: false,
  descuento: 0,
  stock: 5,
  categoria: 'Hogar Sustentable',
  imagen: '/images/botella.svg',
};

// aqui se usa router porque la tarjeta tiene enlaces
function ver(componente) {
  return render(<MemoryRouter>{componente}</MemoryRouter>);
}

describe('Componentes React', () => {
  it('T05 muestra el nombre recibido por props', () => {
    ver(<Producto producto={producto} onAgregar={() => {}} />);
    expect(screen.getByText('Botella reutilizable')).toBeTruthy();
  });

  it('T06 revisa el clic de agregar usando un mock', () => {
    const agregar = jasmine.createSpy('agregarProducto');
    ver(<Producto producto={producto} onAgregar={agregar} />);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    expect(agregar).toHaveBeenCalledOnceWith(1);
  });

  it('T07 desactiva el boton cuando no hay stock', () => {
    ver(<Producto producto={{ ...producto, stock: 0 }} onAgregar={() => {}} />);
    expect(screen.getByRole('button', { name: 'Agotado' }).disabled).toBeTrue();
  });

  it('T08 cambia de pagina en el catalogo', () => {
    const lista = Array.from({ length: 8 }, (_, i) => ({
      ...producto,
      id: i + 1,
      nombre: 'Producto ' + (i + 1),
    }));
    ver(<Catalogo productos={lista} onAgregar={() => {}} />);
    expect(screen.queryByText('Producto 8')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('Producto 8')).toBeTruthy();
  });

  it('T09 muestra error si el formulario esta vacio', () => {
    const enviar = jasmine.createSpy('enviarContacto');
    ver(<ContactoForm onEnviar={enviar} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(enviar).not.toHaveBeenCalled();
  });

  it('T10 envia los datos correctos del formulario', () => {
    const enviar = jasmine.createSpy('enviarContacto');
    ver(<ContactoForm onEnviar={enviar} />);
    fireEvent.change(screen.getByLabelText('Tu nombre'), {
      target: { value: 'Joshua' },
    });
    fireEvent.change(screen.getByLabelText('Correo electronico'), {
      target: { value: 'correo@ejemplo.cl' },
    });
    fireEvent.change(screen.getByLabelText('Mensaje'), {
      target: { value: 'Hola EcoMarket' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(enviar).toHaveBeenCalled();
    expect(screen.getByRole('status')).toBeTruthy();
  });
});
