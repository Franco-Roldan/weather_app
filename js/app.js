const API_key = '5dd2d9003c1bef8bc95f39d2b5b50327';

const datos_clima = position => {

    const {latitude , longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${API_key}`)
        .then(respuesta => respuesta.json())
        .then(datos => set_datos_clima_ahora(datos));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${API_key}`)
        .then(res_semana => res_semana.json())
        .then(dato_semana => set_datos_clima_dia(dato_semana))

}

const set_datos_clima_ahora = datos => {
    console.log(datos)

    let temp_redondeada = Math.round(datos.main.temp);
    

    const datos_api = {
        ubi: datos.name,
        descripcion: datos.weather[0].description,
        humedad: ('Humedad: ' + datos.main.humidity + '%'),
        presion: ('Presión: ' + datos.main.pressure + 'Pa'),
        viento: ('Viento: ' + datos.wind.speed + ' Km/h'),
        temperatura: (temp_redondeada + '° C'),
        fecha: get_fecha(),
        sensacion: ('Sensación térmica: ' + Math.round(datos.main.feels_like)+'° C')
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

const set_datos_clima_dia = dato_semana => {
    console.log(dato_semana)

    const datos_proximos = {
        0:{
            hora: dato_semana.list[0].dt_txt.slice(11,16),
            icon: dato_semana.list[0].weather[0].icon,
            temp: (Math.round(dato_semana.list[0].main.temp) + '° C')
        },
        1:{
            hora: dato_semana.list[1].dt_txt.slice(11,16),
            icon: dato_semana.list[1].weather[0].icon,
            temp: (Math.round(dato_semana.list[1].main.temp) + '° C')
        },
        2:{
            hora: dato_semana.list[2].dt_txt.slice(11,16),
            icon: dato_semana.list[2].weather[0].icon,
            temp: (Math.round(dato_semana.list[2].main.temp) + '° C')
        },
        3:{
            hora: dato_semana.list[3].dt_txt.slice(11,16),
            icon: dato_semana.list[3].weather[0].icon,
            temp: (Math.round(dato_semana.list[3].main.temp) + '° C')
        },
        4:{
            hora: dato_semana.list[4].dt_txt.slice(11,16),
            icon: dato_semana.list[4].weather[0].icon,
            temp: (Math.round(dato_semana.list[4].main.temp) + '° C')
        }
    }
    console.log(datos_proximos);

    for (let i = 0; i < 5; i++) {
        
        let hora = document.getElementById('hr_'+i);
        hora.textContent = datos_proximos[i].hora;

        let icon = document.getElementById('icon_'+i);
        icon.src = 'https://openweathermap.org/img/w/'+datos_proximos[i].icon+'.png';

        let temp = document.getElementById('temp_'+i);
        temp.textContent = datos_proximos[i].temp;
         
    }
   
}

function get_fecha(){
    let fecha = new Date();
    return `${fecha.getDate()}-${('0'+ (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
}

const Onload = () => {
    navigator.geolocation.getCurrentPosition(datos_clima);
}

function icon_clima(icon){

    let icono = document.getElementById('img_icon').src = 'https://openweathermap.org/img/w/'+icon+'.png';
    return icono
}
