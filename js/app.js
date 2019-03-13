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
    revealed: null,
    moves: 0,
    timer: null,
    gameTime: 0
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

function resetState(gameState) {
    shuffle(gameState.board);
    gameState.board.forEach(function (card) {
        card.revealed = false;
        card.matched = false;
    });
    gameState.revealed = false;
    gameState.moves = 0;
}

function removeCardsFromBoard(board) {
    board.empty()
}


function populateBoard(gameState, board) {
    gameState.board.forEach(function (card, index) {
        appendCardToBoard(board, card, index)
    });
}

function resetTimer() {
    clearInterval(gameState.timer);
    gameState.timer = null;
}

function resetGame(gameState, board) {
    resetState(gameState);
    removeCardsFromBoard(board);
    populateBoard(gameState, board);
    updateMoves(gameState);
    resetTimer(gameState);
}

function isSecondCard(gameState) {
    return gameState.revealed;
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

function allCardsAreMatched(gameState) {
    result = true;
    gameState.board.forEach(function (card) {
        if (!card.matched) {
            result = false;
        }
    });
    return result;
}

function updateModalText() {

}

function displayModal() {
    $('.overlay').css('display', 'block');
}

function hideModal() {
    $('.overlay').css('display', 'none');
}

function gameOver() {
    resetTimer();
    updateModalText();
    displayModal();
}

function updateMoves(gameState) {
    $('.moves').text(gameState.moves);
}

function updateBoardTime(gameState) {
    $('.timer').text(gameState.gameTime);
}

function initBoard(gameState) {
    let board = $('.deck');

    resetGame(gameState, board);

    board.on('click', 'li', function(){
        let boardCard = $(this)[0];
        let stateCard = gameState.board[Number(boardCard.id.slice(4, 6))];

        if (gameState.timer === null) {
            gameState.gameTime = 0;
            gameState.timer = setInterval(function(){
                gameState.gameTime++;
                updateBoardTime(gameState);
            }, 1000)
        }

        revealCard(boardCard, stateCard);
        if (isSecondCard(gameState)) {
            if (stateCard.symbolClass === gameState.revealed.symbolClass) {
                matchCards(stateCard, gameState.revealed);
                if (allCardsAreMatched(gameState)) {
                    gameOver();
                }
            } else {
                hideCards(gameState.revealed, stateCard);
            }
            gameState.revealed = null;
            gameState.moves++;
            updateMoves(gameState);
        } else {
            gameState.revealed = stateCard;
        }
    });

    $('.restart').click(function(){
        let board = $('.deck');
        resetGame(gameState, board);
        hideModal();
    });

    $('#hide-popup').click(function(){
        hideModal();
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
