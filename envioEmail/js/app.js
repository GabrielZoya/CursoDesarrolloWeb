//variables
const email=document.getElementById("email");
const asunto=document.getElementById("asunto");
const mensaje=document.getElementById("mensaje");
const btnEnviar=document.getElementById("enviar");
const formularioEnviar=document.getElementById("enviar-mail");
const resetBtn= document.getElementById("resetBtn");






// Event listeners

eventListeners()

function eventListeners(){
//deshabilitar submit
document.addEventListener('DOMContentLoaded',inicioApp);

// Campos del formulario
email.addEventListener('blur',validarCampo);
asunto.addEventListener('blur',validarCampo);
mensaje.addEventListener('blur',validarCampo);

btnEnviar.addEventListener("click",enviarEmail);
resetBtn.addEventListener("click",resetFormulario);

}






// funciones

//funcion al enviar correo
function enviarEmail(e){
 //ejectuar animacion
 const spinnerGif = document.querySelector("#spinner");
 spinnerGif.style.display="block";

 //animacion mail enviado
    const enviado=document.createElement('img');
    enviado.src="img/mail.gif";
    enviado.style.display="block";

 //ocultar spinner y mostrar mail enviado
 setTimeout(function() {
     spinnerGif.style.display="none";
     document.querySelector("#loaders").appendChild(enviado);
        setTimeout(function() {
            enviado.remove();
            formularioEnviar.reset();
        },3000 ); 

 },3000 ); 

}

function inicioApp(){
    //deshabilitar el envio
    btnEnviar.disabled=true;
}

function validarCampo(){
    // Validar longitud del texto y que tenga contenido
    validarLongitud(this);
 
    //Valida el email
    if (this.type==="email"){
        validarEmail(this);
    }


    let errores=document.querySelectorAll('.error');
    if (email.value !== "" && asunto.value !== "" && mensaje.value!== "") {
        if (errores.length===0){
            btnEnviar.disabled=false;
        }

    }

}

function resetFormulario(e){
    formularioEnviar.reset();
    e.preventDefault();
}

function validarLongitud(campo){
    if(campo.value.length>0){
        campo.style.borderBottomColor = "green";
        campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add("error");
    }
}

function validarEmail(campo){
const mensaje=campo.value;
if (mensaje.indexOf("@") !== -1){
    campo.style.borderBottomColor="green";
    campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor="red";
        campo.classList.add("error");
    }
}