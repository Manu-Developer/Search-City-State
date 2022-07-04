const searchInput = document.querySelector(".form__search");
const suggestions = document.querySelector(".form__suggestions");

let cities = [];
const endPoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

fetch(endPoint)
	.then((data) => data.json())
	.then((data) => cities.push(...data));

const findMatches = (wordMatch, cities) => {
	const REGEX = new RegExp(wordMatch, "gi");
	return cities.filter((place) => place.city.match(REGEX) || place.state.match(REGEX));
};

const displayMatches = (e) => {
	const inputValue = e.target.value;
	const REGEX = new RegExp(inputValue, "gi");
	const matchResults = findMatches(inputValue, cities);

	const HTML = matchResults
		.map((place) => {
			const cityName = place.city.replace(REGEX, `<span class="highLight">${inputValue}</span>`);
			const stateName = place.state.replace(REGEX, `<span class="highLight">${inputValue}</span>`);

			return `
        		<li class="form__item">
            		<span class="item__name">${cityName}, ${stateName}</span>
            		<span class="item__population">Population: ${place.population}</span>
        		</li>
        	`;
		})
		.sort((placeOne, placeTwo) => placeOne.population - placeTwo.population)
		.join("");

	suggestions.innerHTML = HTML;

	if (searchInput.value === "") {
		suggestions.innerHTML = "";
	}
};

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
