
const comprarEntrada = () => {
    //Variables
    let idPelicula = 0;
    let tipoEntrada = 0;
    let cantidadEntradas = 0;
    let tituloPelicula = '';
    let fechaCompleta = '';
    let precioParcial = 0;
    let precioTotal = 0;

    idPelicula=validarPelicula();

    switch(idPelicula){
        case 1:
            tituloPelicula = 'One Piece Film Red';
            alert('Usted ha seleccinado la pelicula: ' + tituloPelicula);
            break;
        case 2:
            tituloPelicula = 'Crepúsculo la saga: Eclipse';
            alert('Usted ha seleccinado la pelicula: ' + tituloPelicula);
            break;
        case 3:
            tituloPelicula = 'Harry Potter y la cámara secreta';
            alert('Usted ha seleccinado la pelicula: ' + tituloPelicula);
            break;
        case 4:
            tituloPelicula = 'Pantera Negra: Wakanda por siempre';
            alert('Usted ha seleccinado la pelicula: ' + tituloPelicula);
            break;
    }

    fechaCompleta = seleccionarFecha(); //Funcion para obtener fecha y horario de funcion
    tipoEntrada = validarTipoEntrada(); //Funcion para validad el tipo de asiento
    cantidadEntradas = validarCantEntradas(tipoEntrada); //Funcion para obtener cantidad de entradas
    precioParcial = calcularPrecio(cantidadEntradas,tipoEntrada); //Funcion para calcular precio de entradas
    precioTotal = verificarDescuento (fechaCompleta,precioParcial); //Funcion para verificar opciones de descuento

    mostrarDetallesCompra(tituloPelicula,tipoEntrada,fechaCompleta,cantidadEntradas,precioTotal); //Funcion para mostrar todos los datos de la compra
};

const validarPelicula = () => {
    let seleccionPelicula = 0;

    while(!seleccionPelicula || seleccionPelicula <= 0 || seleccionPelicula > 4) {
        seleccionPelicula = parseInt(prompt("¿Qué pelicula desea ver?:\n1: One Piece Film Red\n2: Crepúsculo la saga: Eclipse\n3: Harry Potter y la cámara secreta\n4: Pantera Negra: Wakanda por siempre"));
    }

    return(seleccionPelicula);
};

const validarTipoEntrada = () => {
    let seleccion = 0;

    do{
        seleccion = parseInt(prompt('¿Que tipo de asciento desea?\n1: Estandar\n2: SuperSeat'));
        if (seleccion === 1 || seleccion === 2) {
            return seleccion;
        } else {
            alert('Por favor ingrese un valor valido.');
        }
    }while (Number.isNaN(seleccion) || (seleccion !== 1 || seleccion !== 2));
};

const validarCantEntradas = (tipo) => {
    let cantidad = 0;

    do{
        if (tipo===1) {
            cantidad = parseInt(prompt('Usted ha seleccionado el tipo de asciento Estandar.\nCada uno de estos ascientos tienen un valor de $800\n¿Cuántas entradas desea comprar?'));
        } else{
            cantidad = parseInt(prompt('Usted ha seleccionado el tipo de asciento SuperSeat.\nCada uno de estos ascientos tienen un valor de $1000\n¿Cuántas entradas desea comprar?'));
        }

        if (Number.isNaN(cantidad) || cantidad <= 0) {
            alert('Debe ingresar una cantidad válida.');
        }
    }while (Number.isNaN(cantidad) || cantidad <= 0);

    return cantidad;
};

const calcularPrecio = (cantidad,tipo) => {
    let resultado = 0;

    if(tipo===1){
        resultado = cantidad*800;
    } else{
        resultado = cantidad*1000;
    }

    return(resultado);
};

const seleccionarFecha = () => {
    let fecha = '';
    let horario = 0;
    
    while (fecha === '' || horario === 0) {
        fecha = prompt("Por favor, ingrese una fecha:\n[Lunes | Martes | Miercoles | Jueves | Viernes | Sabado | Domingo]").toUpperCase();

        if (fecha === 'LUNES' || fecha === 'MARTES' || fecha === 'MIERCOLES' || fecha === 'JUEVES' || fecha === 'VIERNES' || fecha === 'SABADO' || fecha === 'DOMINGO'){
            while(!horario || horario <= 0) {
                horario = parseInt(prompt('Por favor, seleccione un horario:\n1. 16:00 hs\n2. 19:20 hs\n3. 22:40 hs'));
                
                switch (horario) {
                    case 1:
                        fecha = fecha + '. 16:00 hs';
                        return (fecha);
                        
                    case 2:
                        fecha = fecha + '. 19:20 hs';
                        return (fecha);

                    case 3:
                        fecha = fecha + '. 22:40 hs';
                        return (fecha);
                    
                    default:
                        alert('Debe seleccionar un horario válido.');
                        horario = 0;
                }
            }
        } else {
            alert('Debe ingresar una fecha válida.');
        }
    }
};

const mostrarDetallesCompra = (titulo,tipo,fecha,cantidad,precio) => {
    if (tipo === 1) {
        alert('DATOS DE LA COMPRA\n==============================\nPelicula: ' + titulo + '\nCantidad de Entradas: ' + cantidad + '\nTipo de asiento: Estandar\nFecha: ' + fecha + '\nImporte: $' + precio);
    } else {
        alert('DATOS DE LA COMPRA\n==============================\nPelicula: ' + titulo + '\nCantidad de Entradas: ' + cantidad + '\nTipo de asiento: SuperSeat\nFecha: ' + fecha + '\nImporte: $' + precio);
    }
};


const verificarDescuento = (fecha,precio) => {
    let fechaFix = '';
    let precioDescuento = 0;
    let codigoDescuento = '';

    fechaFix = fecha.split('.');

    if (fechaFix[0] === 'LUNES' || fechaFix[0] === 'MIERCOLES' || fechaFix[0] === 'VIERNES'){
        alert('Usted ha seleccionado una fecha con descuento.\nSe aplicara un 15% de descuento.');
        precioDescuento = precio * 0.85;
    }

    codigoDescuento = prompt("Ingrese un codigo de descuento.\nSi no tiene uno, deje en sin completar esta opcion").toUpperCase();
    codigoDescuento = codigoDescuento.trim();

    if (codigoDescuento === 'CODER'){
        if (precioDescuento === 0){
            alert('Se ha ingresado el codigo de descuento ' + codigoDescuento + '\nSe aplicara un 50% de descuento.');
            precioDescuento = precio * 0.50;
        } else {
        alert('Se ha ingresado el codigo de descuento ' + codigoDescuento + '\nSe aplicara un 50% de descuento.');
        precioDescuento = precioDescuento * 0.50;
        }
    }

    return(precioDescuento);
};

comprarEntrada();