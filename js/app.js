
/* Ingrese su Nombre, Apellido y edad */
let Nombre = prompt ("Ingrese su Nombre");
let Apellido = prompt ("Ingrese su Apellido");
let Edad = Number (prompt ("Ingrese su Edad"));
let costoTotal = 0
let rta = ""


function iva(precio){
    return precio * 0.21
}

if(Edad >= 18){
    alert("Usuario: " + Nombre + " "+ Apellido + " \n¡Bienvenido! \n¿Esta seguro que desea continuar?")  

    let Producto = prompt("Ingrese el numero del producto que desea comprar \n1)Proteina \n2)Creatina \n3)Ganador de Peso")
    let Marca = Number(prompt("¿Que marca desea comprar? \n1)Starnutrition\n2)ENA\n3)Gentech."))
    let Precio = Number(prompt("Ingrese el precio que desea pagar:\n1) $400\n2) $500\n3) $600"));
    let Unidades = Number(prompt("¿Cuántas unidades desea comprar?"));

    costoTotal = ((Precio * Unidades) + iva(Precio))

    alert("El costo total de su compra es: $" + costoTotal + "\n¡Muchas Gracias por su compra!");

}else{
    alert("Usuario: " + Nombre + " "+ Apellido + " \nLo sentimos, usted no puede ingresar");
}

/* Compra y detalle de producto y precio */


    

