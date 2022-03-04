let formulario = document.getElementById('formulario')
let citas = []

formulario.addEventListener('submit', e =>{
    e.preventDefault()
    capturarDatos()
    
})

const capturarDatos = () =>{
    let nombre = document.getElementById('nombre').value
    let fecha = document.getElementById('fecha').value
    let hora = document.getElementById('hora').value
    let sintomas = document.getElementById('sintomas').value

    let resgritrarCita = {
        id: Math.round(Math.random()*(100-1)+1),
        nombre,
        fecha,
        hora,
        sintomas
    }
    console.log(resgritrarCita)

    const key = JSON.parse(localStorage.getItem('citas'))

    if (key !== null){
        key.unshift(resgritrarCita)
        localStorage.setItem('citas', JSON.stringify(key))
    }else{
        citas.unshift(resgritrarCita)
        localStorage.setItem('citas', JSON.stringify(citas))
    }
    getLocalStorage()

    formulario.reset()
}

//Listar los datos guardados en local

let listarCitas = document.getElementById('listarCita')

const getLocalStorage = () =>{
    listarCitas.innerHTML = ''
    let traerCitasLocalStorage = JSON.parse(localStorage.getItem('citas'))

    traerCitasLocalStorage.map(cita =>{
        const {id,nombre, fecha, hora,sintomas} = cita

        listarCitas.innerHTML += `
        <td>${nombre}</td>
        <td>${fecha}</td>
        <td>${hora}</td>
        <td>${sintomas}</td>
        <td><button id="${id}" class ="btn btn-danger">Delete</button></td>
        `
    })
}

//cargar el dom

document.addEventListener('DOMContentLoaded', getLocalStorage)

//4 el boton de borrar

listarCitas.addEventListener('click', e =>{
    console.log(e)
    const btnDelete = e.target.classList.contains('btn-danger')
    const id = e.target.id

    const local = JSON.parse(localStorage.getItem('citas'))

    const buscar = local.find(data => data.id === Number(id))

    console.log(buscar)

    if(btnDelete){
        local.forEach((element, index)=>{
            if(element.id === buscar.id){
                local.splice(index,1)
                localStorage.setItem('citas', JSON.stringify(local))
                getLocalStorage()
            }
        })
    }

})


//busqueda por nombre

let btnBuscar = document.getElementById('btnBuscar')
let buscarNombre = document.getElementById('busqueda')

btnBuscar.addEventListener('click', e =>{
    e.preventDefault()

    let input= document.getElementById('inputBuscar').value
    let data = JSON.parse(localStorage.getItem('citas'))

    let filtro = data.filter(cita => cita.nombre.toLowerCase().includes(input.toLowerCase()))
    console.log(filtro)

    buscarNombre.innerHTML = ''

    filtro.length === 0 ?
        buscarNombre.innerHTML += `<div>El nombre ${input} no existe</div>`
        :
        filtro.map(cita =>{
            const{nombre, fecha, hora, sintomas} = cita
            buscarNombre.innerHTML += `
            <div>
            <div><h1>${nombre}</h1></div>
            <div>
            <h3>${fecha}</h3>
            <h3>${hora}</h3>
            </div>
            <h3>${sintomas}</h3>
            </div>           `
        })
})

//limpiar campos
let btnLimpiar = document.querySelector('.btnLimpiar')

btnLimpiar.addEventListener('click', e =>{
    buscarNombre.innerHTML = ''
    formulario.reset()
})