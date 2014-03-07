// TO DO List:
// 1. Finish shuffle algorithm for 6 deck
// 2. Revamp combine so it account for "sticky cards" or "dealer error"
// 3. Create Dealer constructor
// 4. Create Player constructor
// 5. Create play x number of shoes that will give you an alert as to whether or not you made
//    the correct move

// Suit then rank so as to say "9 of Hearts"

var ACES = 1;
var JACK = 11;
var QUEEN = 12;
var KING = 13;
var CLUBS = 1;
var DIAMONDS = 2;
var HEARTS = 3;
var SPADES = 4;

var HIGH_COUNT = [ACES, 10, JACK, QUEEN, KING];
var LOW_COUNT = [2, 3, 4, 5, 6];

var VALID_SPEEDS = [0.5, 1, 2, 3];
var VALID_DECKS = [1, 2, 4, 6, 8];

var NUM_CARDS_IN_DECK = 52;

// var hit = 0;
// var stand = 1;
// var doubleDown = 2;
// var split = 3;

var HIT = "H";
var STAND = "S";
var DOUBLE_DOWN = "D";
var SPLIT = "S";

var DEALER_HITS_17_HARD_TABLE = [
    "HHHHHHHHHH",
    "HDDDDHHHHH",
    "DDDDDDDDHH",
    "DDDDDDDDDD",
    "HHSSSHHHHH",
    "SSSSSHHHHH",
    "SSSSSHHHHH",
    "SSSSSHHHHH",
    "SSSSSHHHHH",
    "SSSSSSSSSS",
    "SSSSSSSSSS"
];

var DEALER_HITS_17_SOFT_TABLE = [
    "HHHDDHHHHH",
    "HHHDDHHHHH",
    "HHDDDHHHHH",
    "HHDDDHHHHH",
    "HDDDDHHHHH",
    "DDDDDSSHHH",

];

var DEALER_HITS_17_SPLITS_TABLE = [

];

var hardTable = [];
for (var i = 0; i < 10; i++) {
    hardTable[i] = [];
}
// hardTable[0][0] = hit;
// hardTable[1][0] = hit;
// hardTable[2][0] = hit;
// hardTable[3][0] = hit;
// hardTable[4][0] = hit;
// hardTable[5][0] = hit;
// hardTable[6][0] = hit;
// hardTable[7][0] = hit;
// hardTable[8][0] = hit;
// hardTable[9][0] = hit;

// hardTable[0][1] = hit;
// hardTable[1][1] = doubleDown;
// hardTable[2][1] = doubleDown;
// hardTable[3][1] = doubleDown;
// hardTable[4][1] = doubleDown;
// hardTable[5][1] = hit;
// hardTable[6][1] = hit;
// hardTable[7][1] = hit;
// hardTable[8][1] = hit;
// hardTable[9][1] = hit;

// hardTable[0][2] = doubleDown;
// hardTable[1][2] = doubleDown;
// hardTable[2][2] = doubleDown;
// hardTable[3][2] = doubleDown;
// hardTable[4][2] = doubleDown;
// hardTable[5][2] = doubleDown;
// hardTable[6][2] = doubleDown;
// hardTable[7][2] = doubleDown;
// hardTable[8][2] = hit;
// hardTable[9][2] = hit;

// hardTable[0][3] = doubleDown;
// hardTable[1][3] = doubleDown;
// hardTable[2][3] = doubleDown;
// hardTable[3][3] = doubleDown;
// hardTable[4][3] = doubleDown;
// hardTable[5][3] = doubleDown;
// hardTable[6][3] = doubleDown;
// hardTable[7][3] = doubleDown;
// hardTable[8][3] = doubleDown;
// hardTable[9][3] = doubleDown;

// hardTable[0][4] = hit;
// hardTable[1][4] = hit;
// hardTable[2][4] = stand;
// hardTable[3][4] = stand;
// hardTable[4][4] = stand;
// hardTable[5][4] = hit;
// hardTable[6][4] = hit;
// hardTable[7][4] = hit;
// hardTable[8][4] = hit;
// hardTable[9][4] = hit;

