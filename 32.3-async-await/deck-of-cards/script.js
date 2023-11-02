document.addEventListener("DOMContentLoaded", function () {
    const drawCardButton = document.getElementById("drawCard");
    const cardInfo = document.getElementById("cardInfo");

    let deckId;
    let remainingCards = 0;

    const baseURL = 'https://deckofcardsapi.com/api/deck';

    const createDeck = async () => {
        try {
            const response = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
            deckId = response.data.deck_id;
            remainingCards = response.data.remaining;
            if (remainingCards === 0) {
                drawCardButton.disabled = true;
                cardDisplay.innerHTML = 'No more cards in the deck.';
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };
    
    const drawOneCard = async () => {
        try {
            if (remainingCards === 0) {
                cardDisplay.innerHTML = 'No more cards in the deck.';
                drawCardButton.disabled = true;
                return;
            }
            
            const response = await axios.get(`${baseURL}/${deckId}/draw/?count=1`);
            const card = response.data.cards[0];
        
            const cardValue = card.value;
            const cardSuit = card.suit;
            console.log(`Drawn Card: ${cardValue} of ${cardSuit}`);
        
            remainingCards--;
        
            if (remainingCards === 0) {
                drawCardButton.disabled = true;
                cardDisplay.innerHTML = 'No more cards in the deck.';
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };
    
    (async () => {
        await createDeck();
        drawCardButton.addEventListener("click", drawOneCard);
    })();
});