/* ============================================
   LOGIN.JS - EcoMarket
   Valida correo, contrasena y tipo de usuario
   ============================================ */

// Espera que cargue toda la pagina
document.addEventListener('DOMContentLoaded', function () {

    var loginForm = document.getElementById('loginForm');
    var redirectMessage = document.getElementById('redirectMessage');
    var loginBtn = document.getElementById('loginBtn');

    // Si no encuentra el formulario no hace nada
    if (!loginForm) return;


    /* ============================================
       USUARIO ADMINISTRADOR DE PRUEBA
       ============================================ */

    // Como esta entrega no tiene base de datos,
    // dejamos un administrador de prueba en localStorage.
    var usuarios = JSON.parse(
        localStorage.getItem('usuariosEcoMarket') || '[]'
    );

    var existeAdmin = usuarios.some(function (usuario) {
        return usuario.email === 'admin@duoc.cl';
    });

    if (!existeAdmin) {

        usuarios.push({
            id: 1,
            run: '190110222',
            nombre: 'Administrador',
            apellido: 'EcoMarket',
            email: 'admin@duoc.cl',
            fechaNacimiento: '',
            telefono: '',
            region: 'metropolitana',
            comuna: 'Santiago',
            direccion: 'EcoMarket',
            tipoUsuario: 'Administrador',
            password: '1234'
        });

        localStorage.setItem(
            'usuariosEcoMarket',
            JSON.stringify(usuarios)
        );
    }


    /* ============================================
       CORREOS PERMITIDOS
       ============================================ */

    function correoPermitido(correo) {
        return correo.endsWith('@duoc.cl') ||
               correo.endsWith('@profesor.duoc.cl') ||
               correo.endsWith('@gmail.com');
    }


    /* ============================================
       ENVIAR FORMULARIO
       ============================================ */

    loginForm.addEventListener('submit', function (e) {

        // Evita que la pagina se recargue
        e.preventDefault();

        var valido = true;

        var email = document.getElementById('email');
        var emailError = document.getElementById('emailError');

        var password = document.getElementById('password');
        var passwordError = document.getElementById('passwordError');

        var correo = email.value.trim().toLowerCase();
        var clave = password.value.trim();


        /* CORREO */

        if (correo === '') {

            emailError.textContent = 'El correo es obligatorio.';
            email.classList.add('error');
            valido = false;

        } else if (correo.length > 100) {

            emailError.textContent = 'El correo no puede superar los 100 caracteres.';
            email.classList.add('error');
            valido = false;

        } else if (!correoPermitido(correo)) {

            emailError.textContent =
                'Solo se permite correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            email.classList.add('error');
            valido = false;

        } else {

            emailError.textContent = '';
            email.classList.remove('error');
        }


        /* CONTRASENA */

        if (clave === '') {

            passwordError.textContent = 'La contrasena es obligatoria.';
            password.classList.add('error');
            valido = false;

        } else if (clave.length < 4 || clave.length > 10) {

            passwordError.textContent =
                'La contrasena debe tener entre 4 y 10 caracteres.';
            password.classList.add('error');
            valido = false;

        } else {

            passwordError.textContent = '';
            password.classList.remove('error');
        }


        // Si las validaciones basicas fallan, terminamos aqui
        if (!valido) {
            return;
        }


        /* ============================================
           BUSCAR USUARIO REGISTRADO
           ============================================ */

        usuarios = JSON.parse(
            localStorage.getItem('usuariosEcoMarket') || '[]'
        );

        var usuarioEncontrado = usuarios.find(function (usuario) {

            return usuario.email.toLowerCase() === correo &&
                   usuario.password === clave;

        });


        // Si el correo o la contrasena no coinciden
        if (!usuarioEncontrado) {

            passwordError.textContent =
                'Correo o contrasena incorrectos.';

            password.classList.add('error');
            return;
        }


        /* ============================================
           GUARDAR SESION
           ============================================ */

        // Guardamos el usuario que inicio sesion
        localStorage.setItem(
            'usuarioEcoMarket',
            JSON.stringify(usuarioEncontrado)
        );

        redirectMessage.classList.add('show');
        loginBtn.disabled = true;
        loginBtn.textContent = 'Ingresando...';


        /* ============================================
           REDIRECCION SEGUN EL TIPO DE USUARIO
           ============================================ */

        setTimeout(function () {

            if (usuarioEncontrado.tipoUsuario === 'Administrador') {

                window.location.href = 'admin.html';

            } else if (usuarioEncontrado.tipoUsuario === 'Vendedor') {

                window.location.href = 'admin-productos.html';

            } else {

                window.location.href = 'home.html';
            }

        }, 1000);

    });


    // Limpiamos mensajes de error cuando el usuario vuelve a escribir
    document.getElementById('email').addEventListener('input', function () {
        document.getElementById('emailError').textContent = '';
        this.classList.remove('error');
    });

    document.getElementById('password').addEventListener('input', function () {
        document.getElementById('passwordError').textContent = '';
        this.classList.remove('error');
    });

});
