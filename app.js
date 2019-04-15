// loading after page is loaded

window.addEventListener('load', () => {
  let lat;
  let long ;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperaturedegree = document.querySelector(".temperature_degree");
  let locationTimezone = document.querySelector(".locationTimezone");

// accesing local location via browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const key = `9b898a3c64797b78b02d5570abaeddb9`;
      const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`;

      // fetching data
      fetch(api)
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data);
          let { temperature, summary} = data.currently;
          temperaturedegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
        });
    })
    // temperature-degree = data.currently.temperature;
  } else {
    console.log('geo location not supported with your system');
  }
});