// hardTable[0][5] = stand;
// hardTable[1][5] = stand;
// hardTable[2][5] = stand;
// hardTable[3][5] = stand;
// hardTable[4][5] = stand;
// hardTable[5][5] = hit;
// hardTable[6][5] = hit;
// hardTable[7][5] = hit;
// hardTable[8][5] = hit;
// hardTable[9][5] = hit;

// hardTable[0][6] = stand;
// hardTable[1][6] = stand;
// hardTable[2][6] = stand;
// hardTable[3][6] = stand;
// hardTable[4][6] = stand;
// hardTable[5][6] = hit;
// hardTable[6][6] = hit;
// hardTable[7][6] = hit;
// hardTable[8][6] = hit;
// hardTable[9][6] = hit;

// hardTable[0][7] = stand;
// hardTable[1][7] = stand;
// hardTable[2][7] = stand;
// hardTable[3][7] = stand;
// hardTable[4][7] = stand;
// hardTable[5][7] = hit;
// hardTable[6][7] = hit;
// hardTable[7][7] = hit;
// hardTable[8][7] = hit;
// hardTable[9][7] = hit;

// hardTable[0][8] = stand;
// hardTable[1][8] = stand;
// hardTable[2][8] = stand;
// hardTable[3][8] = stand;
// hardTable[4][8] = stand;
// hardTable[5][8] = hit;
// hardTable[6][8] = hit;
// hardTable[7][8] = hit;
// hardTable[8][8] = hit;
// hardTable[9][8] = hit;

// hardTable[0][9] = stand;
// hardTable[1][9] = stand;
// hardTable[2][9] = stand;
// hardTable[3][9] = stand;
// hardTable[4][9] = stand;
// hardTable[5][9] = stand;
// hardTable[6][9] = stand;
// hardTable[7][9] = stand;
// hardTable[8][9] = stand;
// hardTable[9][9] = stand;

// hardTable[0][10] = stand;
// hardTable[1][10] = stand;
// hardTable[2][10] = stand;
// hardTable[3][10] = stand;
// hardTable[4][10] = stand;
// hardTable[5][10] = stand;
// hardTable[6][10] = stand;
// hardTable[7][10] = stand;
// hardTable[8][10] = stand;
// hardTable[9][10] = stand;

var determineCorrectMove = function (playerCount, dealerUpCard) {
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

    // alert(playerIndex + ", " + dealerIndex);
    return hardTable[dealerIndex][playerIndex];
}

var Card = function (rank, suit) {
    this.rank = rank;
    this.suit = suit;

    if (rank > 13 || rank < 1) {
        this.rank = "INVALID RANK ON CARD";
    }
    if (suit < 1 || suit > 4) {
        this.suit = "INVALID SUIT ON CARD";
    }
}

var Deck = function (numberOfDecks) {
    this.numberOfDecks = numberOfDecks;
    this.cardArray = [];
    for (var deckCounter = 0; deckCounter < this.numberOfDecks; deckCounter++) {
        for (var suitCounter = CLUBS; suitCounter <= SPADES; suitCounter++) {
            for (var rankCounter = ACES; rankCounter <= KING; rankCounter++) {
                this.cardArray.push(new Card(rankCounter, suitCounter));
            }
        }
    }
}

// Deck.prototype.shuffle = function () {
//     var numberOfDecks = this.numberOfDecks;

//     switch (numberOfDecks) {
//         case 1:
//             // lay out in front of you in 2 rows
//             // move around and combine
//             // split in about half and riffle together 3 times
//             // take about half to 2/3 of bottom part of deck
//             // take anywhere from 2-5 cards and place from top of the bottom part you just pulled
//             // and place on top of the smaller, previous top
//             // riffle one more time
//             // cut the deck

//             // have 2 deck be same as 1 deck for now

//         case 2:
//             alert("1 or 2 is " + numberOfDecks);
//             break;

//         case 4:

