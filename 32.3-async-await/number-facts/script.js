const baseURL = 'http://numbersapi.com';

// async function getNumberFact(number) {
//     try {
//         const response = await axios.get(`${baseURL}/${number}?json`);
//         return response.data.text;
//     } catch (error) {
//         console.log('Error:', error);
//     }
// }

async function getMultipleFacts(numbers, count) {
    try {
        const responses = await Promise.all(
            numbers.map(number =>
                axios.get(`${baseURL}/${number}/?json&amount=${count}`)
            )
        );

        return responses.map(response => response.data);
    } catch (error) {
        console.log('Error:', error);
    }
}

async function displayFacts() {
    const favNumbers = [7, 13, 44]; 
    const numFacts = 4;

    const facts = await getMultipleFacts(favNumbers, numFacts);
    console.log('Facts:', facts);
    const factsContainer = document.getElementById('number-facts');

    for (const numberFacts of facts) {
        if (Array.isArray(numberFacts)) {
            const factTexts = numberFacts.map(fact => fact.text);
            const number = numberFacts[0].number;
            const numFactsText = factTexts.map((factText, index) => `Fact ${index + 1}: ${factText}`).join('\n');
            const factElement = document.createElement("div");
            factElement.textContent = `Facts for Number ${number}:\n${numFactsText}`;
            factsContainer.appendChild(factElement);
        }
    }
}

displayFacts();