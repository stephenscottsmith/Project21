// TO DO List:
// 1. Finish shuffle algorithm for 6 deck
// 2. Revamp combine so it account for "sticky cards" or "dealer error"
// 3. Create Dealer constructor
// 4. Create Player constructor
// 5. Create play x number of shoes that will give you an alert as to whether or not you made
//    the correct move

// Suit then rank so as to say "9 of Hearts"

var ACES        = 1;
var JACK        = 11;
var QUEEN       = 12;
var KING        = 13;
var CLUBS       = 1;
var DIAMONDS    = 2;
var HEARTS      = 3;
var SPADES      = 4;

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

    var displayURL = "Cards/" + this.displayRank[this.cardRank - 1] + "" + this.displaySuit[this.cardSuit - 1] + ".png";

    this.displayImage = function (divID) {
        $(divID).append($('<img>')
                .attr('src', displayURL)
                .attr("height", 200)
                .attr("class", "card"));
    }
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
    ACES:       ACES,
    JACK:       JACK,
    QUEEN:      QUEEN,
    KING:       KING,
    CLUBS:      CLUBS,
    DIAMONDS:   DIAMONDS,
    HEARTS:     HEARTS,
    SPADES:     SPADES,

    NUM_CARDS_IN_DECK: 52,
    VALID_DECKS: [1, 2, 4, 6, 8],

    cardObj: function (rank, suit) {
        return new Card(rank, suit);
    },

    deckObj: function (deckNum) {
        return new Deck(deckNum);
    },

    populateSelectDecks: function () {
        for (var i = 0; i < this.VALID_DECKS.length; i++) {
            $('#numdecks').append($("<option></option>")
                .attr("value", this.VALID_DECKS[i])
                .text(this.VALID_DECKS[i]));
        }
    },
};