//         case 6:
//             // for now do the same shuffle for 4, 6, 8 deck
//             alert(this.cardArray.length);
//             var splitDeck = splitDeckInHalf(this.cardArray);
//             var combinedHalfOne = combineSixths(splitDeckInSixths(splitDeckInThirds(splitDeck[0])));
//             var combinedHalfTwo = combineSixths(splitDeckInSixths(splitDeckInThirds(splitDeck[1])));
//             this.cardArray = combinedHalfOne.concat(combinedHalfTwo);
//             splitDeck = splitDeckInHalf(this.cardArray);
//             var numberOfCuts = generateRandom(3, 3);
//             var leftHalf = splitDeckIntoAlmostEqualParts(splitDeck[0], numberOfCuts);
//             alert("WATCH!");
//             alert(JSON.stringify(leftHalf));
//             var rightHalf = splitDeckIntoAlmostEqualParts(splitDeck[1], numberOfCuts);
//             var cardArrayLength = (this.cardArray.length);
//             var preCutDeck = combineMultipleCutDeckHalves(leftHalf, rightHalf);
//             alert(JSON.stringify(preCutDeck));
//             var inputNumber = +prompt("Choose a number from 1 to " + cardArrayLength + " to cut at: ") - 1;
//             var postCutDeck = cut(preCutDeck, inputNumber);

//             alert(JSON.stringify(postCutDeck));

//             break;

//         case 8:
//             alert(numberOfDecks);
//             break;
//     }
// };

// var cut = function (preCutDeck, inputNumber) {
//     var resultDeck = preCutDeck.slice(0, inputNumber);
//     return resultDeck.concat(preCutDeck.slice(inputNumber, preCutDeck.length));
// };

// var combineMultipleCutDeckHalves = function (leftHalf, rightHalf) {
//     var resultDeck = [];
//     alert("here");
//     alert(JSON.stringify(leftHalf[0]));
//     for (var i = 0; i < leftHalf.length; i++) {
//         alert("this");
//         resultDeck.concat(riffle(leftHalf[i], rightHalf[i]));
//     }
//     return resultDeck;
// };

// var combineSixths = function (sixthsDeck) {
//     var combinedFirstQuarterAndFirstHalf = riffle(sixthsDeck[2], riffle(sixthsDeck[0], sixthsDeck[4]));
//     var combinedSecondQuarterAndSecondHalf = riffle(sixthsDeck[3], riffle(sixthsDeck[1], sixthsDeck[5]));

//     return combinedFirstQuarterAndFirstHalf.concat(combinedSecondQuarterAndSecondHalf);
// };

// var splitDeckIntoAlmostEqualParts = function (halfDeck, numberOfCuts) {
//     var denominator = (numberOfCuts + 1);
//     var splitPoints = [];
//     for (var i = 1; i < numberOfCuts; i++) {
//         splitPoints.push(Math.floor(((i * halfDeck.length)/ denominator)) + generateRandom(13, -6));
//     }
//     alert(JSON.stringify(splitPoints));
//     var resultDeck = [];
//     var index = 0;
//     var point1 = 0;
//     var point2 = splitPoints[i];
//     while (i < splitPoints.length) {
//         resultDeck.concat(halfDeck.slice(point1, point2));
//         alert("in here");
//         alert(JSON.stringify(resultDeck));
//         point1 = splitPoints[index - 1];
//         point2 = splitPoints[index++];
//     }

//     return resultDeck.concat(halfDeck.slice(point1, halfDeck.length));
// };

// var splitDeckInSixths = function (thirdsDeck) {
//     var splitQuarter1 = splitDeckInHalf(thirdsDeck[0]);
//     var splitHalf = splitDeckInHalf(thirdsDeck[1]);
//     var splitQuarter2 = splitDeckInHalf(thirdsDeck[2]);

//     return [splitQuarter1[0], splitQuarter1[1], splitHalf[0],
//             splitHalf[1], splitQuarter2[0], splitQuarter2[1]];
// };

// var splitDeckInThirds = function (halfDeck) {
//     var firstQuarterSplitPoint = Math.floor((halfDeck.length) / 4 + generateRandom(11, -5));
//     var secondQuarterSplitPoint = Math.floor((3 * halfDeck.length) / 4 + generateRandom(11, -5));

