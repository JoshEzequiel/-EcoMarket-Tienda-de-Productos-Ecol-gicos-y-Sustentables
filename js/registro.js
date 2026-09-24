/* ============================================
   REGISTRO.JS - Validacion de creacion de cuenta
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    var form = document.getElementById('registroForm');

    // Si no encuentra el formulario, no hace nada
    if (!form) return;

    var btnRegistro = document.getElementById('btnRegistro');

    /* ============================================
       ELEMENTOS DEL FORMULARIO
       ============================================ */

    var run = document.getElementById('run');
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var email = document.getElementById('email');
    var fechaNacimiento = document.getElementById('fechaNacimiento');
    var telefono = document.getElementById('telefono');
    var region = document.getElementById('region');
    var comuna = document.getElementById('comuna');
    var direccion = document.getElementById('direccion');
    var password = document.getElementById('password');
    var passwordConfirm = document.getElementById('passwordConfirm');
    var terminos = document.getElementById('terminos');

    var runError = document.getElementById('runError');
    var nombreError = document.getElementById('nombreError');
    var apellidoError = document.getElementById('apellidoError');
    var emailError = document.getElementById('emailError');
    var fechaNacimientoError = document.getElementById('fechaNacimientoError');
    var telefonoError = document.getElementById('telefonoError');
    var regionError = document.getElementById('regionError');
    var comunaError = document.getElementById('comunaError');
    var direccionError = document.getElementById('direccionError');
    var passwordError = document.getElementById('passwordError');
    var passwordConfirmError = document.getElementById('passwordConfirmError');
    var terminosError = document.getElementById('terminosError');

    /* ============================================
       COMUNAS POR REGION
       ============================================ */

    var comunasPorRegion = {
        metropolitana: ['Santiago', 'La Pintana', 'Puente Alto', 'Maipu', 'La Florida'],
        valparaiso: ['Valparaiso', 'Vina del Mar', 'Quilpue', 'Villa Alemana'],
        biobio: ['Concepcion', 'Talcahuano', 'Los Angeles', 'Chiguayante']
    };

    // Cuando cambia la region, se cargan sus comunas
    region.addEventListener('change', function () {

        comuna.innerHTML = '<option value="">Seleccione comuna</option>';

        var lista = comunasPorRegion[region.value];

        if (lista) {
            lista.forEach(function (item) {
                var opcion = document.createElement('option');
                opcion.value = item;
                opcion.textContent = item;
                comuna.appendChild(opcion);
            });
        }
    });

    /* ============================================
       FUNCIONES DE VALIDACION
       ============================================ */

    // Correos permitidos por la pauta
    function correoPermitido(correo) {
        return correo.endsWith('@duoc.cl') ||
               correo.endsWith('@profesor.duoc.cl') ||
               correo.endsWith('@gmail.com');
    }

    // Validacion basica del RUN chileno sin puntos ni guion
    function validarRun(runTexto) {

        runTexto = runTexto.toUpperCase().trim();

        if (runTexto.length < 7 || runTexto.length > 9) {
            return false;
        }

        var cuerpo = runTexto.slice(0, -1);
        var dv = runTexto.slice(-1);

        if (!/^[0-9]+$/.test(cuerpo)) {
            return false;
        }

        var suma = 0;
        var multiplicador = 2;

        for (var i = cuerpo.length - 1; i >= 0; i--) {
            suma = suma + parseInt(cuerpo.charAt(i)) * multiplicador;
            multiplicador++;

            if (multiplicador > 7) {
                multiplicador = 2;
            }
        }

        var resto = suma % 11;
        var digito = 11 - resto;
        var dvEsperado = '';

        if (digito === 11) {
            dvEsperado = '0';
        } else if (digito === 10) {
            dvEsperado = 'K';
        } else {
            dvEsperado = digito.toString();
        }

        return dv === dvEsperado;
    }

    // Limpia el error de un campo
    function limpiarError(campo, error) {
        campo.classList.remove('error');
        error.textContent = '';
    }

    /* ============================================
       MEDIDOR SIMPLE DE CONTRASENA
       ============================================ */

    var strengthBars = [
        document.getElementById('strengthBar1'),
        document.getElementById('strengthBar2'),
        document.getElementById('strengthBar3'),
        document.getElementById('strengthBar4')
    ];

    var passwordText = document.getElementById('passwordText');

    password.addEventListener('input', function () {

        var largo = password.value.length;

        strengthBars.forEach(function (bar) {
            bar.className = 'bar';
        });

        if (largo > 0) {
            strengthBars[0].classList.add('active', 'weak');
            passwordText.textContent = 'Muy corta';
        }

        if (largo >= 4) {
            strengthBars[1].classList.add('active', 'medium');
            passwordText.textContent = 'Largo permitido';
        }

        if (largo >= 7) {
            strengthBars[2].classList.add('active', 'strong');
            passwordText.textContent = 'Buena';
        }

        if (largo > 10) {
            strengthBars[3].classList.add('active', 'weak');
            passwordText.textContent = 'Muy larga';
        }

        if (largo === 0) {
            passwordText.textContent = 'Entre 4 y 10 caracteres';
        }
    });

    /* ============================================
       ENVIO DEL FORMULARIO
       ============================================ */

    form.addEventListener('submit', function (e) {

        // Evita que se recargue la pagina
        e.preventDefault();

        var isValid = true;

        /* RUN */
        if (run.value.trim() === '') {
            run.classList.add('error');
            runError.textContent = 'El RUN es obligatorio.';
            isValid = false;
        } else if (!validarRun(run.value)) {
            run.classList.add('error');
            runError.textContent = 'El RUN no es valido. Escribelo sin puntos ni guion.';
            isValid = false;
        } else {
            limpiarError(run, runError);
        }

        /* Nombre */
        if (nombre.value.trim() === '') {
            nombre.classList.add('error');
            nombreError.textContent = 'El nombre es obligatorio.';
            isValid = false;
        } else if (nombre.value.trim().length > 50) {
            nombre.classList.add('error');
            nombreError.textContent = 'El nombre no puede superar los 50 caracteres.';
            isValid = false;
        } else {
            limpiarError(nombre, nombreError);
        }

        /* Apellidos */
        if (apellido.value.trim() === '') {
            apellido.classList.add('error');
            apellidoError.textContent = 'Los apellidos son obligatorios.';
            isValid = false;
        } else if (apellido.value.trim().length > 100) {
            apellido.classList.add('error');
            apellidoError.textContent = 'Los apellidos no pueden superar los 100 caracteres.';
            isValid = false;
        } else {
            limpiarError(apellido, apellidoError);
        }

        /* Correo */
        var correo = email.value.trim();

        if (correo === '') {
            email.classList.add('error');
            emailError.textContent = 'El correo es obligatorio.';
            isValid = false;
        } else if (correo.length > 100) {
            email.classList.add('error');
            emailError.textContent = 'El correo no puede superar los 100 caracteres.';
            isValid = false;
        } else if (!correoPermitido(correo)) {
            email.classList.add('error');
            emailError.textContent = 'Solo se permite @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            isValid = false;
        } else {
            limpiarError(email, emailError);
        }

        /* Fecha nacimiento */
        fechaNacimientoError.textContent = '';

        /* Telefono opcional */
        if (telefono.value.trim() !== '' && telefono.value.trim().length < 8) {
            telefono.classList.add('error');
            telefonoError.textContent = 'Ingresa un telefono valido.';
            isValid = false;
        } else {
            limpiarError(telefono, telefonoError);
        }

        /* Region */
        if (region.value === '') {
            region.classList.add('error');
            regionError.textContent = 'Selecciona una region.';
            isValid = false;
        } else {
            limpiarError(region, regionError);
        }

        /* Comuna */
        if (comuna.value === '') {
            comuna.classList.add('error');
            comunaError.textContent = 'Selecciona una comuna.';
            isValid = false;
        } else {
            limpiarError(comuna, comunaError);
        }

        /* Direccion */
        if (direccion.value.trim() === '') {
            direccion.classList.add('error');
            direccionError.textContent = 'La direccion es obligatoria.';
            isValid = false;
        } else if (direccion.value.trim().length > 300) {
            direccion.classList.add('error');
            direccionError.textContent = 'La direccion no puede superar los 300 caracteres.';
            isValid = false;
        } else {
            limpiarError(direccion, direccionError);
        }

        /* Contrasena */
        if (password.value.trim() === '') {
            password.classList.add('error');
            passwordError.textContent = 'La contrasena es obligatoria.';
            isValid = false;
        } else if (password.value.length < 4 || password.value.length > 10) {
            password.classList.add('error');
            passwordError.textContent = 'La contrasena debe tener entre 4 y 10 caracteres.';
            isValid = false;
        } else {
            limpiarError(password, passwordError);
        }

        /* Confirmar contrasena */
        if (passwordConfirm.value.trim() === '') {
            passwordConfirm.classList.add('error');
            passwordConfirmError.textContent = 'Debes confirmar la contrasena.';
            isValid = false;
        } else if (password.value !== passwordConfirm.value) {
            passwordConfirm.classList.add('error');
            passwordConfirmError.textContent = 'Las contrasenas no coinciden.';
            isValid = false;
        } else {
            limpiarError(passwordConfirm, passwordConfirmError);
        }

        /* Terminos */
        if (!terminos.checked) {
            terminosError.textContent = 'Debes aceptar los terminos y condiciones.';
            isValid = false;
        } else {
            terminosError.textContent = '';
        }

        // Si hay errores, se muestra mensaje y no guarda nada
        if (!isValid) {
            mostrarToast('error', 'Revisa el formulario', 'Corrige los campos marcados en rojo.');
            return;
        }

        /* ============================================
           GUARDAR USUARIO
           ============================================ */

        btnRegistro.disabled = true;
        btnRegistro.textContent = 'Creando cuenta...';

        var usuarios = JSON.parse(localStorage.getItem('usuariosEcoMarket') || '[]');

        var existe = usuarios.some(function (u) {
            return u.email === correo;
        });

        if (existe) {
            mostrarToast('error', 'Cuenta ya existe', 'Ya hay una cuenta con este correo.');
            btnRegistro.disabled = false;
            btnRegistro.textContent = 'Crear cuenta';
            return;
        }

        var nuevoUsuario = {
            id: Date.now(),
            run: run.value.trim().toUpperCase(),
            nombre: nombre.value.trim(),
            apellido: apellido.value.trim(),
            email: correo,
            fechaNacimiento: fechaNacimiento.value,
            telefono: telefono.value.trim(),
            region: region.value,
            comuna: comuna.value,
            direccion: direccion.value.trim(),
            tipoUsuario: 'Cliente',
            password: password.value,
            newsletter: document.getElementById('newsletter').checked,
            fechaRegistro: new Date().toISOString()
        };

        usuarios.push(nuevoUsuario);

        localStorage.setItem('usuariosEcoMarket', JSON.stringify(usuarios));

        mostrarToast('success', 'Cuenta creada', 'Usuario registrado correctamente.');

        form.reset();
        comuna.innerHTML = '<option value="">Seleccione comuna</option>';
        btnRegistro.disabled = false;
        btnRegistro.textContent = 'Crear cuenta';

        setTimeout(function () {
            window.location.href = 'login.html';
        }, 2000);
    });

    /* ============================================
       LIMPIAR ERRORES AL ESCRIBIR
       ============================================ */

    var campos = [
        run, nombre, apellido, email, telefono,
        region, comuna, direccion, password, passwordConfirm
    ];

    campos.forEach(function (campo) {
        campo.addEventListener('input', function () {
            var error = document.getElementById(campo.id + 'Error');

            if (error) {
                error.textContent = '';
            }

            campo.classList.remove('error');
        });

        campo.addEventListener('change', function () {
            var error = document.getElementById(campo.id + 'Error');

            if (error) {
                error.textContent = '';
            }

            campo.classList.remove('error');
        });
    });

    terminos.addEventListener('change', function () {
        terminosError.textContent = '';
    });

    /* ============================================
       TOAST
       ============================================ */

    function mostrarToast(type, title, message) {
        var toast = document.getElementById('toast');
        var toastTitle = document.getElementById('toastTitle');
        var toastMessage = document.getElementById('toastMessage');

        toast.className = 'toast show ' + type;
        toastTitle.textContent = title;
        toastMessage.textContent = message;

        clearTimeout(toast._timeout);

        toast._timeout = setTimeout(function () {
            toast.classList.remove('show');
        }, 3500);
    }

});