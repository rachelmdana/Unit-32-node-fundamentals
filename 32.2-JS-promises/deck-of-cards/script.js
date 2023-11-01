document.addEventListener("DOMContentLoaded", function() {
    const drawCardButton = document.getElementById("drawCard");

    let deckId;

    const baseURL = 'https://deckofcardsapi.com/api/deck';

    const createDeck = () => {
        return axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
            .then(response => {
                deckId = response.data.deck_id;
            })
            .catch(error => {
                console.log(`Error: ${error.message}`);
            });
    };

    const drawOneCard = () => {
        return axios.get(`${baseURL}/${deckId}/draw/?count=1`)
            .then(response => {
                const card = response.data.cards[0];
                const cardValue = card.value;
                const cardSuit = card.suit;
                return `${cardValue} of ${cardSuit}`;
            })
            .catch(error => {
                console.log(`Error: ${error.message}`);
            });
    };

    createDeck()
        .catch(error => {
            console.log(`Error: ${error.message}`);
        });

    drawCardButton.addEventListener("click", () => {
        drawOneCard()
            .then(card => {
                console.log(`Drawn Card: ${card}`);
            })
            .catch(error => {
                console.log(`Error: ${error.message}`);
            });
    });
});