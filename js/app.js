//Adaptando a mi proyecto el ejemplo del profe,utilizando variantes//

class Producto{
    constructor({id, nombre, precio, descripcion, img}){
        this.id = id
        this.nombre = nombre 
        this.precio = precio
        this.cantidad = 1
        this.descripcion = descripcion
        this.img = img
      }
    

      aumentarCantidad(){
        this.cantidad++
      }

      disminuirCantidad(){
        if(this.cantidad > 1){
            this.cantidad--
        }
      }

      descripcionHTMLCarrito(){
        return `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${this.img}" class="img-fluid rounded-start" alt="...">
                        </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${this.nombre}</h5>
                            <p class="card-text">Precio: $${this.precio}</p>
                            <p class="card-text">Cantidad:<button class="btn btn-primary fa-2xs" id="minus-${this.id}"><i class="fa-solid fa-minus"></i></button> ${this.cantidad} <button class="btn btn-primary fa-2xs" id="plus-${this.id}"><i class="fa-solid fa-plus"></i></button></p>
                            <button class="btn btn-primary" id="eliminar-${this.id}"><i class="fa-solid fa-trash" style="color: #000000;"></i></button>
                        </div>
                    </div>
                </div>
            </div>`
      }


    descripcionHTML(){
        return `<div class="card" style="width: 18rem; background-color: rgba(29, 29, 46, 0.288)">
            <img src="${this.img}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${this.nombre}</h5>
              <p class="card-text">${this.descripcion}</p>
              <p class="card-text">$${this.precio}</p>
              <a href="#" class="btn btn-primary" id="ap-${this.id}">Añadir al carrito</a>
            </div>
          </div>
            `
    }
    
}

class Carrito{
    constructor(){
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById('contenedor_carrito')
        this.total = document.getElementById('total')
        this.finalizar_compra = document.getElementById("finalizar_compra")
        this.keyStorage = "listaCarrito"  
    }

    levantarStorage(){
        this.listaCarrito = JSON.parse(localStorage.getItem(this.keyStorage)) || []
        
        if(this.listaCarrito.length > 0){
            let listaAuxiliar = []

            for(let i = 0; i < this.listaCarrito.length; i ++){
                let productoDeLaClaseProducto = new Producto (this.listaCarrito[i])
                listaAuxiliar.push(productoDeLaClaseProducto)
            }

            this.listaCarrito = listaAuxiliar

        }
    }

    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem(this.keyStorage, listaCarritoJSON)
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

    limpiarContenedorCarrito(){
        this.contenedor_carrito.innerHTML =  ""
    }

    mostrarProductos(){
        this.limpiarContenedorCarrito()

        this.listaCarrito.forEach( producto => {
            contenedor_carrito.innerHTML += producto.descripcionHTMLCarrito()
        })
        
        this.listaCarrito.forEach( producto => {

           let btn_eliminar = document.getElementById(`eliminar-${producto.id}`)
           let btn_plus = document.getElementById(`plus-${producto.id}`)
           let btn_minus = document.getElementById(`minus-${producto.id}`)
           
           btn_eliminar.addEventListener("click", () => {
            this.eliminar(producto)
            this.guardarEnStorage()
            this.mostrarProductos()
           })

           btn_plus.addEventListener("click", () =>{
            producto.aumentarCantidad()
            this.mostrarProductos()
           })
           btn_minus.addEventListener("click", () =>{
            producto.disminuirCantidad()
            this.mostrarProductos()
           })

          
        })

        total.innerHTML = "Precio Total: $" + this.calcular_Total()
    }

    calcular_Total(){
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
    }

    eventoFinalizarCompra(){
         this.finalizar_compra.addEventListener("click", () => {

            if(this.listaCarrito.length > 0){
                let precio_total = this.calcular_Total()

                this.listaCarrito = []
    
                localStorage.removeItem(this.keyStorage)
    
                this.limpiarContenedorCarrito()
                this.total.innerHTML = ""
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `¡Compra realizada con éxito! \nPor el precio de: $${precio_total}`,
                    showConfirmButton: false,
                    timer: 3000,
                  })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: '¡Debes seleccionar al menos 1 producto!',
                    showConfirmButton: false,
                    timer: 2000, 
                })
           
            }
        })    
    }
}


class ProductoController{
    constructor(){
        this.listaProductos = []
        this.contenedor_productos = document.getElementById("contenedor_productos")
    }

    cargarProductos(){
        //PRODUCTOS//
        const producto1 = new Producto ({id:1, nombre: "Creatina" , precio: 15000, descripcion:"Creatina monohidratada: es 100% pura creatina micronizada de máxima absorción, previene fatiga, aumenta masa muscular.", img: "http://starnutrition.com.ar/images/PD_creatine_monohydrate_300_01.jpg"})
        const producto2 = new Producto ({id:2, nombre: "Proteina" , precio: 20000, descripcion:" Whey Protein: máxima pureza, bajo en carbohidratos, grasas y y fácil de digerir logrando una mayor absorción.", img: "http://starnutrition.com.ar/images/PD_p_whey_protein_01.jpg"})
        const producto3 = new Producto ({id:3, nombre: "Muttan Mass" , precio: 25000, descripcion:"Suplemento dietario en polvo para preparar bebida a base de carbohidratos, proteínas de suero y vitaminas.", img: "http://starnutrition.com.ar/images/PD_mutant_mass_01.jpg"})
        const producto4 = new Producto ({id:4, nombre: "Aminoacidos" , precio: 30000, descripcion:"Ideales para rendimiento, recuperación, fatiga y masa muscular y una gran fuente de energía.", img: "http://starnutrition.com.ar/images/PD_mtor_bcaa_01.jpg"} )

        this.agregar(producto1)
        this.agregar(producto2)
        this.agregar(producto3)
        this.agregar(producto4)
    }

    agregar(producto){
        this.listaProductos.push(producto)
    }

    eventoAgregarAlCarrito(){
        this.listaProductos.forEach(producto => {

            const btn = document.getElementById(`ap-${producto.id}`)

            btn.addEventListener("click",() => {
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarProductos()
                Toastify({
                    text: `${producto.nombre} añadido!`,
                    duration: 2000,
                    gravity: "bottom",
                    position: "right", 

                  }).showToast();
            })
        })

    }

    mostrarProductos(){
        this.listaProductos.forEach(producto => {
          this.contenedor_productos.innerHTML += producto.descripcionHTML()
        })

        this.eventoAgregarAlCarrito()
    }     
}

// INSTANCIA DE CARRITO //
const carrito = new Carrito ()
carrito.levantarStorage()
carrito.mostrarProductos()    
carrito.eventoFinalizarCompra()

//INSTANCIA DE PRODUCTO CONTROLLER//
const controlador_productos = new ProductoController()
controlador_productos.cargarProductos()
controlador_productos.mostrarProductos()



