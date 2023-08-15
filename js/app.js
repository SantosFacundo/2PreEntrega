//Adaptando a mi proyecto el ejemplo del profe,utilizando variantes//

class Producto{
    constructor(id,nombre,precio,descripcion,img,cantidad){
        this.id = id
        this.nombre = nombre 
        this.precio = precio
        this.descripcion = descripcion
        this.img = img
        this.cantidad = 1
    }
}

class Carrito{
    constructor(){
        this.listaCarrito = []
    }

    levantarStorage(){
        let listaCarritoJSON = localStorage.getItem("listaCarrito")
        this.listaCarrito = JSON.parse(listaCarritoJSON)
    }

    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    agregar(productoAgregar){
        let existeElProducto = this.listaCarrito.some(producto => producto.id == productoAgregar.id)

        if(existeElProducto){
           let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)  
           producto.cantidad++
        }else{
            this.listaCarrito.push(productoAgregar)
        }
    }

    eliminar(productoEliminar){
        let producto = this.listaCarrito.find(producto => producto.id == productoEliminar.id)
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice,1)
        this.guardarEnStorage()
    }

    mostrarProductos(){
        let contenedor_carrito = document.getElementById('contenedor_carrito')
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${producto.img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        <button class="btn btn-primary" id="eliminar-${producto.id}"><i class="fa-solid fa-trash" style="color: #000000;"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
        
        this.listaCarrito.forEach(producto =>{
           let btn_eliminar = document.getElementById(`eliminar-${producto.id}`)
           btn_eliminar.addEventListener("click", () => {
            this.eliminar(producto)
            this.guardarEnStorage()
            this.mostrarProductos()
           })
        })
    }
}

class ProductoController{
    constructor(){
        this.listaProductos = []
    }

    agregar(producto){
        this.listaProductos.push(producto)
    }


    mostrarProductos(){
        let contenedor_productos = document.getElementById("contenedor_productos")
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += `<div class="card" style="width: 18rem; background-color: rgba(29, 29, 46, 0.288)">
            <img src="${producto.img}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
              <p class="card-text">$${producto.precio}</p>
              <a href="#" class="btn btn-primary" id="ap-${producto.id}">Añadir al carrito</a>
            </div>
          </div>
            `
        })


        this.listaProductos.forEach(producto => {

            const btn = document.getElementById(`ap-${producto.id}`)

            btn.addEventListener("click",() => {
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarProductos()
            })
        })
    }     
}

 
//PRODUCTOS//
const producto1 = new Producto (1, "Creatina", 150000, "Creatina monohidratada: es 100% pura creatina micronizada de máxima absorción, previene fatiga, aumenta masa muscular.", "http://starnutrition.com.ar/images/PD_creatine_monohydrate_300_01.jpg")
const producto2 = new Producto (2, "Proteina", 250000, " Whey Protein: máxima pureza, bajo en carbohidratos, grasas y y fácil de digerir logrando una mayor absorción.", "http://starnutrition.com.ar/images/PD_p_whey_protein_01.jpg")
const producto3 = new Producto (3, "Muttan Mass", 20000, "Suplemento dietario en polvo para preparar bebida a base de carbohidratos, proteínas de suero y vitaminas.", "http://starnutrition.com.ar/images/PD_mutant_mass_01.jpg")
const producto4 = new Producto (4, "Aminoacidos", 100000, "Ideales para rendimiento, recuperación, fatiga y masa muscular y una gran fuente de energía.", "http://starnutrition.com.ar/images/PD_mtor_bcaa_01.jpg")

//CARRITO //
const carrito = new Carrito ()
carrito.levantarStorage()
carrito.mostrarProductos()    


//INSTANCIA DE PRODUCTO CONTROLLER//

const controlador_productos = new ProductoController()

controlador_productos.agregar(producto1)
controlador_productos.agregar(producto2)
controlador_productos.agregar(producto3)
controlador_productos.agregar(producto4)

controlador_productos.mostrarProductos()

//añadir la suma subTotal y total producto//

