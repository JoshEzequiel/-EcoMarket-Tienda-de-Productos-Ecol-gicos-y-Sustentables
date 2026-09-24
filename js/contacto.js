/* ============================================
   CONTACTO.JS - Validacion del formulario
   ============================================ */

// Espera que cargue toda la pagina antes de usar el formulario
document.addEventListener('DOMContentLoaded', function () {

    // Tomamos el formulario de contacto
    var form = document.getElementById('contactForm');

    // Si no encuentra el formulario, no hace nada
    if (!form) return;

    // Tomamos el mensaje de exito y el boton enviar
    var successMsg = document.getElementById('contactSuccess');
    var btnEnviar = document.getElementById('btnEnviar');

    // Funcion para validar los correos permitidos
    function correoPermitido(correo) {
        return correo.endsWith('@duoc.cl') ||
               correo.endsWith('@profesor.duoc.cl') ||
               correo.endsWith('@gmail.com');
    }

    /* ============================================
       VALIDACION AL ENVIAR
       ============================================ */
    form.addEventListener('submit', function (e) {

        // Evita que la pagina se recargue
        e.preventDefault();

        // Variable para saber si el formulario esta correcto
        var valid = true;

        // ---- Nombre ----
        var nombre = document.getElementById('nombre');
        var nombreError = document.getElementById('nombreError');
        var nombreValor = nombre.value.trim();

        if (nombreValor === '') {
            nombreError.textContent = 'El nombre es obligatorio.';
            nombre.classList.add('error');
            valid = false;
        } else if (nombreValor.length > 100) {
            nombreError.textContent = 'El nombre no puede superar los 100 caracteres.';
            nombre.classList.add('error');
            valid = false;
        } else {
            nombreError.textContent = '';
            nombre.classList.remove('error');
        }

        // ---- Correo ----
        var email = document.getElementById('emailContacto');
        var emailError = document.getElementById('emailContactoError');
        var correo = email.value.trim();

        if (correo === '') {
            emailError.textContent = 'El correo es obligatorio.';
            email.classList.add('error');
            valid = false;
        } else if (correo.length > 100) {
            emailError.textContent = 'El correo no puede superar los 100 caracteres.';
            email.classList.add('error');
            valid = false;
        } else if (!correoPermitido(correo)) {
            emailError.textContent = 'Solo se permite correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            email.classList.add('error');
            valid = false;
        } else {
            emailError.textContent = '';
            email.classList.remove('error');
        }

        // ---- Telefono opcional ----
        var telefono = document.getElementById('telefono');
        var telefonoError = document.getElementById('telefonoError');
        var telefonoValor = telefono.value.trim();

        if (telefonoValor !== '' && telefonoValor.length < 8) {
            telefonoError.textContent = 'Ingresa un telefono valido.';
            telefono.classList.add('error');
            valid = false;
        } else {
            telefonoError.textContent = '';
            telefono.classList.remove('error');
        }

        // ---- Asunto ----
        var asunto = document.getElementById('asunto');
        var asuntoError = document.getElementById('asuntoError');

        if (asunto.value === '') {
            asuntoError.textContent = 'Selecciona un asunto.';
            asunto.classList.add('error');
            valid = false;
        } else {
            asuntoError.textContent = '';
            asunto.classList.remove('error');
        }

        // ---- Mensaje ----
        var mensaje = document.getElementById('mensaje');
        var mensajeError = document.getElementById('mensajeError');
        var mensajeValor = mensaje.value.trim();

        if (mensajeValor === '') {
            mensajeError.textContent = 'El mensaje es obligatorio.';
            mensaje.classList.add('error');
            valid = false;
        } else if (mensajeValor.length > 500) {
            mensajeError.textContent = 'El mensaje no puede superar los 500 caracteres.';
            mensaje.classList.add('error');
            valid = false;
        } else {
            mensajeError.textContent = '';
            mensaje.classList.remove('error');
        }

        // ---- Aceptar politica ----
        var acepto = document.getElementById('acepto');
        var aceptoError = document.getElementById('aceptoError');

        if (!acepto.checked) {
            aceptoError.textContent = 'Debes aceptar la politica de privacidad.';
            valid = false;
        } else {
            aceptoError.textContent = '';
        }

        /* ============================================
           SI TODO ESTA CORRECTO
           ============================================ */
        if (valid) {

            // Desactivamos el boton para evitar doble envio
            btnEnviar.disabled = true;
            btnEnviar.textContent = 'Enviando...';

            // Guardamos el mensaje como simulacion
            var mensajeObj = {
                nombre: nombreValor,
                email: correo,
                telefono: telefonoValor,
                asunto: asunto.value,
                mensaje: mensajeValor,
                fecha: new Date().toISOString()
            };

            // Recuperamos mensajes anteriores o creamos una lista vacia
            var mensajes = JSON.parse(localStorage.getItem('mensajesEcoMarket') || '[]');

            // Agregamos el nuevo mensaje
            mensajes.push(mensajeObj);

            // Guardamos en localStorage
            localStorage.setItem('mensajesEcoMarket', JSON.stringify(mensajes));

            // Mostramos mensaje de exito
            successMsg.style.display = 'block';

            // Limpiamos el formulario
            form.reset();

            // Volvemos a activar el boton
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Enviar mensaje';

            // Ocultamos el mensaje despues de unos segundos
            setTimeout(function () {
                successMsg.style.display = 'none';
            }, 4000);
        }
    });

    /* ============================================
       LIMPIAR ERRORES AL ESCRIBIR
       ============================================ */

    var campos = ['nombre', 'emailContacto', 'telefono', 'asunto', 'mensaje', 'acepto'];

    campos.forEach(function (id) {
        var campo = document.getElementById(id);

        if (!campo) return;

        campo.addEventListener('input', function () {
            var error = document.getElementById(id + 'Error');

            if (error) {
                error.textContent = '';
            }

            campo.classList.remove('error');
        });

        campo.addEventListener('change', function () {
            var error = document.getElementById(id + 'Error');

            if (error) {
                error.textContent = '';
            }

            campo.classList.remove('error');
        });
    });

});