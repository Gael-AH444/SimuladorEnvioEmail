//Ejecutara el JS  una vez que el contenido HTML se haya descargado
document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionar los elementos de la interfaz
    const inputCopiar = document.querySelector('#copy');
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //Asignar eventos
    //El evento 'blur' se ejecuta cuando se pierde el foco del input
    //El evento 'input' se ejecuta cada que se escriba algo dentro del input
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    inputCopiar.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(evnt){
        evnt.preventDefault();
        resetFormulario(); 
    });


    function enviarEmail(evnt){
        evnt.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();    

            //Crear alerta que simula el envio
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white',  'p-2', 'text-center', 'rounder-lg', 
                'mt-10', 'font-bold', 'text-sm', 'uppercase');
            
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }


    function validar(evnt){ 

        if(evnt.target.id === 'copy' && evnt.target.value.trim() !== ''){
            if(!vaidarEmail(evnt.target.value)){
                mostrarAlerta('El email no es valido',  evnt.target.parentElement);
                return;
            }
        }

        if(evnt.target.value.trim() === ''){
            if(evnt.target.id !== 'copy'){
                mostrarAlerta(`El campo '${evnt.target.id}' es obligatorio`, evnt.target.parentElement);

                //Reinicia la propiedad y verifica el objeto email para habilitar o deshabilitar el boton
                email[evnt.target.id] = ''; 
                comprobarEmail();
                return; //Return detiene la ejecucion de la funcion en este punto
            }
        }

        if(evnt.target.id === 'email' && !vaidarEmail(evnt.target.value)){
            mostrarAlerta('El email no es valido',  evnt.target.parentElement);

            //Reinicia la propiedad y verifica el objeto email para habilitar o deshabilitar el boton
            email[evnt.target.id] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(evnt.target.parentElement);

        //Asignar los valores al objeto
        if(evnt.target.id !== 'copy'){
            email[evnt.target.id] = evnt.target.value.trim().toLowerCase();
        }

        //Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, elementoReferencia){
        //Primero eliminar la alerta y genera una nueva
        limpiarAlerta(elementoReferencia);

        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //Inyectar el error al formulario
        elementoReferencia.appendChild(error);
    }

    function limpiarAlerta(elementoReferencia){
        //Comprueba si ya existe una alerta
        const alerta = elementoReferencia.querySelector('.bg-red-600'); //Boolean
        if(alerta){
            alerta.remove(); 
        }
    }

    /***FUNCION PARA VALIDAR EMAIL***/
    function vaidarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return  resultado;
    }

    function comprobarEmail(){
        /*Obtenemos un array de los valores del objeto con 'Object.values(email)' y 
          verificamos con 'includes' que todos los elementos contengan informacion y 
          no aparezcan vacios ''. Retorna True o False*/
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario(){
        //Reiniciar el objeto
        email.email = '';
        email.mensaje = '';
        email.asunto = '';

        formulario.reset();
        comprobarEmail();
    }

});