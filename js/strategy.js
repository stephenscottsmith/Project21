    
var HIT = "H";
var STAND = "S";
var DOUBLE_DOWN = "D";
var SPLIT = "P";


// Do I want to store strategy as a function? If so how would I do that when 
// I need to access the Strategy.playHand() function to play the game?
// Make sure to test multiple simulations of the game so as to check whether 
// or not numberOfHandsToBePlayed is reset as well as the deck and numberOfHandsPlayed
var Strategy = {
    numberofHandsToBePlayed: 0,
    numberOfHandsPlayed: 0,
    deck: null,
    correctMove: "",

    player: {
        cardArray: [],
        count: 0,
        numberOfCorrectMoves: 0,
        numberOfIncorrectMoves: 0
    },

    dealer: {
        cardArray: [],
        count: 0
    },

    playHand: function () {
        Strategy.clearTable();
        Strategy.resetPlayers();

        for (var j = 0, startCards = 2; j < startCards; j++) {
                Strategy.player.cardArray.push(Strategy.deck.cardArray.pop());
                Strategy.dealer.cardArray.push(Strategy.deck.cardArray.pop());
        }
        console.log(Strategy.player.cardArray[0].cardSuit + ", " + Strategy.player.cardArray[0].cardRank + 
                    " -- " + Strategy.player.cardArray[1].cardSuit + ", " + Strategy.player.cardArray[1].cardRank);
        Strategy.dealer.cardArray[0].flipped = true;

        Strategy.player.count = Strategy.getCountOfHand(Strategy.player.cardArray);
        // Strategy.dealer.count = Strategy.getCountOfHand(Strategy.dealer.cardArray);
        // console.log("DEALER: " + Strategy.dealer.count + "\nPlayer: " + Strategy.player.count);
        
        var dealerUpcardValue = Strategy.getCountOfHand(Strategy.dealer.cardArray.slice(0, 1));
        Strategy.determineCorrectMove(Strategy.player.cardArray, 
                                      Strategy.player.count, 
                                      dealerUpcardValue);
        Strategy.numberOfHandsPlayed++;
        Strategy.displayHands();
        Strategy.showChoiceButtons();

    },

    displayHands: function () {
        for (var i = 0; i < Strategy.dealer.cardArray.length; i++) {
            if (i % 2 === 0) {
                Strategy.dealer.cardArray[i].displayImage(dealer, false);
            } else {
                Strategy.dealer.cardArray[i].displayImage(dealer, true);
            }  
            Strategy.player.cardArray[i].displayImage(player, false);
        }
    },

    determineCorrectMove: function (playerHand, playerCount, dealerCount) {
        var table = Strategy.determineTable(playerHand);
        console.log("Player Count: " + playerCount + "\nDealer Count: " + dealerCount);
        Strategy.correctMove = table[playerCount][dealerCount];
    },

    determineTable: function (playerHand) {
        var DEALER_HITS_17_HARD_TABLE = [
            "",
            "",
            "",
            "",
            "  HHHHHHHHHH",
            "  HHHHHHHHHH",
            "  HHHHHHHHHH",
            "  HHHHHHHHHH",
            "  HHHHHHHHHH",
            "  HDDDDHHHHH",
            "  DDDDDDDDHH",
            "  DDDDDDDDDD",
            "  HHSSSHHHHH",
            "  SSSSSHHHHH",
            "  SSSSSHHHHH",
            "  SSSSSHHHHH",
            "  SSSSSHHHHH",
            "  SSSSSSSSSS",
            "  SSSSSSSSSS",
            "  SSSSSSSSSS",
            "  SSSSSSSSSS",
            "  SSSSSSSSSS",
        ],

        DEALER_HITS_17_SOFT_TABLE = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "  HHHDDHHHHH",
            "  HHHDDHHHHH",
            "  HHDDDHHHHH",
            "  HHDDDHHHHH",
            "  HDDDDHHHHH",
            "  DDDDDSSHHH",
            "  SSSSDSSSSS",
            "  SSSSSSSSSS",
            "  SSSSSSSSSS"
        ],

        DEALER_HITS_17_SPLITS_TABLE = [
            "",
            "",
            "",
            "",
            "  PPPPPPHHHH",
            "",
            "  PPPPPPHHHH",
            "",
            "  HHHPPHHHHH",
            "",
            "  HHHHHHHHHH",
            "",
            "  PPPPPHHHHH",
            "",
            "  PPPPPPHHHH",
            "",
            "  PPPPPPPPPP",
            "",
            "  PPPPPSPPSS",
            "",
            "  PPPPPPPPPP",
            ""
        ];

        if (playerHand[0].cardRank === playerHand[1].cardRank) {
            console.log("SPLIT");
            return DEALER_HITS_17_SPLITS_TABLE;
        } else if (playerHand[0].cardRank === Blackjack.ACES || 
                   playerHand[1].cardRank === Blackjack.ACES) {
            console.log("SOFT");
            return DEALER_HITS_17_SOFT_TABLE;
        } else {
            console.log("HARD");
            return DEALER_HITS_17_HARD_TABLE;
        }
    },

    getCountOfHand: function (hand) {
        var handCount = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i].cardRank >= 10) {
                handCount += 10;
            } else if (hand[i].cardRank === 1) {
                handCount += 11;
            } else {
                handCount += hand[i].cardRank;
            }
        }
        return handCount;
    },

    resetPlayers: function () {
        Strategy.dealer.cardArray = [];
        Strategy.dealer.count = 0;
        Strategy.player.cardArray = [];
        Strategy.dealer.count = 0;
    },

    showChoiceButtons: function () {
        $('#hit').show();
        $('#stand').show();
        $('#split').show();
        $('#double').show();
    },

    hideChoiceButtons: function () {
        $('#hit').hide();
        $('#stand').hide();
        $('#split').hide();
        $('#double').hide();
    },

    clearTable: function () {
        $('#dealer').children().remove().end();
        $('#player').children().remove().end();
    },

    showStrategyBegins: function () {
        $('#beginbtn').show();
        $('#instructions').show();
    }, 

    hideStrategyBegins: function () {
        $('#beginbtn').hide();
        $('#instructions').hide();
    }, 

    displayOutcomeMessage: function (playerMove) {
        if (playerMove === Strategy.correctMove) {
            Strategy.player.numberOfCorrectMoves += 1;
            alert("YOU MADE THE CORRECT MOVE!!!");
        } else {
            Strategy.player.numberOfIncorrectMoves += 1;
            alert("WRONG MOVE! You should have done a: " + Strategy.correctMove);
        }
        console.log("Correct: " + Strategy.player.numberOfCorrectMoves + 
                    "\nIncorrect: " + Strategy.player.numberOfIncorrectMoves);
    },

    gameDone: function () {
        Strategy.clearTable();
        Strategy.hideChoiceButtons();
        Strategy.showStrategyBegins();

    }

};

