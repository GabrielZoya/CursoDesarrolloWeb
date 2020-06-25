document.getElementById("generar-nombre").addEventListener("submit",cargarNombre);

function cargarNombre(e){
    e.preventDefault();

    const origen=document.getElementById("origen");
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero=document.getElementById("genero");
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad=document.getElementById("numero").value;

    let url="";
    url+= "https://api.namefake.com/"

    switch(origenSeleccionado){
        case "argentina":
            url+="spanish-argentina/";
            break; 
        case "spain":
            url+="spanish-spain/";
            break;  
        case "france":
            url+="french-france/";
            break;
        case "italy":
            url+="italian-italy/";
            break;  
        case "brazil":
            url+="portuguese-brazil/";
            break; 
        case "portugal":
            url+="portuguese-portugal/";
            break;     
            
            
    }

    //agregar genero
    if (generoSeleccionado!==""){
        url+=`${generoSeleccionado}`;
    }

    for (let i=0;i<cantidad;i++){
        imprimirNombre();
    }
    //conectar con ajax
    //iniciar XMLHTTPRrquest

    

    let htmlNombres="";
    htmlNombres='<h2>Nombres Generados</h2>';
    htmlNombres+='<ul class="lista">'

    function imprimirNombre(){
        const xhr=new XMLHttpRequest();
        xhr.open('GET',url,true);
        xhr.onload=function(){
            if(this.status===200){
                const nombres=JSON.parse(this.responseText);
                
                //generar el HTML
                if(htmlNombres==""){             
                    htmlNombres+=`
                    <li>${nombres.name}</li>
                    `;
                } else{
                    htmlNombres+=`
                    <li>${nombres.name}</li>
                    ` 
                }
            
                

                document.getElementById("resultado").innerHTML=htmlNombres;
            }
        }

        xhr.send();
    }
    
}