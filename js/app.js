const API_key = '5dd2d9003c1bef8bc95f39d2b5b50327';

const datos_clima = position => {

    const {latitude , longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${API_key}`)
        .then(respuesta => respuesta.json())
        .then(datos => set_datos_clima(datos));

}

const set_datos_clima = datos => {
    console.log(datos)


    const datos_api = {
        ubi: datos.name,
        descripcion: datos.weather[0].description,
        humedad: ('Humedad: ' + datos.main.humidity + '%'),
        presion: ('Presión: ' + datos.main.pressure + 'Pa'),
        viento: ('Viento: ' + datos.wind.speed + 'm/s'),
        temperatura: (datos.main.temp + '° C'),
        fecha: get_fecha()
    }
    Object.keys(datos_api).forEach(key => {
        document.getElementById(key).textContent = datos_api[key]
    })
    icon_clima(datos.weather[0].icon);

    const content = document.getElementById('content');
    const carga = document.getElementById('loader');
    carga.style.display = 'none';
    content.style.display = 'block';

}

function get_fecha(){
    let fecha = new Date();
    return `${fecha.getDate()}-${('0'+ (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
}

const Onload = () => {
    navigator.geolocation.getCurrentPosition(datos_clima);
}

function icon_clima(icon){

    let icono = document.getElementById('img_icon').src = 'http://openweathermap.org/img/w/'+icon+'.png';
    return icono
}
function Km_h(m_s){
    
}