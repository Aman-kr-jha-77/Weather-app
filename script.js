const container = document.getElementById('theme');
const ball = document.getElementById('ball');
const isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
if (isDarkMode) {
    darkTheme();
    ball.classList.toggle('active');
}
else {
    lightTheme();
}

function darkTheme() {
    container.style.backgroundColor = 'black';
    document.querySelector('body').style.backgroundColor = '#000';
    document.querySelector('input').style.backgroundColor = '#000';
    document.querySelector('.bi-moon-fill').style.display = "none";
    document.querySelector('.bi-sun-fill').style.display = "inline-block";
    document.querySelector('input').style.color = '#fff';
    document.querySelector('.sun').style.background = '#000';
    document.querySelector('button').style.backgroundColor = '#000';
    document.getElementById('card').style.background = 'linear-gradient(1deg, #1a0f43, #0e4a5d)';
    

    const boxes = document.querySelectorAll('.col');
    boxes.forEach(box => {
        box.style.backgroundColor = "#000";
    });
   
}
function lightTheme() {
    container.style.backgroundColor = 'white';
    document.querySelector('body').style.backgroundColor = '#fff';
    document.querySelector('.bi-sun-fill').style.display = "none";
    document.querySelector('.bi-moon-fill').style.display = "inline-block";
    document.querySelector('input').style.backgroundColor = '#fff';
    document.querySelector('input').style.color = '#000';
    document.querySelector('.sun').style.background = '#fff';
    document.querySelector('button').style.backgroundColor = '#fff';
    document.getElementById('card').style.background = 'linear-gradient(150deg, #200b6d, #0da5d3)';

    const boxes = document.querySelectorAll('.col');
    boxes.forEach(box => {
        box.style.backgroundColor = "#fff";
    });
}
function changeTheme() {
    let on = ball.classList.toggle('active');

    if (on) {
        darkTheme();
    } else {
        lightTheme();
    }
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log(showPosition);
    } else {
       console.log( "Geolocation is not supported by this browser.");  
    }
}
function showPosition(position) {
    console.log(position);

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = "24c41010156318ecc42c2787dff5e6a9";

    if (!lat || !lon) {
        document.getElementById('city').value = "Please enter both latitude and longitude.";
        return;
    }

    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.length > 0) {
                const locationName = `${data[0].name}, ${data[0].state}`;
                document.getElementById('city').value = ` ${locationName}`;
            } else {
                document.getElementById('city').value = "No location found for these coordinates.";
            }
        })
        .catch(error => {
            document.getElementById('city').value = `Error: ${error.message}`;
        })
}
function checkWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        document.getElementById('cityName').innerHTML = 'Please enter a city name!';
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=24c41010156318ecc42c2787dff5e6a9&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod === 200) {
                const sunset = data.sys.sunset;
                const sunrise = data.sys.sunrise;
                document.getElementById('temp').innerHTML = parseInt(data.main.temp) + `°`;
                document.getElementById('Pressure').innerHTML = data.main.pressure;
                document.getElementById('humidity').innerHTML = data.main.humidity;
                document.getElementById('speed').innerHTML = (data.wind.speed * 3.6).toFixed(2);
                document.querySelector('.overAll').innerHTML = data.weather[0].main;
                document.querySelector('.discription').innerHTML = data.weather[0].description;
                document.querySelector('.feels').innerHTML = `Feels like ${parseInt(data.main.feels_like)}°`;
                if (data.weather[0].main == 'Clear') {
                    document.getElementById('weatherIcon').classList.toggle('bi-sun');
                }
                else if (data.weather[0].main == 'Thunderstorm') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-lighting');
                }
                else if (data.weather[0].main == 'Drizzle') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-drizzle');
                }
                else if (data.weather[0].main == 'Rain') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-rain');
                }
                else if (data.weather[0].main == 'Snow') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-snow');
                }
                else if (data.weather[0].main == 'Clouds') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud');
                }
                else if (data.weather[0].main == 'Mist') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-fog');
                }
                else if (data.weather[0].main == 'Smoke') {
                    document.getElementById('weatherIcon').classList.toggle('bi-wind');
                }
                else if (data.weather[0].main == 'Haze') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-haze');
                }
                else if (data.weather[0].main == 'Dust') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-haze2');
                }
                else if (data.weather[0].main == 'Fog') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-fog');
                }
                else if (data.weather[0].main == 'Sand') {
                    document.getElementById('weatherIcon').classList.toggle('bi-wind');
                }
                else if (data.weather[0].main == 'Ash') {
                    document.getElementById('weatherIcon').classList.toggle('bi-cloud-haze2');
                }
                else if (data.weather[0].main == 'Squall') {
                    document.getElementById('weatherIcon').classList.toggle('bi-wind');
                }
                else if (data.weather[0].main == 'Tornado') {
                    document.getElementById('weatherIcon').classList.toggle('bi-tornado');
                }
                 setTimeout(function setAndrise() {
                   const sunRisehour = new Date(sunrise * 1000).getHours();
                   const sunRisemin = new Date(sunrise * 1000).getMinutes();
                   const sunSethour = new Date(sunset * 1000).getHours();
                   const sunSetmin = new Date(sunset * 1000).getMinutes();
                   if (sunRisemin < 10) {
                       document.getElementById('sunrise').innerText = `0${sunRisehour}:0${sunRisemin}`
                   }
                   if(sunRisemin > 9) {
                       document.getElementById('sunrise').innerText = `0${sunRisehour}:${sunRisemin}`
                   }
                   if (sunSetmin < 10) {
                       document.getElementById('sunset').innerText = `${sunSethour}:0${sunSetmin}`
                   }
                   if(sunSetmin > 9) {
                       document.getElementById('sunset').innerText = `${sunSethour}:${sunSetmin}`
                   }
                 }, 1000);      
                setInterval(function sunArc() {
                    const sunriseInSeconds = new Date(sunrise * 1000).getHours() * 3600 + new Date(sunrise * 1000).getMinutes() * 60 + new Date(sunrise * 1000).getSeconds();
                    const sunsetInSeconds = new Date(sunset * 1000).getHours() * 3600 + new Date(sunset * 1000).getMinutes() * 60 + new Date(sunset * 1000).getSeconds();
                    const totalDaylight = sunsetInSeconds - sunriseInSeconds;
                    const now = new Date();
                    const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
                    const elapsedTimeSinceSunrise = currentSeconds - sunriseInSeconds;
                    if (elapsedTimeSinceSunrise < 0 || elapsedTimeSinceSunrise > totalDaylight) {
                        console.log("Sun is not in the sky.");
                        return;
                    }
                    const sunAngle = (elapsedTimeSinceSunrise / totalDaylight) * 180 - 90;
                    const arc = document.getElementById('sunAxis');
                    const Suncovers = document.getElementById('mainSunBox');
                    arc.style.transform = `rotate(${sunAngle}deg)`;
                    const sunBall = document.querySelector('.sunball');
                    const ActualAngle = (((sunAngle + 90) / 180) * 100) 
                    if (sunAngle < -90 || sunAngle > 90) {
                        sunBall.style.backgroundColor = "yellow";
                        Suncovers.style.background = "transparent"
                    } else {
                        sunBall.style.backgroundColor = "yellow";
                        Suncovers.style.background = `linear-gradient(to right, skyblue ${ActualAngle}%,transparent 10%)`
                    }
                }, 1000);               
            } else {
                document.getElementById('temp').innerHTML = ``;
                document.getElementById('cityName').innerHTML = `Something went wrong!`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('network error occurred!');
        });
}
function EnterPressed(e) {
    if (e.key === 'Enter') {
        checkWeather();
    }
}
document.getElementById('search').addEventListener('click', checkWeather);
window.addEventListener('load', function () {
    getLocation();
    setTimeout(checkWeather, 2000);
});
document.querySelector('input').addEventListener('keydown', EnterPressed);


