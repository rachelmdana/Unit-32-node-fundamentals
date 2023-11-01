function getNumberFact(number) {
    return axios.get(`http://numbersapi.com/${number}?json`)
        .then((response) => response.data.text);
}

const factPromises = [];

for (let i = 0; i < 4; i++) {
    factPromises.push(getNumberFact(13));
}

Promise.all(factPromises)
    .then(facts => {
        facts.forEach(fact => {
            console.log(fact);
        });
    })
    .catch(err => console.error(err));
