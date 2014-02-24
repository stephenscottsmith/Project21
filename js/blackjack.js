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

var HIGHCOUNT = [ACES, 10, JACK, QUEEN, KING];
var LOWCOUNT = [2, 3, 4, 5, 6];

var VALIDSPEEDS = [0.5, 1, 2, 3];
var VALIDDECKS = [1, 2, 4, 6, 8];

var NUMCARDSINDECK = 52;
var SECONDSTOWAITAFTERFINISHED = 4;


function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;

    if (rank > 13 || rank < 1) {
        this.rank = "INVALID RANK ON CARD";
    }
    if (suit < 1 || suit > 4) {
        this.suit = "INVALID SUIT ON CARD";
    }
}

function Deck(numberOfDecks) {
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

Deck.prototype.shuffle = function () {
    var numberOfDecks = this.numberOfDecks;

    switch (numberOfDecks) {
        case 1:
            // lay out in front of you in 2 rows
            // move around and combine
            // split in about half and riffle together 3 times
            // take about half to 2/3 of bottom part of deck
            // take anywhere from 2-5 cards and place from top of the bottom part you just pulled
            // and place on top of the smaller, previous top
            // riffle one more time
            // cut the deck

            // have 2 deck be same as 1 deck for now

        case 2:
            alert("1 or 2 is " + numberOfDecks);
            break;

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

var splitDeckInSixths = function (thirdsDeck) {
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



/* Validating deck and card methods */
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


var displayCardByUnicode = function(card)
{
    if (card.rank < 1 || card.rank > 13 || card.suit < 1 || card.suit > 4)
    {
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
    var cardRank = RANKS[arrayRank] + SUITS[arraySuit];
    document.getElementById("card").innerHTML = cardRank;
}

var tmpDeck = function(numberOfDecks)
{
    this.cardArray = [];
    for (var deckCounter = 0; deckCounter < numberOfDecks; deckCounter++) 
    {
        for (var suitCounter = CLUBS; suitCounter <= SPADES; suitCounter++) 
        {
            for (var rankCounter = ACES; rankCounter <= KING; rankCounter++) 
            {
                this.cardArray.push(new Card(rankCounter, suitCounter));
            }
        }
    }

    return cardArray
}

var displayCards = function(deck, speed, numCardsToDisplay)
{
    var deckCount = 0;
    var properCount = 0;
    function display() 
    {
        if(deckCount < numCardsToDisplay) 
        {
            displayCardByUnicode(deck[deckCount]);

            if(_.contains(HIGHCOUNT, deck[deckCount].rank))
            {
                properCount++;
            }
            else if(_.contains(LOWCOUNT, deck[deckCount].rank))
            {
                properCount--;
            }


            deckCount++;
            setTimeout(display, speed);
        }
        else
        {
            $('#submitcount').show().attr("propercount", properCount);
        }
    }

    display();
}

var hideBegins = function()
{
    $('#beginbtn').hide();
    $('#instructions').hide();
    $('#countgroup').show();
}
var showBegins = function()
{
    $('#beginbtn').show();
    $('#instructions').show();
    $('#countgroup').hide();
}

var populateSelectSpeeds = function()
{
    for(var i = 0; i < VALIDSPEEDS.length; i++)
    {
        $('#speed')
            .append($("<option></option>")
            .attr("value", VALIDSPEEDS[i])
            .text(VALIDSPEEDS[i] + " sec"));
    }
}

var populateSelectDecks = function()
{
    for(var i = 0; i < VALIDDECKS.length; i++)
    {
        $('#numdecks')
            .append($("<option></option>")
            .attr("value", VALIDDECKS[i])
            .text(VALIDDECKS[i] ));
    }
}

var populateSelectCards = function()
{
    var maxVal = $('#numdecks').find(':selected').attr('value') * NUMCARDSINDECK;
    $('#numcards').children().remove().end();
    for(var i = 2; i <= maxVal; i++)
    {
        $('#numcards')
            .append($("<option></option>")
            .attr("value", i)
            .text(i + " cards"));
    }
}

$(document).ready(function(){
    $('#begin').button();

    $('#begin').click(function()
    {
        hideBegins();
        var speed = parseFloat($('#speed').find(':selected').attr('value'), 10) * 1000;
        var numDecks = parseInt($('#numdecks').find(':selected').attr('value'));
        var numCards = parseInt($('#numcards').find(':selected').attr('value'));
        $('#count').show();
        var testDeck = tmpDeck(numDecks);
        var deckToDisplay = _.shuffle(testDeck);
        displayCards(deckToDisplay, speed, numCards);
    });

    $('#numdecks').change(function()
    {
        populateSelectCards();
    });

    $('#submitcount').click(function()
    {
    	$('#count').hide();
    	$('#submitcount').hide();
        alert("Proper count was: " + $('#submitcount').attr("propercount") + "\nYour count was: " + $('#count').val());
        
        showBegins();

    })

    populateSelectSpeeds();
    populateSelectDecks();
    populateSelectCards();

});