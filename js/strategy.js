    
var HIT = "H";
var STAND = "S";
var DOUBLE_DOWN = "D";
var SPLIT = "P";

// 1. Implement back
// 2. Fix the constant highlight of a previous move
// 4. Meet w/ Alex for database
// 5. Look at login for posting a new registry
//      a. server.js - try to use html only
//          write a post in this file
//      b. index.html
//          write a form with input with username and password
// 6. Get signed up for developer account

var Strategy = {
    numberOfHandsToBePlayed: 0,
    numberOfHandsPlayed: 0,
    deck: null,
    correctMove: "",
    numberOfDecks: 0,

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
        console.log("numberOfHandsToBePlayed: " + Strategy.numberOfHandsPlayed + "\n" +
                    "numberOfHandsPlayed: " + Strategy.numberOfHandsPlayed + "\n" +
                    "deck: " + Strategy.deck.length + "\n" +
                    "correctMove: " + Strategy.correctMove + "\n" +
                    "playerCards: " + Strategy.player.cardArray.length + "\n" +
                    "correctMoves: " + Strategy.player.numberOfCorrectMoves + "\n" +
                    "incorrectMoves: " + Strategy.player.numberOfIncorrectMoves + "\n" +
                    "dealerCards: " + Strategy.player.cardArray.length + "\n")

        Strategy.clearTable();
        Strategy.resetPlayers();

        if (Strategy.deck.cardArray.length===0) {
            var newDeck = Blackjack.deckObj(Strategy.numberOfDecks);
            Strategy.deck = newDeck;
        }
        
        for (var j = 0, startCards = 2; j < startCards; j++) {
                Strategy.player.cardArray.push(Strategy.deck.cardArray.pop());
                Strategy.dealer.cardArray.push(Strategy.deck.cardArray.pop());
        }
        
        Strategy.dealer.cardArray[0].flipped = true;
        Strategy.player.count = Strategy.getCountOfHand(Strategy.player.cardArray);
        Strategy.dealer.count = Strategy.getCountOfHand(Strategy.dealer.cardArray.slice(0, 1));
        Strategy.correctMove = Strategy.determineCorrectMove(Strategy.player.cardArray, 
                                                             Strategy.player.count, 
                                                             Strategy.dealer.count);
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
        var table = Strategy.determineTable(playerHand, playerCount);
        //console.log("Player Count: " + playerCount + "\nDealer Count: " + dealerCount);
        return table[playerCount][dealerCount];
    },

    determineTable: function (playerHand, playerCount) {
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
            "",
            "  PPPPPPPPPP",
        ];

        if ((playerHand[0].cardRank === playerHand[1].cardRank) && playerCount !== 20) {
            //console.log("SPLIT");
            return DEALER_HITS_17_SPLITS_TABLE;
        } else if (playerHand[0].cardRank === Blackjack.ACES || 
                   playerHand[1].cardRank === Blackjack.ACES) {
            //console.log("SOFT");
            return DEALER_HITS_17_SOFT_TABLE;
        } else {
            //console.log("HARD");
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
        //console.log("Correct: " + Strategy.player.numberOfCorrectMoves + 
        //            "\nIncorrect: " + Strategy.player.numberOfIncorrectMoves);
    },

    gameDone: function () {
        Strategy.clearTable();
        Strategy.hideChoiceButtons();
        Strategy.showStrategyBegins();
    }

};

var loadStrategy = function () {
    //$('#beginStrategyTest').button();

    $('#beginStrategyTest').click(function () {
        Strategy.hideStrategyBegins();

        var numDecks = parseInt($('#numdecks')
            .find(':selected')
            .attr('value'));
        var numHands = parseInt($('#numhands').val());
        var newDeck = Blackjack.deckObj(numDecks);
        Strategy.numberOfDecks = numDecks;
        Strategy.numberOfHandsToBePlayed = numHands;
        Strategy.numberOfHandsPlayed = 0;
        newDeck.shuffle();
        
        Strategy.deck = newDeck;
        Strategy.playHand();

    });



    $('#hit').click(function () {
        var playerMove = "H";
        Strategy.displayOutcomeMessage(playerMove);
        // Compare
        if (Strategy.numberOfHandsPlayed < Strategy.numberOfHandsToBePlayed) {
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
        if (Strategy.numberOfHandsPlayed < Strategy.numberOfHandsToBePlayed) {
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
        if (Strategy.numberOfHandsPlayed < Strategy.numberOfHandsToBePlayed) {
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
        if (Strategy.numberOfHandsPlayed < Strategy.numberOfHandsToBePlayed) {
            Strategy.playHand();
        } else {
            // reload menu
            Strategy.gameDone();
        }
    });


    Blackjack.populateSelectDecks();
};