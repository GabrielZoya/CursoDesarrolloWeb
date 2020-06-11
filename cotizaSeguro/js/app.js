// cotizador seguro
//constructor
function Seguro(marca,anio,tipo){
    this.marca=marca;
    this.anio=anio;
    this.tipo=tipo;
}
Seguro.prototype.cotizarSeguro= function(informacion){
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35
    */
   let cantidad;
   const base=2000;

   switch(this.marca){
       case "1":
           cantidad=base*1.15
           break;
       case "2":
            cantidad=base*1.05
            break;
       case "3":
            cantidad=base*1.35
            break;    
   }


const diferencia = new Date().getFullYear()-this.anio
//se reduce 3% el valor del seguro cada año
cantidad-= ((diferencia * 3)* cantidad) / 100;
/*
si el seguro es basico se multiplica 30% mas
si es completo se multiplica por 58%
*/
if (this.tipo==="basico"){
    cantidad*=1.30;
} else {
    cantidad*=1.50
}
return cantidad;
}

//todo lo que se muestra 
function interfaz(){

}

//eventlisteners
const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", function(e){
    e.preventDefault();
    
    //leer marca en el select
    const marca = document.getElementById("marca");
    const marcaSeleccionada=marca.options[marca.selectedIndex].value;

    //leer año del select
    const anio=document.getElementById("anio");
    const anioSeleccionado=anio.options[anio.selectedIndex].value;

    //leer valor de radio button
    const tipo = document.querySelector("input[name='tipo']:checked").value;


    //crear instancia de interface
    const interF = new interfaz();

    //mensaje de error
    interfaz.prototype.mostrarMensaje=function(mensaje,tipo){
        const div=document.createElement('div');
        if (tipo==="error"){
            div.classList.add("mensaje","error");
        } else{
            div.classList.add("mensaje","correcto");
        }
        div.innerHTML=`${mensaje}`;
        formulario.insertBefore(div,document.querySelector(".form-group"));

        setTimeout(function(){
            document.querySelector(".mensaje").remove();
        },3000);
    };

    //imprime resultado de la cotizacion
    interfaz.prototype.mostrarResultado=function(seguro,total){
        const resultado = document.getElementById("resultado");
        let marca;
        switch(seguro.marca){
            case "1":
                marca="Amerciano";
                break;
            case "2":
                marca="Asiatico";
                break;  
            case "3":
            marca="Europeo";
            break;  
        }
       
        const div=document.createElement("div");
        div.innerHTML=`
        <p class="header">Tu Resumen: </p>
        <p>Marca: ${marca}</p>
        <p> Año: ${seguro.anio}</p>
        <p>Tipo: ${seguro.tipo}</p>
        `
        const spinner=document.querySelector("#cargando img");
        spinner.style.display="block";
        setTimeout(function(){
            resultado.appendChild(div);
            spinner.style.display="none";
        },3000);
       
    }

    //comprobacion de campos vacios
    if (marcaSeleccionada==="" || anioSeleccionado==="" || tipo==="" ){
        interF.mostrarMensaje("faltan datos, revisar el formulario","error");
    } else {
        //limpiar resultados anteriores
        const resultados=document.querySelector("#resultado div");
        if(resultados!=null){
            resultados.remove();
        }

       const seguro=new Seguro(marcaSeleccionada,anioSeleccionado,tipo);
       // cotizar seguro
       const cantidad=seguro.cotizarSeguro(seguro);
       //mostrar resultado
       interF.mostrarResultado(seguro,cantidad); 
       interF.mostrarMensaje("cotizando...","exito"); 
    }
});


const max= new Date().getFullYear(),
      min= max-20;


const selectAnios=document.getElementById("anio");
for(let i=max;i>min;i--){
    let option=document.createElement('option');
    option.value=i;
    option.innerHTML=i;
    selectAnios.appendChild(option);

}