var loadStrategy = function () {
    $('#beginStrategyTest').button();

    $('#beginStrategyTest').click(function () {
        Strategy.hideStrategyBegins();

        var numDecks = parseInt($('#numdecks')
            .find(':selected')
            .attr('value'));
        var numHands = parseInt($('#numhands').val());
        var newDeck = Blackjack.deckObj(numDecks);

        newDeck.shuffle();
        Strategy.numberofHandsToBePlayed = numHands;
        Strategy.deck = newDeck;
        Strategy.playHand();

    });



    $('#hit').click(function () {
        var playerMove = "H";
        Strategy.displayOutcomeMessage(playerMove);
        // Compare
        if (Strategy.numberOfHandsPlayed < Strategy.numberofHandsToBePlayed) {
            Strategy.playHand();
        } else {
            // reload menu
            Strategy.gameDone();
        }
    });

    $('#stand').click(function () {
        var playerMove = "S";
        Strategy.displayOutcomeMessage(playerMove);
        // Compare
        if (Strategy.numberOfHandsPlayed < Strategy.numberofHandsToBePlayed) {
            Strategy.playHand();
        } else {
            // reload menu
            Strategy.gameDone();
        }
    });

    $('#split').click(function () {
        var playerMove = "P";
        Strategy.displayOutcomeMessage(playerMove);
        // Compare
        if (Strategy.numberOfHandsPlayed < Strategy.numberofHandsToBePlayed) {
            Strategy.playHand();
        } else {
            // reload menu
            Strategy.gameDone();
        }
    });

    $('#double').click(function () {
        var playerMove = "D";
        Strategy.displayOutcomeMessage(playerMove);
        // Compare
        if (Strategy.numberOfHandsPlayed < Strategy.numberofHandsToBePlayed) {
            Strategy.playHand();
        } else {
            // reload menu
            Strategy.gameDone();
        }
    });


    Blackjack.populateSelectDecks();
};