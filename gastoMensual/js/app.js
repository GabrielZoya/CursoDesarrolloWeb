// Variables
const presupuestoUsuario=prompt("¿Cual es tu presupuesto Mensual?");
const formulario=document.getElementById("agregar-gasto");
let cantidadPresupuesto;






// Clases
//Clase presupuesto

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto=Number(presupuesto);
        this.restante=Number(presupuesto);
    }
    //metodo de resta de presupuesto
    presupuestoRestante(cantidad=0){
        return this.restante-=Number(cantidad);
    }
}

//Clase de interfaz
class Interfaz {
    insertarPresupuesto(cantidad){
      const presupuestoSpan=document.querySelector('span#total');
      const restanteSpan=document.querySelector('span#restante');
      
      //instertar al HTML
      presupuestoSpan.innerHTML=`${cantidad}`;
      restanteSpan.innerHTML=`${cantidad}`;
    }

    imprimirMensaje(mensaje,tipo){
        const divMensaje=document.createElement("div");
        divMensaje.classList.add('text-center',"alert")
        if(tipo==="error"){
            divMensaje.classList.add("alert-danger");
        }else{
            divMensaje.classList.add("alert-success");
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        //elimiar el alert despues de 3 segundos
        setTimeout(function(){
            document.querySelector(".primario .alert").remove();
            formulario.reset();
        },3000);
    }

    //Insertar gastos a la lista
    agregarGasto(nombre,cantidad){
        const gastosListado=document.querySelector("#gastos ul");
        //crear un LI
        const li=document.createElement("li");
        li.className="list-group-item d-flex justify-content-between align-items-center";
        //Instertar el gasto
        li.innerHTML=`
            ${nombre}
           <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>
        `;

        //Instertar al HTML
        gastosListado.appendChild(li);
    }

    //comprueba presupuesto restante
    presupuestoRestante(cantidad){
        const restante=document.querySelector('span#restante');
        //leer el presupuesto restante
        const presupuestoRestanteUser=
        cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML=`${presupuestoRestanteUser}`;
        this.comprobarPresupuesto();
    }

    //cambiar color del presupuesto restante
    comprobarPresupuesto(){
        const presupuestoTotal=cantidadPresupuesto.presupuesto;
        const presupuestoRestante=cantidadPresupuesto.restante;

        //comprobar 25% del presupuesto
        if( (presupuestoTotal/4)>presupuestoRestante){
            const restante=document.getElementById("restante");
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal/2)>presupuestoRestante){
            const restante=document.getElementById("restante");
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }


    }
}






// Event Listeners
document.addEventListener('DOMContentLoaded',function(){
    if(presupuestoUsuario===null || presupuestoUsuario===""){
        window.location.reload();
    } else {
        //instanciar un presupuesto
        cantidadPresupuesto=new Presupuesto(presupuestoUsuario);
        //Instanciar la clase de interfaz
        const ui= new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener("submit",function(e){
    e.preventDefault();
    
    //leer el formulario de gasto
    const nombreGasto=document.getElementById("gasto").value;
    const cantidadGasto=document.getElementById("cantidad").value;

    //instanciar interfaz
    const ui= new Interfaz();

    //comprobar campos
    if(nombreGasto===""|| cantidadGasto===""){
        //parametros (mensaje y tipo)
        ui.imprimirMensaje("Hubo un error","error");
    } else {
        //insertar en el HTML
        ui.imprimirMensaje("Correcto","correcto");
        ui.agregarGasto(nombreGasto,cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

})