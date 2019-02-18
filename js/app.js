let config = {
    hideDelay: 500
};

let gameState = {
    board: [
        {symbolClass: "fa-diamond", matched: false, revealed: false, index: null},
        {symbolClass: "fa-diamond", matched: false, revealed: false, index: null},
        {symbolClass: "fa-paper-plane-o", matched: false, revealed: false, index: null},
        {symbolClass: "fa-paper-plane-o", matched: false, revealed: false, index: null},
        {symbolClass: "fa-anchor", matched: false, revealed: false, index: null},
        {symbolClass: "fa-anchor", matched: false, revealed: false, index: null},
        {symbolClass: "fa-bolt", matched: false, revealed: false, index: null},
        {symbolClass: "fa-bolt", matched: false, revealed: false, index: null},
        {symbolClass: "fa-cube", matched: false, revealed: false, index: null},
        {symbolClass: "fa-cube", matched: false, revealed: false, index: null},
        {symbolClass: "fa-leaf", matched: false, revealed: false, index: null},
        {symbolClass: "fa-leaf", matched: false, revealed: false, index: null},
        {symbolClass: "fa-bicycle", matched: false, revealed: false, index: null},
        {symbolClass: "fa-bicycle", matched: false, revealed: false, index: null},
        {symbolClass: "fa-bomb", matched: false, revealed: false, index: null},
        {symbolClass: "fa-bomb", matched: false, revealed: false, index: null}
    ],
    revealed: null
};

function appendCardToBoard(board, card, index){
    let cardElement = '<li id="card' + index + '" class="card"><i class="fa ' + card.symbolClass + '"></i></li>';
    card.index = index;
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

function revealCard(clickedCard, stateCard) {
    if (!stateCard.revealed === true) {
        stateCard.revealed = true;
        $(clickedCard).addClass("open show");
    }
}

function hideCard(card) {
    card.revealed = false;
    $($('#card' + card.index)[0]).removeClass("open show");
}


function populateBoard(gamestate, board) {
    shuffle(gameState.board);
    gamestate.board.forEach(function (card, index) {
        appendCardToBoard(board, card, index)
    });
}

function secondCard(gamestate) {
    return gamestate.revealed !== null;
}

function matchCards(stateCard, revealedCard) {
    stateCard.matched = true;
    revealedCard.matched = true;
    $($('#card' + stateCard.index)[0]).addClass('match');
    $($('#card' + revealedCard.index)[0]).addClass('match');
}

function hideCards(revealedCard, stateCard) {
    setTimeout(function () {
        hideCard(revealedCard);
        hideCard(stateCard);
    }, config.hideDelay);
}

function try_match(gamestate, stateCard) {
    revealedCard = gamestate.revealed;
    if (stateCard.symbolClass === revealedCard.symbolClass) {
        matchCards(stateCard, revealedCard);
    } else {
        hideCards(revealedCard, stateCard);
    }
}

function initBoard(gamestate) {
    let board = $('.deck');

    populateBoard(gamestate, board);

    board.on('click', 'li', function(){
        let boardCard = $(this)[0];
        let stateCard = gameState.board[Number(boardCard.id.slice(4, 6))];
        revealCard(boardCard, stateCard);
        if (secondCard(gamestate)) {
            try_match(gamestate, stateCard);
            gamestate.revealed = null;
        } else {
            gameState.revealed = stateCard;
        }
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
