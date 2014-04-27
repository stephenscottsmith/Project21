/* 
 * strategy.js Test Suite 
 */

$(function () {
	var DEALER_HITS_SOFT_17_HARD_TABLE = [
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

        DEALER_HITS_SOFT_17_SOFT_TABLE = [
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

        DEALER_HITS_SOFT_17_SPLITS_TABLE = [
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

	test("Determine Table Function Test", function () {
		var hand1 = [new Card(1, 1), new Card(1, 2)];
		deepEqual(Strategy.determineTable(hand1, Strategy.getCountOfHand(hand1)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "Aces should result in split table.");

		var hand2 = [new Card(2, 1), new Card(2, 3)];
		deepEqual(Strategy.determineTable(hand2, Strategy.getCountOfHand(hand2)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "2's should result in split table.");

		var hand3 = [new Card(3, 1), new Card(3, 2)];
		deepEqual(Strategy.determineTable(hand3, Strategy.getCountOfHand(hand3)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "3's should result in split table.");

		var hand4 = [new Card(4, 1), new Card(4, 2)];
		deepEqual(Strategy.determineTable(hand4, Strategy.getCountOfHand(hand4)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "4's should result in split table.");

		var hand5 = [new Card(5, 1), new Card(5, 2)];
		deepEqual(Strategy.determineTable(hand5, Strategy.getCountOfHand(hand5)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "5's should result in split table.");

		var hand6 = [new Card(6, 1), new Card(6, 2)];
		deepEqual(Strategy.determineTable(hand6, Strategy.getCountOfHand(hand6)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "6's should result in split table.");

		var hand7 = [new Card(7, 1), new Card(7, 2)];
		deepEqual(Strategy.determineTable(hand7, Strategy.getCountOfHand(hand7)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "7's should result in split table.");

		var hand8 = [new Card(8, 1), new Card(8, 2)];
		deepEqual(Strategy.determineTable(hand8, Strategy.getCountOfHand(hand8)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "8's should result in split table.");

		var hand9 = [new Card(9, 1), new Card(9, 2)];
		deepEqual(Strategy.determineTable(hand9, Strategy.getCountOfHand(hand9)), 
				  DEALER_HITS_SOFT_17_SPLITS_TABLE, "9's should result in split table.");

		var hand10 = [new Card(10, 1), new Card(10, 2)];
		deepEqual(Strategy.determineTable(hand10, Strategy.getCountOfHand(hand10)), 
				  DEALER_HITS_SOFT_17_HARD_TABLE, "10's should result in hard table.");

		var hand11 = [new Card(11, 1), new Card(11, 2)];
		deepEqual(Strategy.determineTable(hand11, Strategy.getCountOfHand(hand11)), 
				  DEALER_HITS_SOFT_17_HARD_TABLE, "Jacks should result in hard table.");

		var hand12 = [new Card(12, 1), new Card(12, 2)];
		deepEqual(Strategy.determineTable(hand12, Strategy.getCountOfHand(hand12)), 
				  DEALER_HITS_SOFT_17_HARD_TABLE, "Queens should result in hard table.");

		var hand13 = [new Card(13, 1), new Card(13, 2)];
		deepEqual(Strategy.determineTable(hand13, Strategy.getCountOfHand(hand13)), 
				  DEALER_HITS_SOFT_17_HARD_TABLE, "Kings should result in hard table.");
	});

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });



});
