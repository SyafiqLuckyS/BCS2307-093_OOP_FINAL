const activities = {
    sunny: [
        {
            name: "Scuba Diving",
            image: "https://wallpapers.com/images/hd/scuba-diving-with-silver-fishes-uktw6k4uimc2qncm.jpg",
            description: "Explore the underwater world and discover colorful marine life."
        },
        {
            name: "Hiking",
            image: "https://img.freepik.com/premium-photo/outdoor-adventure-with-people-hiking-scenic-landscape-adventurous-style-wide-shot-vibrant-colors_248779-3018.jpg",
            description: "Enjoy breathtaking views and fresh air while hiking through scenic trails."
        },
        {
            name: "Beach Volleyball",
            image: "https://www.shutterstock.com/shutterstock/videos/1055634659/thumb/6.jpg?ip=x480",
            description: "Play a fun game of beach volleyball with friends on a sunny day."
        },
        {
            name: "Picnic in the Park",
            image: "https://st5.depositphotos.com/1829243/70606/i/450/depositphotos_706063998-stock-photo-big-family-sitting-picnic-blanket.jpg",
            description: "Relax and enjoy a delightful picnic surrounded by nature."
        },
    ],
    rainy: [
        {
            name: "Indoor Rock Climbing",
            image: "https://cdn.outsideonline.com/wp-content/uploads/2018/09/24/ee-gym-cover_s.jpg",
            description: "Challenge yourself with rock climbing at an indoor climbing gym."
        },
        {
            name: "Visiting a Museum",
            image: "https://images.pexels.com/videos/7986423/apartment-art-chair-collection-7986423.jpeg",
            description: "Explore fascinating exhibits and learn about history and culture."
        },
        {
            name: "Cooking Class",
            image: "https://www.shutterstock.com/shutterstock/videos/1090743727/thumb/1.jpg?ip=x480",
            description: "Join a cooking class and learn to prepare delicious dishes."
        },
        {
            name: "Movie Marathon",
            image: "https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-bunch-of-teenagers-enjoying-a-3d-movie-marathon-at-home-image_3761072.jpg",
            description: "Cozy up at home and binge-watch your favorite movies."
        },
    ],
    snowy: [
        {
            name: "Skiing",
            image: "https://images.alphacoders.com/462/thumb-1920-462944.jpg",
            description: "Hit the slopes for an exhilarating day of skiing."
        },
        {
            name: "Building a Snowman",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgC5JxlsE_2IvtlefCieLT1e8iDZcZKVlRzw&s",
            description: "Gather your friends and create the perfect snowman."
        },
        {
            name: "Ice Skating",
            image: "https://todaysparent.mblycdn.com/tp/resized/2017/01/1600x900/what-to-know-when-teaching-your-toddler-to-ice-skate-1280x960.jpg",
            description: "Glide across the ice and enjoy a fun day of ice skating."
        },
        {
            name: "Snowshoeing",
            image: "https://traventuria.com/wp-content/uploads/2016/10/snowshoeing-bulgaria-1.jpg",
            description: "Explore snowy landscapes while snowshoeing through nature trails."
        },
    ],
    cloudy: [
        {
            name: "Photography",
            image: "https://img.freepik.com/free-photo/portrait-senior-man-with-camera-device-world-photography-day-celebration_23-2151657243.jpg",
            description: "Capture beautiful moments and scenery with your camera."
        },
        {
            name: "Reading a Book",
            image: "https://img.pikbest.com/ai/illus_our/20230413/d05bedaec4f67d4313b0c6e872de3858.jpg",
            description: "Get lost in a good book while enjoying a cozy atmosphere."
        },
        {
            name: "Board Games Night",
            image: "https://images.stockcake.com/public/8/9/7/897606b2-0e74-45b4-9740-31363b739566_large/family-game-night-stockcake.jpg",
            description: "Gather friends for an entertaining board games night."
        },
        {
            name: "Art and Craft Session",
            image: "https://images.squarespace-cdn.com/content/v1/5a0acf45aeb625c125bc9c6b/8c22f9b1-38b1-44f6-95e9-095d8db234d5/Arts+%26+Craft+workshop",
            description: "Unleash your creativity with an art and craft session at home."
        },
    ],
};

function buttonClicked() {    
    const city = document.getElementById("city_input").value;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            document.getElementById("title1").innerHTML = `${data.location.name}`;
            document.getElementById("title2").innerHTML = `${data.location.name}`;
            document.getElementById("title3").innerHTML = `${data.location.name}`;
            document.getElementById("main1").innerHTML = `Location Name: ${data.location.name}`;
            document.getElementById("main2").innerHTML = `Region: ${data.location.region}`;
            document.getElementById("main3").innerHTML = `Country: ${data.location.country}`;
            document.getElementById("main4").innerHTML = `Local Time: ${data.location.localtime}`;
            document.getElementById("main5").innerHTML = `Current Temperature: ${data.current.temp_c} °C`;
            document.getElementById("main6").innerHTML = `Forecast Temperature: ${data.forecast.forecastday[0].day.avgtemp_c} °C`;
            document.getElementById("main7").innerHTML = `<img src="https:${data.current.condition.icon}" alt="">`;
            document.getElementById("main8").innerHTML = `Wind Speed: ${data.current.wind_mph} mph`;
            document.getElementById("main9").innerHTML = `Humidity: ${data.current.humidity}%`;
            document.getElementById("main10").innerHTML = `Weather Condition: ${data.forecast.forecastday[0].day.condition.text}`;
            document.getElementById("main11").innerHTML = `Chances of Rain: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
            document.getElementById("main12").innerHTML = `Chances of Snow: ${data.forecast.forecastday[0].day.daily_chance_of_snow}%`;
            
            const weatherCondition = data.forecast.forecastday[0].day.condition.text.toLowerCase();
            let conditionKey = 'sunny'; 
            
            if (weatherCondition.includes('rain')) {
                conditionKey = 'rainy';
            } else if (weatherCondition.includes('snow')) {
                conditionKey = 'snowy';
            } else if (weatherCondition.includes('cloud')) {
                conditionKey = 'cloudy';
            }

            displayActivities(conditionKey);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Failed to retrieve weather data. Please check your input and try again.");
        });
}

function displayActivities(weatherCondition) {
    const activityList = document.getElementById("activity-list");
    activityList.innerHTML = ""; 

    const recommendedActivities = activities[weatherCondition] || [];

    recommendedActivities.forEach(activity => {
        const activityDiv = document.createElement("div");
        activityDiv.className = "activity";

        const img = document.createElement("img");
        img.src = activity.image;
        img.alt = activity.name;

        const p = document.createElement("p");
        p.textContent = activity.name;

        const description = document.createElement("p2");
        description.textContent = activity.description; 
        description.className = "activity-description"; 

        activityDiv.appendChild(img);
        activityDiv.appendChild(p);
        activityDiv.appendChild(description); 
        activityList.appendChild(activityDiv);
    });
}
