// TO DO List:
// 1. Finish shuffle algorithm for 6 deck
// 2. Revamp combine so it account for "sticky cards" or "dealer error"
// 3. Create Dealer constructor
// 4. Create Player constructor
// 5. Create play x number of shoes that will give you an alert as to whether or not you made
//    the correct move


// Suit then rank so as to say "9 of Hearts"
function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;

    if (rank > 13 || rank < 1) {
        throw "INVALID RANK ON CARD";
    }
    if (suit < 1 || suit > 4) {
        throw "INVALID SUIT ON CARD";
    }
}

function Deck(numberOfDecks) {
    if (numberOfDecks !== 4 && numberOfDecks !== 6 && numberOfDecks !== 8) {
        throw "INVALID NUMBER OF DECKS";
    }
    this.numberOfDecks = numberOfDecks;

    this.cardArray = [];
    for (var deck = 0; deck < this.numberOfDecks; deck++) {
        for (var suit = 1; suit <= 4; suit++) {
            for (var rank = 1; rank <= 13; rank++) {
                this.cardArray.push(new Card(rank, suit));
            }
        }
    }
}

Deck.prototype.shuffle = function () {
    var numberOfDecks = this.numberOfDecks;

    
    switch (numberOfDecks) {

        case 4:


        case 6:
            // for now do the same shuffle for 4, 6, 8 deck
            alert(this.cardArray.length);
            var splitDeck = splitDeckInHalf(this.cardArray);
            var combinedHalfOne = combineSixths(splitDeckInSixths(splitDeckInThirds(splitDeck[0])));
            var combinedHalfTwo = combineSixths(splitDeckInSixths(splitDeckInThirds(splitDeck[1])));
            this.cardArray = combinedHalfOne.concat(combinedHalfTwo);
            splitDeck = splitDeckInHalf(this.cardArray);
            var numberOfCuts = generateRandom(3, 3);
            var leftHalf = splitDeckIntoAlmostEqualParts(splitDeck[0], numberOfCuts);
            alert("WATCH!");
            alert(JSON.stringify(leftHalf));
            var rightHalf = splitDeckIntoAlmostEqualParts(splitDeck[1], numberOfCuts);
            var cardArrayLength = (this.cardArray.length);
            var preCutDeck = combineMultipleCutDeckHalves(leftHalf, rightHalf);
            alert(JSON.stringify(preCutDeck));
            var inputNumber = +prompt("Choose a number from 1 to " + cardArrayLength + " to cut at: ") - 1;
            var postCutDeck = cut(preCutDeck, inputNumber);
            
            alert(JSON.stringify(postCutDeck));

            break;

        case 8:
            alert(numberOfDecks);
            break;
    }
};

var cut = function (preCutDeck, inputNumber) {
    var resultDeck = preCutDeck.slice(0, inputNumber);
    return resultDeck.concat(preCutDeck.slice(inputNumber, preCutDeck.length));
};

var combineMultipleCutDeckHalves = function (leftHalf, rightHalf) {
    var resultDeck = [];
    alert("here");
    alert(JSON.stringify(leftHalf[0]));
    for (var i = 0; i < leftHalf.length; i++) {
        alert("this");
        resultDeck.concat(riffle(leftHalf[i], rightHalf[i]));
    }
    return resultDeck;
};

var combineSixths = function (sixthsDeck) {
    var combinedFirstQuarterAndFirstHalf = riffle(sixthsDeck[2], riffle(sixthsDeck[0], sixthsDeck[4]));
    var combinedSecondQuarterAndSecondHalf = riffle(sixthsDeck[3], riffle(sixthsDeck[1], sixthsDeck[5]));
    
    return combinedFirstQuarterAndFirstHalf.concat(combinedSecondQuarterAndSecondHalf);
};

