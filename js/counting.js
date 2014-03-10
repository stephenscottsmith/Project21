var Counting = {

    HIGH_COUNT: [ACES, 10, JACK, QUEEN, KING],
    LOW_COUNT:  [2, 3, 4, 5, 6],

    VALID_SPEEDS: [0.5, 1, 2, 3],

    countCards: function (deck, speed, numCardsToDisplay) {
        var deckCount = 0;
        var properCount = 0;

        function count() {
            if (deckCount < numCardsToDisplay) {
                $('#card').children().remove().end();
                deck[deckCount].displayImage('#card');
                if (_.contains(Counting.HIGH_COUNT, deck[deckCount].cardRank)) {
                    properCount--;
                } else if (_.contains(Counting.LOW_COUNT, deck[deckCount].cardRank)) {
                    properCount++;
                }
                deckCount++;
                setTimeout(count, speed);
            } else {
                $('#count').show();
                $('#submitcount').show().attr("propercount", properCount);
            }
        }

        count();
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

    populateSelectCards: function () {
        var maxVal = $('#numdecks')
            .find(':selected')
            .attr('value') * Blackjack.NUM_CARDS_IN_DECK;
        $('#numcards').attr('max', maxVal);
    },

};

$(document).ready(function () {
    $('#begin').button();

    $('#begin').click(function () {
        Counting.hideBegins();
        var speed = parseFloat($('#speed')
            .find(':selected')
            .attr('value'), 10) * 1000;
        var numDecks = parseInt($('#numdecks')
            .find(':selected')
            .attr('value'));
        var numCards = parseInt($('#numcards').val());
        if (numCards > numDecks * Blackjack.NUM_CARDS_IN_DECK) {
            numCards = numDecks * Blackjack.NUM_CARDS_IN_DECK;
        } else if (numCards < 1) {
            numCards = 1;
        }
        var deck = Blackjack.deckObj(numDecks);
        deck.shuffle();
        Counting.countCards(deck.cardArray, speed, numCards);
    });

    $('#numdecks').change(function () {
        Counting.populateSelectCards();
    });

    $('#submitcount').click(function () {
        $('#count').hide();
        $('#submitcount').hide();
        alert("Proper count was: " + $('#submitcount').attr("propercount") +
            "\nYour count was: " + $('#count').val());

        Counting.showBegins();

    })

    Counting.populateSelectSpeeds();
    Blackjack.populateSelectDecks();
    Counting.populateSelectCards();
});