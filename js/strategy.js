var HIT = "H";
var STAND = "S";
var DOUBLE_DOWN = "D";
var SPLIT = "P";

var Strategy = {
    correctMove: "", 

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

    clearTable: function () {
        $('#dealer').children().remove().end();
        $('#player').children().remove().end();
    },

    displayHands: function (playerHand, dealerHand) {
        dealerHand[0].displayImage('#dealer',"flipped");
        for (var i = 1; i < dealerHand.length;i++){
            dealerHand[1].displayImage('#dealer');
        }
        for (var i = 0; i < playerHand.length; i++) {   //changed so if hands grow it will still work
            playerHand[i].displayImage('#player');
        }
    },

    setCorrectMove: function (move) {
        Strategy.correctMove = move;
    },

    determineCorrectMove: function (playerCount, dealerUpCard) {
        var correctMove = 0;
        var playerIndex;
        var dealerIndex;
        if (playerCount >= 4 && playerCount <= 8) {
            playerIndex = 0;
        } else if (playerCount >= 18) {
            playerIndex = 9;
        } else {
            playerIndex = playerCount - 8;
        }

        if (dealerUpCard >= 10 && dealerUpCard <= 13) {
            dealerIndex = 8;
        } else if (dealerUpCard === 1) {
            dealerIndex = 9;
        } else {
            dealerIndex = dealerUpCard - 2;
        }

        return Strategy.DEALER_HITS_17_HARD_TABLE[dealerIndex][playerIndex];
    },

    practiceStrategy: function (numberOfHandsToBePlayed, deck) {
        var player = {
            cardArray: [],
            count: 0,
            isSoft: false
        };
        var dealer = {
            cardArray: [],
            count: 0,
            isSoft: false
        };
        var startCards = 2,
            numberOfHandsPlayed = 0;



        function playHand () {
            alert("PLAYING");
            if (numberOfHandsPlayed < numberOfHandsToBePlayed) {
                player.cardArray = [];
                dealer.cardArray = [];
                Strategy.clearTable();
                for (var j = 0; j < startCards; j++) {
                    player.cardArray.push(deck.pop());
                    dealer.cardArray.push(deck.pop());
                }
                dealer.cardArray[0].flipped = true;

                player.count = Strategy.getCountOfHand(player.cardArray);
                dealer.count = Strategy.getCountOfHand(dealer.cardArray);
                alert("DEALER: " + dealer.count + "\nPlayer: " + player.count);
                Strategy.displayHands(player.cardArray, dealer.cardArray);

                $('#hit').show();
                $('#stand').show();
                $('#split').show();
                $('#double').show();

                var dealerUpcardValue = Strategy.getCountOfHand(dealer.cardArray.slice(0, 1));
                var correctMove = determineCorrectMove(player.cardArray, player.count, dealerUpcardValue);
                Strategy.setCorrectMove(correctMove);

                alert("MOVE: " + correctMove);
                numberOfHandsPlayed++;
            }        
        }

        function determineCorrectMove (playerHand, playerCount, dealerCount) {
            var table = determineTable(playerHand);
            
            //alert("Dealer Count : " + dealerCount + "\nPlayer Count: " + playerCount);

            return table[playerCount][dealerCount];
        }

        function determineTable (playerHand) {
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
                alert("SPLIT");
                return DEALER_HITS_17_SPLITS_TABLE;
            } else if (playerHand[0].cardRank === Blackjack.ACES || 
                       playerHand[1].cardRank === Blackjack.ACES) {
                alert("SOFT");
                return DEALER_HITS_17_SOFT_TABLE;
            } else {
                alert("HARD");
                return DEALER_HITS_17_HARD_TABLE;
            }
        }

        while (numberOfHandsPlayed <= numberOfHandsToBePlayed) {
            
            playHand();
            numberOfHandsPlayed++;
        }
    },

    hideStrategyBegins: function () {
        $('#beginbtn').hide();
        $('#instructions').hide();
    },

};

var loadStrategy = function () {
    $('#beginStrategyTest').button();

    $('#beginStrategyTest').click(function () {
        Strategy.hideStrategyBegins();

        var numDecks = parseInt($('#numdecks')
            .find(':selected')
            .attr('value'));
        var numHands = parseInt($('#numhands').val());
        var deck = Blackjack.deckObj(numDecks);
        deck.shuffle();
        alert("HERE");
        Strategy.practiceStrategy(numHands, deck.cardArray);
    });

    // $('#hit').click(function () {
    //     var playerMove = "H";
    //     var correctMove = Strategy.correctMove;
    //     alert("Correct Move: " + correctMove);
    //     // Compare
    //     if (nubmerOfHandsPlayed < numberOfHandsToBePlayed) {
    //         playHand();
    //     } else {
    //         // reload menu
    //     }
    // });

    $('#stand').click(function () {
        
    });

    $('#split').click(function () {
        
    });

    $('#double').click(function () {
        
    });


    Blackjack.populateSelectDecks();
};