var splitDeckIntoAlmostEqualParts = function (halfDeck, numberOfCuts) {
    var denominator = (numberOfCuts + 1);
    var splitPoints = [];
    for (var i = 1; i < numberOfCuts; i++) {
        splitPoints.push(Math.floor(((i * halfDeck.length)/ denominator)) + generateRandom(13, -6));
    }
    alert(JSON.stringify(splitPoints));
    var resultDeck = [];
    var index = 0;
    var point1 = 0;
    var point2 = splitPoints[i];
    while (i < splitPoints.length) {
        resultDeck.concat(halfDeck.slice(point1, point2));
        alert("in here");
        alert(JSON.stringify(resultDeck));
        point1 = splitPoints[index - 1];
        point2 = splitPoints[index++];
    }
    
    return resultDeck.concat(halfDeck.slice(point1, halfDeck.length));
};

Deck.splitDeckInSixths = function (thirdsDeck) {
    var splitQuarter1 = splitDeckInHalf(thirdsDeck[0]);
    var splitHalf = splitDeckInHalf(thirdsDeck[1]);
    var splitQuarter2 = splitDeckInHalf(thirdsDeck[2]);

    return [splitQuarter1[0], splitQuarter1[1], splitHalf[0],
            splitHalf[1], splitQuarter2[0], splitQuarter2[1]];
};

var splitDeckInThirds = function (halfDeck) {
    var firstQuarterSplitPoint = Math.floor((halfDeck.length) / 4 + generateRandom(11, -5));
    var secondQuarterSplitPoint = Math.floor((3 * halfDeck.length) / 4 + generateRandom(11, -5));

    return [halfDeck.slice(0, firstQuarterSplitPoint),
            halfDeck.slice(firstQuarterSplitPoint, secondQuarterSplitPoint),
            halfDeck.slice(secondQuarterSplitPoint, halfDeck.length)];
};

var splitDeckInHalf = function (deck) {
    var splitPoint = Math.floor(deck.length / 2 + generateRandom(17, -8));
    
    return [deck.slice(0, splitPoint), deck.slice(splitPoint, deck.length)];
};

var generateRandom = function (numberPossibilities, startingPoint) {
    return Math.floor(Math.random() * numberPossibilities + startingPoint);
};

var firstCardInShuffle = function () {
    return generateRandom(2, 0);
};

var riffle = function (a, b) {
    var newArray = [];
    var aLength = a.length;
    var bLength = b.length;
    var minLength = Math.min(aLength, bLength);

    for (var i = 0; i < minLength; i++) {
        newArray.push(a[i]);
        newArray.push(b[i]);
    }

    return newArray.concat(a.slice(minLength), b.slice(minLength));
};

var validDeck = function (deck) {
    var uniqueCards = [];
    for (var i = 0; i < deck.length; i++) {
        var contains = containsCard(deck[i], uniqueCards);
        if (!contains) {
            uniqueCards.push(deck[i]);
            // alert("A " + deck[i].rank + ", " + deck[i].suit + " was added and this deck has " + containsThisMany(deck[i], deck));
        }
    }
    if (uniqueCards.length === 52) {
        return true;
    }
    
    return false;
};



/* Validating deck and card methods  PLACE IN TEST FILE SEPARATE FROM CODE BASE */
var containsThisMany = function(card, deckToSearch) {
    var count = 0;
    for (var i = 0; i < deckToSearch.length; i++) {
        if (card.suit === deckToSearch[i].suit && card.rank === deckToSearch[i].rank) {
            count++;
        }
    }
    
    return count;
};

var containsCard = function (card, deckToSearch) {
    for (var i = 0; i < deckToSearch.length; i++) {
        if (card.suit === deckToSearch[i].suit && card.rank === deckToSearch[i].rank) {
            return true;
        }
    }
    
    return false;
};

var contains6s = function (array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== 6) {
            return false;
        }
    }
    
    return true;
};

var d1 = new Deck(6);
alert(JSON.stringify(d1));
d1.shuffle();
alert(JSON.stringify(d1));
alert(validDeck(d1.cardArray));