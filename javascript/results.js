//Sign-up for your own APIKey for it to work. left this here knowingly for practice purposes
const apiKey = "at_cKw6PdKNTWK7HpsU8D1PnHVvHTc5b"; 

const searchInput =  document.querySelector('#ip-address').value;
const ipAddress = document.querySelector('#ipaddress');
const myLocation = document.querySelector('#location');
const timeZone = document.querySelector('#timezone');
const isp = document.querySelector('#isp');
const searchButton = document.querySelector('#search-btn')

const url =`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${searchInput}`;


//fetch our API and associate it with an onclick Event.
const apiResults = () => {

    fetch(url)
    .then( response => response.json())
    .then(response => {
        //Add IP validation here before it can allow the output below
        ipAddress.innerHTML = response.ip;
        myLocation.innerHTML = `${response.location.region}, ${response.location.country}`;
        timeZone.innerHTML = `UTC ${response.location.timezone}`;
        isp.innerHTML = response.isp;

        displayMap(response);

    })
    .catch(error => console.log(error));
   
}

//Work on the Map to be viewed with in our page.
// Please note this is code from the Documentation of the map.
const map = L.map('map').setView([51.505, -0.09], 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([51.5, -0.09]).addTo(map)
    .bindPopup(`The location is London <br>Latitude: ${51.505} <br> Longitude: ${-0.09}`)
    .openPopup();

//Function to display out Map
const displayMap =(response) => {
    const lng = `${response.location.lng}`;
    const lat = `${response.location.lat}`;

    map.setView([lat, lng],13);

    marker = L.marker([lat, lng]).addTo(map)
    .bindPopup(`The location is ${response.location.city} <br>Latitude: ${lat} <br> Longitude: ${lng}`)
    .openPopup()


}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    apiResults();

});