//     return [halfDeck.slice(0, firstQuarterSplitPoint),
//             halfDeck.slice(firstQuarterSplitPoint, secondQuarterSplitPoint),
//             halfDeck.slice(secondQuarterSplitPoint, halfDeck.length)];
// };

// var splitDeckInHalf = function (deck) {
//     var splitPoint = Math.floor(deck.length / 2 + generateRandom(17, -8));

//     return [deck.slice(0, splitPoint), deck.slice(splitPoint, deck.length)];
// };

// var generateRandom = function (numberPossibilities, startingPoint) {
//     return Math.floor(Math.random() * numberPossibilities + startingPoint);
// };

// var firstCardInShuffle = function () {
//     return generateRandom(2, 0);
// };

// var riffle = function (a, b) {
//     var newArray = [];
//     var aLength = a.length;
//     var bLength = b.length;
//     var minLength = Math.min(aLength, bLength);

//     for (var i = 0; i < minLength; i++) {
//         newArray.push(a[i]);
//         newArray.push(b[i]);
//     }

//     return newArray.concat(a.slice(minLength), b.slice(minLength));
// };

// var validDeck = function (deck) {
//     var uniqueCards = [];
//     for (var i = 0; i < deck.length; i++) {
//         var contains = containsCard(deck[i], uniqueCards);
//         if (!contains) {
//             uniqueCards.push(deck[i]);
//             // alert("A " + deck[i].rank + ", " + deck[i].suit + " was added and this deck has " + containsThisMany(deck[i], deck));
//         }
//     }
//     if (uniqueCards.length === 52) {
//         return true;
//     }

//     return false;
// };

// /* Validating deck and card methods */
// var containsThisMany = function(card, deckToSearch) {
//     var count = 0;
//     for (var i = 0; i < deckToSearch.length; i++) {
//         if (card.suit === deckToSearch[i].suit && card.rank === deckToSearch[i].rank) {
//             count++;
//         }
//     }

//     return count;
// };

// var containsCard = function (card, deckToSearch) {
//     for (var i = 0; i < deckToSearch.length; i++) {
//         if (card.suit === deckToSearch[i].suit && card.rank === deckToSearch[i].rank) {
//             return true;
//         }
//     }

//     return false;
// };

// var contains6s = function (array) {
//     for (var i = 0; i < array.length; i++) {
//         if (array[i] !== 6) {
//             return false;
//         }
//     }

//     return true;
// };

