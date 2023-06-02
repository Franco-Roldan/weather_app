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
    //console.log(datos)

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
    content.style.display = 'flex';

}

const set_datos_clima_dia = dato_semana => {
    //console.log(dato_semana)

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
    //console.log(datos_proximos);

    for (let i = 0; i < 5; i++) {
        
        let hora = document.getElementById('hr_'+i);
        hora.textContent = datos_proximos[i].hora;

        let icon = document.getElementById('icon_'+i);
        icon.src = 'https://openweathermap.org/img/w/'+datos_proximos[i].icon+'.png';

        let temp = document.getElementById('temp_'+i);
        temp.textContent = datos_proximos[i].temp;
         
    }
   
    data_week(dato_semana);
}

function get_fecha(){
    let fecha = new Date();
    return `${fecha.getDate()}-${('0'+ (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
}


function icon_clima(icon){

    let icono = document.getElementById('img_icon').src = 'https://openweathermap.org/img/w/'+icon+'.png';
    return icono
}

function data_week(dato_semana){

    const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    let fecha = new String()
    let Array_fech = [];
    let fecha_hoy = new Date()
    fecha_hoy = fecha_hoy.getDay()

    let array_aux = new Array();
    let dias_semana = new Array();

    for(let i=0; i < dato_semana.list.length; i++){
 
        
        array_aux = [
            dato_semana.list[i].dt_txt.slice(0,10),
            dato_semana.list[i].dt_txt.slice(11,16),
            'https://openweathermap.org/img/w/'+dato_semana.list[i].weather[0].icon+'.png',
            (Math.round(dato_semana.list[i].main.temp) + '° C'),
            (Math.round(dato_semana.list[i].pop * 100)) + '%',
            (Math.round(dato_semana.list[i].wind.speed)) + 'Km/h'
        ];
        dias_semana.push(array_aux);
    }
    let aux = 0;
    for(let i=0; i < dias_semana.length; i++){
      
        let fecha_dia = new Date(dias_semana[i][0]);
        fecha = fecha_dia.getDay() + 1; 
        
        if(fecha != fecha_hoy){
            
            if(dias_semana[i][0] == dias_semana[i - 1][0]){
                //console.log(dias_semana[i][0]+ ' - '+dias_semana[i][1]);
                
                let ul = document.createElement('ul');
                ul.classList.add('day_data');
                for( let j = 0;j < 6; j++ ){
                    
                    if(j != 0){
                        if(j != 2){
                            const li = document.createElement('li');
                            li.textContent = dias_semana[i][j];
                            ul.appendChild(li); 
                        }else{
                            const icon = document.createElement('img');
                            icon.src = dias_semana[i][j];
                            icon.style.width = '30px';
                            icon.style.height = '30px';
                            ul.appendChild(icon);
                        }
                      
                    }
                    
                }
                const day = document.getElementById('day_'+aux);
                day.appendChild(ul);


            }else{
                switch (fecha) {
                    case fecha_hoy + 1:
                        aux = 0;
                        break;
                    case fecha_hoy + 2:
                        aux = 1;
                        break;                
                    case fecha_hoy + 3:
                        aux = 2;
                        break;
                    case fecha_hoy + 4:
                        aux = 3;
                        break;
                    case fecha_hoy + 5:
                        aux = 4;
                    default:
                        aux++
                        break;
                }

                //console.log( 'p'+aux + ' - '+dias[fecha] + ' - '+fecha);
                if(fecha == 7){
                    fecha = 0;
                }
                let p = document.getElementById('p'+aux);
            
                p.textContent = dias[fecha];
            
                let ul = document.createElement('ul');
                ul.classList.add('day_data');
                for( let j = 0;j < 6; j++ ){
                    
                    if(j != 0){
                        if(j != 2){
                            const li = document.createElement('li');
                            li.textContent = dias_semana[i][j];
                            ul.appendChild(li); 
                        }else{
                            const icon = document.createElement('img');
                            icon.src = dias_semana[i][j];
                            icon.style.width = '30px';
                            icon.style.height = '30px';
                            ul.appendChild(icon);
                        }
                      
                    }
                    
                }
                const day = document.getElementById('day_'+aux);
                day.appendChild(ul);
            }
            

           
                
            
        }

    
        

    }


    //console.log(dias_semana);

}


const Onload = () => {
    navigator.geolocation.getCurrentPosition(datos_clima);
}

// let fech = new Date(2023, 3, 25)



// console.log(dias[fech.getDay()])