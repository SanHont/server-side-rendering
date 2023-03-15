import express from 'express'

// Haalt de API op
const urls = [
    "https://raw.githubusercontent.com/fdnd-agency/ultitv/main/api/game/943.json",
    "https://raw.githubusercontent.com/fdnd-agency/ultitv/main/api/game/943/statistics.json",
    "https://raw.githubusercontent.com/fdnd-agency/ultitv/main/api/facts/Player/8607.json"
];

// Maakt een nieuwe express app aan
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Maak een route voor de index
app.get("/", async function (request, response) {
    const [data1, data2, data3] = await Promise.all(urls.map(fetchJson));
    const data = { data1, data2, data3 };
    response.render("index", data);
});

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error)
}
