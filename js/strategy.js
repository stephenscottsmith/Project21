var HIT = "H";
var STAND = "S";
var DOUBLE_DOWN = "D";
var SPLIT = "S";

var Strategy = {

	DEALER_HITS_17_HARD_TABLE: [
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
	],

	DEALER_HITS_17_SOFT_TABLE: [
	    "HHHDDHHHHH",
	    "HHHDDHHHHH",
	    "HHDDDHHHHH",
	    "HHDDDHHHHH",
	    "HDDDDHHHHH",
	    "DDDDDSSHHH"

	],

	DEALER_HITS_17_SPLITS_TABLE: [

	],

	getCountOfHand: function (hand) {
	    var handCount = 0;
	    for (var i = 0; i < hand.length; i++) {
	        handCount += (hand[i].rank > 10 ? 10 : hand[i].rank);
	    }
	    return handCount;
	},

	clearTable: function () {
	    // $('#playerHand').children().remove().end();
	    // $('#dealerHand').children().remove().end();
	    // document.getElementById('playerHand').innerHTML = '';
	    // document.getElementById('dealerHand').innerHTML = '';
	    
	    $('#dealer').children().remove().end();
	    $('#player').children().remove().end();
	},

	displayHands: function (playerHand, dealerHand) {
	    for (var i = 0; i < 1; i++) {
	        //$('#playerHand').append(getUnicode(playerHand[i].displayURL));
	        $('#dealer').append($("<img>")
	            .attr("src", dealerHand[i].displayURL)
	            .attr("height", 200)
	            .attr("width", 50));
	    }
	    for (var i = 0; i < 2; i++) {
	        $('#player').append($("<img>")
	            .attr("src", dealerHand[i].displayURL)
	            .attr("height", 200)
	            .attr("width", 50));
	    }
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

	    // alert(playerIndex + ", " + dealerIndex);
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
		    if (numberOfHandsPlayed < numberOfHandsToBePlayed) {
		        player.cardArray = [];
		        dealer.cardArray = [];
		        Strategy.clearTable();
		        for (var j = 0; j < startCards; j++) {
		            player.cardArray.push(deck.pop());
		            dealer.cardArray.push(deck.pop());
		        }
		        player.count = Strategy.getCountOfHand(player.cardArray);
		        dealer.count = Strategy.getCountOfHand(dealer.cardArray);
		        Strategy.displayHands(dealer.cardArray, player.cardArray);

		        var correctMove = Strategy.determineCorrectMove(player.count, 
		                                               dealer.cardArray[0].rank);
		        var playerMove = +prompt(
		            "Given the showing cards, should you hit(0), stand(1), doubleDown(2), or split(3)?"
		        );

		        if (playerMove === correctMove) {
		            alert("YOU MADE THE CORRECT MOVE!");
		        } else {
		            alert("You should have performed a: " + correctMove);
		        }

		        numberOfHandsPlayed++;

		        playHand();
		    }        
		}

		playHand();
		    // setTimeout(function () {
		    //     
		    //     var playerMove = +prompt(
		    //         "Given the showing cards, should you hit(0), stand(1), doubleDown(2), or split(3)?"
		    //     )

		    //     clearTable();
		    //     displayHands(dealer.cardArray, player.cardArray);
		    // }, 2000);

		// for (var j = 0; j < player.cardArray.length; j++) {
		//     alert(player.cardArray[j].suit + ", " + player.cardArray[j].rank);
		// }
	}

};