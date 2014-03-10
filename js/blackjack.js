// TO DO List:
// 1. Finish shuffle algorithm for 6 deck
// 2. Revamp combine so it account for "sticky cards" or "dealer error"
// 3. Create Dealer constructor
// 4. Create Player constructor
// 5. Create play x number of shoes that will give you an alert as to whether or not you made
//    the correct move

// Suit then rank so as to say "9 of Hearts"

var Card = function (rank, suit) {
    this.cardRank = rank;
    this.cardSuit = suit;
    this.displayRank = ["A", "2", "3", "4", "5", "6",
                        "7", "8", "9", "T", "J", "Q", "K"];
    this.displaySuit = ["S", "H", "C", "D"];

    if (this.cardRank > 13 || this.cardRank < 1) {
        this.cardRank = "INVALID RANK ON CARD";
    }
    if (this.cardSuit < 1 || this.cardSuit > 4) {
        this.cardSuit = "INVALID SUIT ON CARD";
    }

    this.displayURL = "Cards/" + this.displayRank[this.cardRank - 1] + "" + this.displaySuit[this.cardSuit - 1] + ".png";

};

var Deck = function (deckNum) {
    this.numberOfDecks = deckNum;
    this.cardArray = [];
    for (var deckCounter = 0; deckCounter < this.numberOfDecks; deckCounter++) {
        for (var suitCounter = Blackjack.CLUBS; suitCounter <= Blackjack.SPADES; suitCounter++) {
            for (var rankCounter = Blackjack.ACES; rankCounter <= Blackjack.KING; rankCounter++) {
                this.cardArray.push(new Card(rankCounter, suitCounter));
            }
        }
    }

    this.shuffle = function () {
        this.cardArray = _.shuffle(this.cardArray);
    }
};

var Blackjack = {
    ACES:       1,
    JACK:       11,
    QUEEN:      12,
    KING:       13,
    CLUBS:      1,
    DIAMONDS:   2,
    HEARTS:     3,
    SPADES:     4,

    HIGH_COUNT: [this.ACES, 10, this.JACK, this.QUEEN, this.KING],
    LOW_COUNT:  [2, 3, 4, 5, 6],

    VALID_SPEEDS: [0.5, 1, 2, 3],
    VALID_DECKS: [1, 2, 4, 6, 8],

    NUM_CARDS_IN_DECK: 52,

    cardObj: function (rank, suit) {
        return new Card(rank, suit);
    },

    deckObj: function (deckNum) {
        return new Deck(deckNum);
    },

    displayCardByUnicode: function (card) {
        if (card.rank < 1 || card.rank > 13 || card.suit < 1 || card.suit > 4) {
            alert("Invalid rank or suit");
            return false;
        }
        var arrayRank = card.cardRank - 1;
        var arraySuit = card.cardSuit - 1;
        var CLUB_UNICODE = "\u2663";
        var DIAMOND_UNICODE = "\u2662";
        var HEART_UNICODE = "\u2661";
        var SPADE_UNICODE = "\u2660";
        var SUITS = [CLUB_UNICODE, DIAMOND_UNICODE, HEART_UNICODE, SPADE_UNICODE];
        var RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        var cardRank = RANKS[arrayRank] + SUITS[arraySuit];
        document.getElementById("card").innerHTML = cardRank;
    },

    getUnicode: function (card) {
        if (card.rank < 1 || card.rank > 13 || card.suit < 1 || card.suit > 4) {
            alert("Invalid rank our suit");
            return false;
        }
        var arrayRank = card.rank - 1;
        var arraySuit = card.suit - 1;
        var CLUB_UNICODE = "\u2663";
        var DIAMOND_UNICODE = "\u2662";
        var HEART_UNICODE = "\u2661";
        var SPADE_UNICODE = "\u2660";
        var SUITS = [CLUB_UNICODE, DIAMOND_UNICODE, HEART_UNICODE, SPADE_UNICODE];
        var RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        return RANKS[arrayRank] + SUITS[arraySuit];
    },

    displayCards: function (deck, speed, numCardsToDisplay) {
        var deckCount = 0;
        var properCount = 0;

        function display() {
            if (deckCount < numCardsToDisplay) {
                Blackjack.displayCardByUnicode(deck[deckCount]);

                if (_.contains(this.HIGH_COUNT, deck[deckCount].rank)) {
                    properCount--;
                } else if (_.contains(this.LOW_COUNT, deck[deckCount].rank)) {
                    properCount++;
                }

                deckCount++;
                setTimeout(display, speed);
            } else {
                $('#submitcount').show().attr("propercount", properCount);
            }
        }

        display();
    },

    hideBegins: function () {
        $('#beginbtn').hide();
        $('#instructions').hide();
        $('#countgroup').show();
    },

    showBegins: function () {
        $('#beginbtn').show();
        $('#instructions').show();
        $('#countgroup').hide();
    },

    populateSelectSpeeds: function () {
        for (var i = 0; i < this.VALID_SPEEDS.length; i++) {
            $('#speed').append($("<option></option>")
                .attr("value", this.VALID_SPEEDS[i])
                .text(this.VALID_SPEEDS[i] + " sec"));
        }
    },

    populateSelectDecks: function () {
        for (var i = 0; i < this.VALID_DECKS.length; i++) {
            $('#numdecks').append($("<option></option>")
                .attr("value", this.VALID_DECKS[i])
                .text(this.VALID_DECKS[i]));
        }
    },

    populateSelectCards: function () {
        var maxVal = $('#numdecks')
            .find(':selected')
            .attr('value') * this.NUM_CARDS_IN_DECK;
        $('#numcards').children().remove().end();
        for (var i = 2; i <= maxVal; i++) {
            $('#numcards').append($("<option></option>")
                .attr("value", i)
                .text(i + " cards"));
        }
    },

    hideStrategyBegins: function () {
        $('#beginbtn').hide();
        $('#instructions').hide();

        $('#dealerHand').show();

        $('#playerHand').show();
    },
};

$(document).ready(function () {
    $('#begin').button();

    $('#begin').click(function () {
        Blackjack.hideBegins();
        var speed = parseFloat($('#speed')
            .find(':selected')
            .attr('value'), 10) * 1000;
        var numDecks = parseInt($('#numdecks')
            .find(':selected')
            .attr('value'));
        var numCards = parseInt($('#numcards')
            .find(':selected')
            .attr('value'));
        $('#count').show();
        var deck = Blackjack.deckObj(numDecks);
        deck.shuffle();
        Blackjack.displayCards(deck.cardArray, speed, numCards);
    });

    $('#numdecks').change(function () {
        Blackjack.populateSelectCards();
    });

    $('#submitcount').click(function () {
        $('#count').hide();
        $('#submitcount').hide();
        alert("Proper count was: " + $('#submitcount').attr("propercount") +
            "\nYour count was: " + $('#count').val());

        Blackjack.showBegins();

    })

    Blackjack.populateSelectSpeeds();
    Blackjack.populateSelectDecks();
    Blackjack.populateSelectCards();

    $('#beginStrategyTest').button();

    $('#beginStrategyTest').click(function () {
        Blackjack.hideStrategyBegins();

        var numDecks = parseInt($('#numdecks')
            .find(':selected')
            .attr('value'));
        var numHands = parseInt($('#numhands').val());

        var deck = Blackjack.deckObj(numDecks);
        deck.shuffle();

        Strategy.practiceStrategy(numHands, deck.cardArray);
    });
});