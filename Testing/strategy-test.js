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
            "",
            "  PPPPPPPPPP"
        ];

    test("Get Count Of Hand Tests", function () {
    	var hand1 = [new Card(2, 1), new Card(8, 2)];
    	equal(Strategy.getCountOfHand(hand1), 10, "2 and 8 = 10");

        var hand1a = [new Card(2, 1), new Card(2, 2)];
        equal(Strategy.getCountOfHand(hand1a), 4, "2 and 2 = 4");

    	var hand2 = [new Card(13, 1), new Card(10, 2)];
    	equal(Strategy.getCountOfHand(hand2), 20, "K and 10 = 20");

    	var hand3 = [new Card(1, 1), new Card(3, 2)];
    	equal(Strategy.getCountOfHand(hand3), 14, "Ace and 3 = 14");

    	var hand4 = [new Card(6, 1), new Card(1, 2)];
    	equal(Strategy.getCountOfHand(hand4), 17, "6 and Ace = 17");

    	var hand5 = [new Card(13, 1), new Card(1, 2)];
    	equal(Strategy.getCountOfHand(hand5), 21, "13 and Ace = 21");

        var hand6 = [new Card(1, 3)];
        equal(Strategy.getCountOfHand(hand6), 11, "Ace = 11");

        var hand7 = [new Card(13, 1)];
        equal(Strategy.getCountOfHand(hand7), 10, "King = 10");

        var hand8 = [new Card(12, 2)];
        equal(Strategy.getCountOfHand(hand8), 10, "Queen = 10");

        var hand9 = [new Card(11, 3)];
        equal(Strategy.getCountOfHand(hand9), 10, "Jack = 10");

        var hand10 = [new Card(10, 4)];
        equal(Strategy.getCountOfHand(hand10), 10, "10 = 10");

        var hand11 = [new Card(8, 3)];
        equal(Strategy.getCountOfHand(hand11), 8, "8 = 8");
	});

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

		var hand14 = [new Card(1, 1), new Card(13, 2)];
		deepEqual(Strategy.determineTable(hand14, Strategy.getCountOfHand(hand14)),
				  DEALER_HITS_SOFT_17_SOFT_TABLE, "Having the first card be an Ace should give the soft table.");

		var hand15 = [new Card(12, 1), new Card(1, 4)];
		deepEqual(Strategy.determineTable(hand15, Strategy.getCountOfHand(hand15)),
				  DEALER_HITS_SOFT_17_SOFT_TABLE, "Having the second card be an Ace should give the soft table.");

		var hand16 = [new Card(12, 1), new Card(7, 2)];
		deepEqual(Strategy.determineTable(hand16, Strategy.getCountOfHand(hand16)),
				  DEALER_HITS_SOFT_17_HARD_TABLE, "Queen and 7 should result in hard table.");

		var hand17 = [new Card(11, 1), new Card(10, 2)];
		deepEqual(Strategy.determineTable(hand17, Strategy.getCountOfHand(hand17)),
				  DEALER_HITS_SOFT_17_HARD_TABLE, "Jack and 10 should result in hard table.");

		var hand18 = [new Card(8, 1), new Card(2, 2)]; 
		deepEqual(Strategy.determineTable(hand18, Strategy.getCountOfHand(hand18)),
				  DEALER_HITS_SOFT_17_HARD_TABLE, "8 and 2 should result in hard table.");
	});

	test("Determine Correct Move Function Tests", function () {

        var hand1 = [new Card(2, 1), new Card(2, 4)];
        equal(Strategy.determineCorrectMove(hand1, Strategy.getCountOfHand(hand1), 2),
              "P",
              "Player has 2, 2 with a dealer count of 2 should be: P");

        var hand2 = [new Card(4, 1), new Card(5, 2)];
        equal(Strategy.determineCorrectMove(hand2, Strategy.getCountOfHand(hand2), 2),
              "H",
              "Player has 4, 5 with a dealer count of 2 should be: H");
        
        var hand3 = [new Card(6, 1), new Card(3, 4)];
        equal(Strategy.determineCorrectMove(hand3, Strategy.getCountOfHand(hand3), 3),
              "D",
              "Player has 6, 3 with a dealer count of 3 should be: D");
        
        var hand4 = [new Card(3, 1), new Card(7, 4)];
        equal(Strategy.determineCorrectMove(hand4, Strategy.getCountOfHand(hand4), 9),
              "D",
              "Player has 5, 5 with a dealer count of 9 should be: D");
        
        var hand5 = [new Card(6, 1), new Card(4, 2)];
        equal(Strategy.determineCorrectMove(hand5, Strategy.getCountOfHand(hand5), 10),
              "H",
              "Player has 6, 4 with a dealer count of 10 should be: H");
        

        var hand6 = [new Card(10, 1), new Card(11, 4)];
        for (var i = 2; i < 12; i++) {
            equal(Strategy.determineCorrectMove(hand6, Strategy.getCountOfHand(hand6), i),
                  "S",
                  "Player has 10, J with a any dealer count 2 or greater and less than the obvious max up card value should be: S");
        }
            
        var hand7 = [new Card(1, 1), new Card(6, 4)];
        equal(Strategy.determineCorrectMove(hand7, Strategy.getCountOfHand(hand7), 2),
              "H",
              "Player has Ace, 6 with a dealer count of 2 should be: H");

        
        var hand8 = [new Card(1, 3), new Card(6, 2)];
        equal(Strategy.determineCorrectMove(hand8, Strategy.getCountOfHand(hand8), 3),
              "D",
              "Player has Ace, 6 with a dealer count of 3 should be: D");

        var hand9 = [new Card(5, 1), new Card(1, 4)];
        equal(Strategy.determineCorrectMove(hand9, Strategy.getCountOfHand(hand9), 6),
              "D",
              "Player has 5, Ace with a dealer count of 6 should be: D");
        
        var hand10 = [new Card(5, 1), new Card(1, 4)];
        equal(Strategy.determineCorrectMove(hand10, Strategy.getCountOfHand(hand10), 7),
              "H",
              "Player has 5, Ace with a dealer count of 7 should be: H");

        var hand11 = [new Card(1, 1), new Card(8, 4)];
        equal(Strategy.determineCorrectMove(hand11, Strategy.getCountOfHand(hand11), 5),
              "S",
              "Player has Ace, 8 with a dealer count of 5 should be: S");
        
        var hand12 = [new Card(1, 1), new Card(8, 4)];
        equal(Strategy.determineCorrectMove(hand12, Strategy.getCountOfHand(hand12), 6),
              "D",
              "Player has Ace, 8 with a dealer count of 6 should be: D");
        
        var hand13 = [new Card(1, 1), new Card(8, 4)];
        equal(Strategy.determineCorrectMove(hand13, Strategy.getCountOfHand(hand13), 7),
              "S",
              "Player has Ace, 8 with a dealer count of 7 should be: S");

        var hand14 = [new Card(2, 1), new Card(2, 4)];
        equal(Strategy.determineCorrectMove(hand14, Strategy.getCountOfHand(hand14), 3),
              "P",
              "Player has 2, 2 with a dealer count of 3 should be: P");

        var hand15 = [new Card(2, 1), new Card(2, 4)];
        equal(Strategy.determineCorrectMove(hand15, Strategy.getCountOfHand(hand15), 4),
              "P",
              "Player has 2, 2 with a dealer count of 4 should be: P");

        var hand16 = [new Card(4, 1), new Card(4, 2)];
        equal(Strategy.determineCorrectMove(hand16, Strategy.getCountOfHand(hand16), 4),
              "H",
              "Player has 4, 4 with a dealer count of 4 should be: H");

        var hand17 = [new Card(4, 1), new Card(4, 2)];
        equal(Strategy.determineCorrectMove(hand17, Strategy.getCountOfHand(hand17), 5),
              "P",
              "Player has 4, 4 with a dealer count of 5 should be: P");

        var hand18 = [new Card(4, 1), new Card(4, 2)];
        equal(Strategy.determineCorrectMove(hand18, Strategy.getCountOfHand(hand18), 6),
              "P",
              "Player has 4, 4 with a dealer count of 6 should be: P");

        var hand19 = [new Card(4, 1), new Card(4, 2)];
        equal(Strategy.determineCorrectMove(hand19, Strategy.getCountOfHand(hand19), 7),
              "H",
              "Player has 4, 4 with a dealer count of 7 should be: H");

        var hand20 = [new Card(8, 1), new Card(8, 4)];
        equal(Strategy.determineCorrectMove(hand20, Strategy.getCountOfHand(hand20), 10),
              "P",
              "Player has 8, 8 with a dealer count of 10 should be: P");

        var hand21 = [new Card(8, 1), new Card(8, 4)];
        equal(Strategy.determineCorrectMove(hand21, Strategy.getCountOfHand(hand21), 11),
              "P",
              "Player has 8, 8 with a dealer count of 11 should be: P");

        var hand22 = [new Card(1, 1), new Card(1, 4)];
        for (var i = 2; i < 12; i++) {
            equal(Strategy.determineCorrectMove(hand22, Strategy.getCountOfHand(hand22), i),
                      "P",
                      "Player has Ace, Ace with any valid dealer count should be: P");
        }
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



});
