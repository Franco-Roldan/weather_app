
const API_key = '5dd2d9003c1bef8bc95f39d2b5b50327';
const city = 'Barcelona';
const datos_clima = position => {
    
     const {latitude , longitude} = position.coords;
    //  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`)
    //      .then(search_data => search_data.json())
    //      .then(respuesta => console.log(respuesta));
    
     //peticion a la api de los datos en el momento, lo devuelve en formato json
     fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${API_key}`)
         .then(respuesta => respuesta.json())
         .then(datos => set_datos_clima_ahora(datos));
     // peticion a la api de los datos de los proxiomos 5 dias.
     fetch(`https://api.openweathermap.org/data/2.5/forecast?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${API_key}`)
         .then(res_semana => res_semana.json())
         .then(dato_semana => set_datos_clima_dia(dato_semana))

 }
// recolecto del json los datos de interes y los muestro por pantalla

function clima_ahora(datos){
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
    // tanto las keys del objeto datos_api como los id de las etiquetas en el HTML son iguales
    // por lo tanto itero el objeto y inserto los valores en su lugar correspondiente 
    Object.keys(datos_api).forEach(key => {
        document.getElementById(key).textContent = datos_api[key]
    })
    icon_clima(datos.weather[0].icon);

}

const set_datos_clima_ahora = datos => {
    //console.log(datos)
    clima_ahora(datos);

}
// proximos datos dentro del mismo dia.
const set_datos_clima_dia = dato_semana => {
    //console.log(dato_semana)
    // 
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
    // iteramos e insertamos en el DOM
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

function get_fecha(){ // formato de fecha
    let fecha = new Date();
    return `${fecha.getDate()}-${('0'+ (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
}


function icon_clima(icon){

    let icono = document.getElementById('img_icon').src = 'https://openweathermap.org/img/w/'+icon+'.png';
    return icono
}
// datos de la semana
function data_week(dato_semana){

    
    const day_name = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
    let fecha = new String()

    let fecha_hoy = new Date()
    fecha_hoy = fecha_hoy.getDay()

    let array_aux = new Array();
    let days_array = new Array(); 
    let dias_semana = new Array();

    for(let i=0; i < dato_semana.list.length; i++){

        // lapso de tiempo de 3 horas
        array_aux = [
            dato_semana.list[i].dt_txt.slice(0,10), // fecha
            dato_semana.list[i].dt_txt.slice(11,16), // hora
            'https://openweathermap.org/img/w/'+dato_semana.list[i].weather[0].icon+'.png', // icono
            (Math.round(dato_semana.list[i].main.temp) + '° C'), // temp
            (Math.round(dato_semana.list[i].pop * 100)) + '%', // prob de lluvia
            (Math.round(dato_semana.list[i].wind.speed)) + 'Km/h' // viento
        ];
        dias_semana.push(array_aux); 
    }
    
    for(let i = 0; i < dias_semana.length; i++){
        const day_date = new Date(dias_semana[i][0]);
        if(day_date.getDay() +1 != fecha_hoy){
 
            if(i == 0){
                days_array.push(day_name[day_date.getDay()]);
            }else{
                if(dias_semana[i][0] === dias_semana[i-1][0]){
                    if(days_array.indexOf(day_name[day_date.getDay()]) < 0){
                        
                        // let day_date = new Date(dias_semana[i][0])
                        // days_array.push(day_name[day_date.getDay()+1]);
                        days_array.push(day_name[day_date.getDay()]);
                    }
                } 
            }
        }
     
    }
    console.log(days_array);

    let i = 0;
    days_array.forEach(() => {
        const p = document.getElementById('p'+i);
        p.textContent = days_array[i];
        i++;
    })


    //console.log(dias_semana);
    let aux = 0;
    let fecha_init = new Date(dias_semana[0][0]);
    fecha_init = fecha_init.getDay() + 1;
    //console.log(fecha_init, fecha_hoy);
    for(let i=0; i < dias_semana.length; i++){

        let fecha_dia = new Date(dias_semana[i][0]);
        fecha = fecha_dia.getDay() + 1; 
        
        if(fecha != fecha_hoy){ // si la fecha del dato es distinta a la de hoy
            
            if(fecha_init == (fecha_hoy + 1)){
                dias_semana.unshift([dias_semana[i][0]]);
                fecha_init = 0;
                aux=0;
                i++;
            }
           
            if(dias_semana[i][0] == dias_semana[i - 1][0]){ // si la fecha del dato es igual a la fecha anterior
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
                console.log('day_'+aux);
                const day = document.getElementById('day_'+aux);
                day.appendChild(ul);


            }else{

                if(fecha_init == 0){
                    let p = document.getElementById('p0');
                    p.textContent = day_name[fecha_hoy+1];
                    fecha_init =1;
                }
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
                        break;
                    default:
                        aux++;
                        break;
                }

                //console.log( 'p'+aux + ' - '+dias[fecha] + ' - '+fecha);
                //console.log(fecha, aux)
                
                //console.log('p'+aux);
      
                
                //console.log(dias[fecha], dias_semana[i][0])
     
            
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

    // una vez cargado todo el contenido oculto el simbolo de carga y muestro el contenido
    const content = document.getElementById('content');
    const carga = document.getElementById('loader');
    carga.style.display = 'none';
    content.style.display = 'flex';
}


const Onload = () => {
    navigator.geolocation.getCurrentPosition(datos_clima);
}

