
/* Ingrese su Nombre, Apellido y edad */
let Nombre = prompt ("Ingrese su Nombre");
let Apellido = prompt ("Ingrese su Apellido");
let Edad = Number (prompt ("Ingrese su Edad"));

if (Nombre, Apellido != "", Edad <= 17 )
        alert("Los datos ingresados no son válidos. Por favor, complete todos los campos correctamente.")

    else{
        alert("¡Datos cargados con exito! \nUsuario: " + Nombre + " "+ Apellido + " \n¡Bienvenido! \n¿Presione ENTER para continuar?")
    }
     
/*Clase producto, con atributos y propiedades*/
class Producto{
    constructor(id, nombreProducto, marca, precio, cantidad){
        this.id = id
        this.nombreProducto = nombreProducto
        this.marca = marca
        this.precio = precio
        this.cantidad = cantidad
    }
    
    sumar_iva(){
        return this.precio * 1.21
    }

    descripcion(){
        return "\nNombre: " +  this.nombreProducto+
                "\nMarca: " + this.marca+
                "\nPrecio: $" + this.precio+
                "\nPrecio + IVA: " + this.sumar_iva()+
                "\n==============="
    }
}

const listaDeProductos = [  new Producto(1,"Proteina","ENA" ,400),

                            new Producto(2,"Creatina","StarNutricion", 600),

                            new Producto(3,"Ganador de Peso","Gentech", 800)
]

let ProductosDisponibles = ""
listaDeProductos.forEach(producto => {
    ProductosDisponibles += producto.descripcion()
})

alert("Lista de Productos Disponibles: " + ProductosDisponibles);


let seleccion = Number(prompt("Ingrese el número del producto que desea seleccionar:"));

if (seleccion >= 1 && seleccion <= listaDeProductos.length) {
  let cantidad = Number(prompt("Ingrese la cantidad de unidades que desea comprar:"));

  if (isNaN(cantidad) && cantidad > 0) {
    let productoSeleccionado = listaDeProductos[seleccion - 1];
    let costoTotal = productoSeleccionado.sumar_iva() * cantidad;

    alert( "Producto seleccionado:\n" + productoSeleccionado.descripcion() +
            "\nCantidad seleccionada: " + cantidad +
            "\nCosto Total de la compra: $" + costoTotal +
            "\n¡Muchas Gracias por su compra!");
  } else {
    alert("La cantidad ingresada no es válida.");
  }
} else {
  alert("La opción seleccionada no es válida.");
}


