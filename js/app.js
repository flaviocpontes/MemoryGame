let gameState = {
    board: [
        {symbolClass: "fa-diamond", matched: false, revealed: false},
        {symbolClass: "fa-diamond", matched: false, revealed: false},
        {symbolClass: "fa-paper-plane-o", matched: false, revealed: false},
        {symbolClass: "fa-paper-plane-o", matched: false, revealed: false},
        {symbolClass: "fa-anchor", matched: false, revealed: false},
        {symbolClass: "fa-anchor", matched: false, revealed: false},
        {symbolClass: "fa-bolt", matched: false, revealed: false},
        {symbolClass: "fa-bolt", matched: false, revealed: false},
        {symbolClass: "fa-cube", matched: false, revealed: false},
        {symbolClass: "fa-cube", matched: false, revealed: false},
        {symbolClass: "fa-leaf", matched: false, revealed: false},
        {symbolClass: "fa-leaf", matched: false, revealed: false},
        {symbolClass: "fa-bicycle", matched: false, revealed: false},
        {symbolClass: "fa-bicycle", matched: false, revealed: false},
        {symbolClass: "fa-bomb", matched: false, revealed: false},
        {symbolClass: "fa-bomb", matched: false, revealed: false}
    ],
    firstCard: null,
    secondCard: null
};

function appendCardToBoard(board, card, index){
    let cardElement = '<li id="card' + index + '" class="card"><i class="fa ' + card.symbolClass + '"></i></li>';

    board.append(cardElement)
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function updateBoard(clickedCard) {
    let cardIndex = Number(clickedCard.id.slice(4,6));
    let stateCard = gameState.board[cardIndex];
    stateCard.revealed = true;

    if (stateCard.revealed === true) {
        $(clickedCard).addClass("open show");
    }
}


function initBoard(gamestate) {
    let board = $('.deck');
    shuffle(gameState.board);

    gamestate.board.forEach(function (card, index) {
        appendCardToBoard(board, card, index)
    });

    board.on('click', 'li', function(){
        let clickedCard = $(this)[0];
        updateBoard(clickedCard);
    });

}

initBoard(gameState);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
