let carreras=[]
let corredores=[]
let patrocinadores=[]
let inscripciones=[]
window.addEventListener("load", inicio)
function inicio(){
    document.getElementById("btnAgregarCarrera").addEventListener("click", agregarCarrera);
    document.getElementById("btnInscribir").addEventListener("click", inscribir);
    document.getElementById("btnAgregarCorredor").addEventListener("click", agregarCorredor);
    document.getElementById("btnPatrocinador").addEventListener("click", agregarPatrocinador);
}

class Carrera{
    constructor(nombre, departamento, fecha, cupo){
        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupo = cupo;
    }
}

class Corredores{
    constructor(nombreC, edad, cedula, fechaVenc, corredorComun, corredorElite){
        this.nombreC=nombreC;
        this.edad=edad
        this.cedula=cedula;
        this.fechaVenc=fechaVenc;
        this.corredorComun=corredorComun;
        this.corredorElite=corredorElite
    }
}

class Patrocinador{
    constructor(nombreP, rubro){                 
        this.nombreP=nombreP;
        this.rubro=rubro;
        this.carrerasP=[];
    }
    asociarCarrera(carreraNombre) {
        if (!this.carrerasP.includes(carreraNombre)) {
            this.carrerasP.push(carreraNombre);
        }
    }
}


class Inscripcion{
    constructor(Icorredores, Icarreras, Ipatrocinador){
        this.Icorredores=Icorredores;
        this.Icarreras=Icarreras
    }
}


function agregarCarrera(){
    let nombre = document.getElementById("idNombreCarrera").value;
    let departamento = document.getElementById("idDepartamento").value;
    let fecha = document.getElementById("idFecha").value;
    let cupo = document.getElementById("idCupo").value;
    let nuevaCarrera = new Carrera(nombre, departamento, fecha, cupo);
    carreras.push(nuevaCarrera);

    actualizarListaCarreras();
    actualizarListaCarrerasP();

    // Limpiar campos
    document.getElementById("idNombreCarrera").value = "";
    document.getElementById("idDepartamento").value = "1"; // opcional: reiniciar select al primer valor
    document.getElementById("idFecha").value = "";
    document.getElementById("idCupo").value = "";
}

function agregarCorredor(){
    let nombreC = document.getElementById("idNombreCorredor").value;
    let cedula= document.getElementById("idCedula").value;
    let edad = document.getElementById("idEdadCorredor").value;
    let fechaVenc = document.getElementById("idFichaMedica").value;
    let corredorComun = document.getElementById("idCorredorComun").value;
    let corredorElite = document.getElementById("idCorredorElite").value;
    let nuevoCorredor = new Corredores(nombreC, edad, cedula, fechaVenc, corredorComun, corredorElite);
    corredores.push(nuevoCorredor);

    actualizarListaCorredores();

    // Limpiar campos
    document.getElementById("idNombreCorredor").value = "";
    document.getElementById("idCedula").value = "1";
    document.getElementById("idEdadCorredor").value = "";
    document.getElementById("idFichaMedica").value = "";
    document.getElementById("idCorredorComun").value = "";
    document.getElementById("idCorredorElite").value = "";
}

function agregarPatrocinador(){
    let nombreP = document.getElementById("idNombrePatrocinador").value;
    let rubro= document.getElementById("idRubro").value;
    let carreraP = document.getElementById("idDepartamentoCarreras").value;
    let nuevoPatrocinador = patrocinadores.find(p => p.nombreP === nombreP);

    if (!nuevoPatrocinador) {
        nuevoPatrocinador = new Patrocinador(nombreP, rubro);
        patrocinadores.push(nuevoPatrocinador);
    }

    nuevoPatrocinador.asociarCarrera(carreraP);
        
    // Limpiar campos
    document.getElementById("idNombrePatrocinador").value = "";
    document.getElementById("idRubro").value = "1";
    document.getElementById("idDepartamentoCarreras").value = "";

}

function actualizarListaCarreras() {
    let select = document.getElementById("idCarrerasInscripcion");
    select.innerHTML = ""; // Limpia el select
    for (let carrera of carreras) {
        let option = document.createElement("option");
        option.text = carrera.nombre;
        option.value = carrera.nombre;
        select.appendChild(option);
    }
}

function actualizarListaCorredores() {
    let select = document.getElementById("idCorredoresInscripcion");
    select.innerHTML = ""; // Limpia el select
    for (let corredor of corredores) {
        let option = document.createElement("option");
        option.text = corredor.nombreC;
        option.value = corredor.nombreC;
        select.appendChild(option);
    }
}

function actualizarListaCarrerasP() {
    let select = document.getElementById("idDepartamentoCarreras");
    select.innerHTML = ""; // Limpia el select
    for (let carrera of carreras) {
        let option = document.createElement("option");
        option.text = carrera.nombre;
        option.value = carrera.nombre;
        select.appendChild(option);
    }
}

function inscribir(){
    let Icorredores=document.getElementById("idCorredoresInscripcion").value;
    let Icarreras=document.getElementById("idCarrerasInscripcion").value;
    let nuevaInscripcion = new Inscripcion(Icorredores, Icarreras);
    inscripciones.push(nuevaInscripcion);

    document.getElementById("idCorredoresInscripcion").value=""
    document.getElementById("idCarrerasInscripcion").value=""
    mostrarInscripciones();
}

function mostrarInscripciones(){
    let mensaje = "LISTA DE INSCRIPCIONES\n\n";

    for (insc of inscripciones) {
        let corredor = corredores.find(c => c.nombreC === insc.Icorredores);
        let carrera = carreras.find(c => c.nombre === insc.Icarreras);
        let patrocinador = patrocinadores.find(p => p.nombreP === insc.Ipatrocinador);

        if (corredor && carrera) {
            mensaje += " Corredor: " + corredor.nombreC;
            mensaje += " Cédula: " + corredor.cedula;
            mensaje += " Edad: " + corredor.edad + "\n";
            mensaje += " Ficha médica vence: " + corredor.fechaVenc;

            // Obtener si es corredor elite o común leyendo el radio button
            let corredorElite = document.getElementById("idCorredorElite").checked;
            if (corredorElite === true) {
                mensaje += " Tipo: Elite";
            } else {
                mensaje += " Tipo: Común";
            }

            mensaje += " Carrera: " + carrera.nombre + " (" + carrera.departamento + ")";
            mensaje += " Fecha: " + carrera.fecha + " - Cupo: " + carrera.cupo;
            mensaje += "Patrocinadores:\n";

            for (let p of patrocinadores) {
                for (let nombreCarrera of p.carrerasP) {
                    if (nombreCarrera === carrera.nombre) {
                        mensaje += " - " + p.nombreP + " (" + p.rubro + ")\n";
                    }
                }
            }

        }
    }
    alert(mensaje);
}