var displayCardByUnicode = function (card) {
    if (card.rank < 1 || card.rank > 13 || card.suit < 1 || card.suit > 4) {
        alert("Invalid rank or suit");
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
    var cardRank = RANKS[arrayRank] + SUITS[arraySuit];
    document.getElementById("card").innerHTML = cardRank;
}

var getUnicode = function (card) {
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
}

var tmpDeck = function (numberOfDecks) {
    cardArray = [];
    for (var deckCounter = 0; deckCounter < numberOfDecks; deckCounter++) {
        for (var suitCounter = CLUBS; suitCounter <= SPADES; suitCounter++) {
            for (var rankCounter = ACES; rankCounter <= KING; rankCounter++) {
                cardArray.push(new Card(rankCounter, suitCounter));
            }
        }
    }

    return cardArray;
}

var displayCards = function (deck, speed, numCardsToDisplay) {
    var deckCount = 0;
    var properCount = 0;

    function display() {
        if (deckCount < numCardsToDisplay) {
            displayCardByUnicode(deck[deckCount]);

            if (_.contains(HIGHCOUNT, deck[deckCount].rank)) {
                properCount--;
            } else if (_.contains(LOWCOUNT, deck[deckCount].rank)) {
                properCount++;
            }

            deckCount++;
            setTimeout(display, speed);
        } else {
            $('#submitcount').show().attr("propercount", properCount);
        }
    }

    display();
}

var hideBegins = function () {
    $('#beginbtn').hide();
    $('#instructions').hide();
    $('#countgroup').show();
}
var showBegins = function () {
    $('#beginbtn').show();
    $('#instructions').show();
    $('#countgroup').hide();
}

var populateSelectSpeeds = function () {
    for (var i = 0; i < VALIDSPEEDS.length; i++) {
        $('#speed').append($("<option></option>")
            .attr("value", VALIDSPEEDS[i])
            .text(VALIDSPEEDS[i] + " sec"));
    }
}

var populateSelectDecks = function () {
    for (var i = 0; i < VALIDDECKS.length; i++) {
        $('#numdecks').append($("<option></option>")
            .attr("value", VALIDDECKS[i])
            .text(VALIDDECKS[i]));
    }
}

var populateSelectCards = function () {
    var maxVal = $('#numdecks')
        .find(':selected')
        .attr('value') * NUMCARDSINDECK;
    $('#numcards').children().remove().end();
    for (var i = 2; i <= maxVal; i++) {
        $('#numcards').append($("<option></option>")

            .attr("value", i)
            .text(i + " cards"));
    }
}

var getCountOfHand = function (hand) {
    var handCount = 0;
    for (var i = 0; i < hand.length; i++) {
        handCount += (hand[i].rank > 10 ? 10 : hand[i].rank);
    }
    return handCount;
}

var clearTable = function () {
    // $('#playerHand').children().remove().end();
    // $('#dealerHand').children().remove().end();
    // document.getElementById('playerHand').innerHTML = '';
    // document.getElementById('dealerHand').innerHTML = '';
    $('#playerHand').text('');
    $('#dealerHand').text('');
}

var hideStrategyBegins = function () {
    $('#beginbtn').hide();
    $('#instructions').hide();

    $('#dealerHand').show();

    $('#playerHand').show();
}

var displayHands = function (playerHand, dealerHand) {
    for (var i = 0; i < playerHand.length; i++) {
        $('#playerHand').append(getUnicode(playerHand[i]));
    }
    for (var i = 0; i < dealerHand.length - 1; i++) {
        $('#dealerHand').append(getUnicode(dealerHand[i]));
    }
}

var practiceStrategy = function (numberOfHands, deck) {
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
    var startCards = 2;

    for (var i = 0; i < numberOfHands; i++) {
        player.cardArray = [];
        dealer.cardArray = [];
        clearTable();
        for (var j = 0; j < startCards; j++) {
            player.cardArray.push(deck.pop());
            dealer.cardArray.push(deck.pop());
        }
        player.count = getCountOfHand(player.cardArray);
        dealer.count = getCountOfHand(dealer.cardArray);
        displayHands(dealer.cardArray, player.cardArray);

        setTimeout(function () {
            var correctMove = determineCorrectMove(player.count, dealer.cardArray[
                0].rank);
            var playerMove = +prompt(
                "Given the showing cards, should you hit(0), stand(1), doubleDown(2), or split(3)?"
            )
            if (playerMove === correctMove) {
                alert("YOU MADE THE CORRECT MOVE!");
            } else {
                alert("You should have performed a: " + correctMove);
            }
            clearTable();
            displayHands(dealer.cardArray, player.cardArray);
        }, 2000);

        // for (var j = 0; j < player.cardArray.length; j++) {
        //     alert(player.cardArray[j].suit + ", " + player.cardArray[j].rank);
        // }
    }
}

$(document).ready(function () {
    $('#begin').button();

    $('#begin').click(function () {
        hideBegins();
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
        var testDeck = tmpDeck(numDecks);
        var deckToDisplay = _.shuffle(testDeck);
        displayCards(deckToDisplay, speed, numCards);
    });

    $('#numdecks').change(function () {
        populateSelectCards();
    });

    $('#submitcount').click(function () {
        $('#count').hide();
        $('#submitcount').hide();
        alert("Proper count was: " + $('#submitcount').attr("propercount") +
            "\nYour count was: " + $('#count').val());

        showBegins();

    })

    populateSelectSpeeds();
    populateSelectDecks();
    populateSelectCards();

    $('#beginStrategyTest').button();

    $('#beginStrategyTest').click(function () {
        hideStrategyBegins();

        var numDecks = parseInt($('#numdecks')
            .find(':selected')
            .attr('value'));
        var numHands = parseInt($('#numhands').val());
        var deck = _.shuffle(tmpDeck(numDecks));

        practiceStrategy(numHands, deck);
    });
});