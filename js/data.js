let load = (data) => {
    // temperatura 
    let temperature = data['hourly']['temperature_2m'][0]
    let temperaturaHTML = document.getElementById("temperature")
    temperaturaHTML.textContent = temperature + " °C";

    // UV Index
    let uv_index = data['daily']['uv_index_max'][0]
    let uv_indexHTML = document.getElementById("uv_index")
    uv_indexHTML.textContent = uv_index;

    // rain
    let rain = data['hourly']["rain"][0]
    let rainHTML = document.getElementById("rain")
    rainHTML.textContent = rain;

    // visibility
    let visibility = data['hourly']["visibility"][0]
    let visibilityHTML = document.getElementById("visibility")
    visibilityHTML.textContent = visibility;

    plot(data);
    plot2(data);

}

let plot = (data) => {

    const ctx = document.getElementById('myChart');

    const dataset = {
        labels: data.hourly.time, /* ETIQUETA DE DATOS */
        datasets: [{
            label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
            data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: dataset,
    };

    const chart = new Chart(ctx, config)
}


let plot2 = (data) => {

    const ctx = document.getElementById('myBarChart');

    const dataset = {
        labels: data.daily.time,
        datasets: [{
            label: 'Índice UV Semanal',
            data: data.daily.uv_index_max,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: dataset,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    const chart = new Chart(ctx, config)
}




(
    function () {
        let meteo = localStorage.getItem('meteo');

        if (meteo == null) {
            let URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,rain,visibility&daily=uv_index_max&timezone=auto';
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    load(data);

                    /* GUARDAR DATA EN LA MEMORIA */
                    localStorage.setItem("meteo", JSON.stringify(data));


                })
                .catch(console.error);

        } else {

            /* CARGAR DATA DESDE LA MEMORIA */
            load(JSON.parse(meteo));

        }

    }
)();