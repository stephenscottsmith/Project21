/* 
 * Strategy.js Test Suite 
 */

// Ask Toal:
// How should we test for something that we expect not to work?
// i.e. A deck with 13 decks

$(function () {
	test("Basic Instantiation of Cards", function () {
		var card1 = new Card(1, 4);
		equal(card1.cardRank, 1, "Passing 1 in for rank (Looking for Ace: 1).");
		equal(card1.cardSuit, 4, "Passing 4 in for suit (Looking for Diamonds: 4).");

		var card2 = new Card(4, 3);
		equal(card2.cardRank, 4, "Passing 4 in for rank (Looking for 4: 4).");
		equal(card2.cardSuit, 3, "Passing 3 in for suit (Looking for Clubs: 3).");

		var card3 = new Card(10, 2);
		equal(card3.cardRank, 10, "Passing 10 in for rank (Looking for 10: 10).");
		equal(card3.cardSuit, 2, "Passing 2 in for suit (Looking for Hearts: 2).");

		var card4 = new Card(13, 1);
		equal(card4.cardRank, 13, "Passing 13 in for rank (Looking for King: 13).");
		equal(card4.cardSuit, 1, "Passing 1 in for suit (Looking for Spades: 1).");

		throws(function() { var card5 = new card(14, 1); }, "No rank greater than 13 allowed.");
		throws(function() { var card6 = new card(13, 5); }, "No suit greater than 4 allowed.");
		throws(function() { var card7 = new card(24, 17); }, "No rank greater than 13 and suit greater than 4 allowed.");
		throws(function() { var card5 = new card(0, 1); }, "No rank less than 1 allowed.");
		throws(function() { var card6 = new card(4, 0); }, "No suit less than 1 allowed.");
		throws(function() { var card7 = new card(-3, -89); }, "No rank and suit less than 1 allowed.");
	});



	test("Basic Instantiation of Decks", function () {
		var deck1 = new Deck(1);
		equal(deck1.numberOfDecks, 1, "Passing 1 in for deck size");
		equal(deck1.cardArray.length, 52, "Card Array Length (52).");

		var deck2 = new Deck(2);
		equal(deck2.numberOfDecks, 2, "Passing 2 in for deck size");
		equal(deck2.cardArray.length, 104, "Card Array Length (52).");

		var deck3 = new Deck(4);
		equal(deck3.numberOfDecks, 4, "Passing 4 in for deck size");
		equal(deck3.cardArray.length, 208, "Card Array Length (52).");

		var deck4 = new Deck(6);
		equal(deck4.numberOfDecks, 6, "Passing 6 in for deck size");
		equal(deck4.cardArray.length, 312, "Card Array Length (52).");

		var deck5 = new Deck(8);
		equal(deck5.numberOfDecks, 8, "Passing 8 in for deck size");
		equal(deck5.cardArray.length, 416, "Card Array Length (52).");

		throws(function() { var deck6 = new Deck(3); }, "No deck of size 3 allowed.");
		throws(function() { var deck7 = new Deck(5); }, "No deck of size 5 allowed.");
		throws(function() { var deck8 = new Deck(7); }, "No deck of size 7 allowed.");
		throws(function() { var deck9 = new Deck(0); }, "No deck of size 0 allowed.");
		throws(function() { var deck9 = new Deck(8.5); }, "No partial decks allowed.");
		throws(function() { var deck9 = new Deck(-4); }, "No negative sized decks allowed.");

	});

	test("Cards within A Newly Created Deck(s)", function () {
		var Ace = new Card(1, 1);

		var deck1 = new Deck(1);
		deepEqual(deck1.cardArray[0], Ace, "Card 1 in a new 1-Deck Deck (Ace of Spades)");
		deepEqual(deck1.cardArray[13], new Card(1, 2), "Card 14 in a new 1-Deck Deck (Ace of Hearts)");
		deepEqual(deck1.cardArray[26], new Card(1, 3), "Card 27 in a new 1-Deck Deck (Ace of Clubs)");
		deepEqual(deck1.cardArray[39], new Card(1, 4), "Card 50 in a new 1-Deck Deck (Ace of Diamonds)");
		deepEqual(deck1.cardArray[4], new Card(5, 1), "Card 5 in a new 1-Deck Deck (5 of Spades)");
		deepEqual(deck1.cardArray[51], new Card(13, 4), "Card 52 in a new 1-Deck Deck (King of Diamonds)");

		var deck2 = new Deck(4);
		deepEqual(deck2.cardArray[0], Ace, "Card 1 in a new 4 Deck Deck (Ace of Spades)");
		deepEqual(deck2.cardArray[52], Ace, "Card 53 in a new 4 Deck Deck (Ace of Spades)");
		deepEqual(deck2.cardArray[104], Ace, "Card 105 in a new 4 Deck Deck (Ace of Spades)");
		deepEqual(deck2.cardArray[156], Ace, "Card 157 in a new 4 Deck Deck (Ace of Spades)");
		
		deepEqual(deck2.cardArray[77], new Card(13, 2), "Card 78 in a new 4 Deck Deck (Ace of Spades)");
		deepEqual(deck2.cardArray[23], new Card(11, 2), "Card 24 in a new 4 Deck Deck (Ace of Spades)");
		deepEqual(deck2.cardArray[117], new Card(1, 2), "Card 118 in a new 4 Deck Deck (Ace of Spades)");
		deepEqual(deck2.cardArray[200], new Card(6, 4), "Card 201 in a new 4 Deck Deck (Ace of Spades)");

	});

	test("Deck Shuffling", function () {
		var deck = new Deck(1);
		deck.shuffle();
		notEqual(deck.cardArray[0], new Card(1, 1), "Chances are the first card should no longer be an Ace of Spades.");
		equal(deck.cardArray.length, 52, "Deck length is still the same.");

		var deck1 = new Deck(1);
		var deck2 = new Deck(1);
		deepEqual(deck1.cardArray, deck2.cardArray, "2 1-Deck Decks should the same after being created.");
		deck2.shuffle();
		equal(deck2.cardArray.length, 52, "Deck2 length is still the same.");
		equal(deck1.cardArray.length, deck2.cardArray.length, "Deck2 length is still the same as Deck1 length.");
		notDeepEqual(deck1.cardArray, deck2.cardArray, "2 1-Deck Decks should be different after one is shuffled.");
		deck1.shuffle();
		notDeepEqual(deck1.cardArray, deck2.cardArray, "2 1-Deck Decks should be different after both have been shuffled.");

		var deck3 = new Deck(2);
		var deck4 = new Deck(2);
		deepEqual(deck3.cardArray, deck4.cardArray, "2 2-Deck Decks should the same after being created.");
		deck4.shuffle();
		equal(deck4.cardArray.length, 104, "Deck4 length is still the same.");
		equal(deck3.cardArray.length, deck4.cardArray.length, "Deck4 length is still the same as Deck3 length.");
		notDeepEqual(deck3.cardArray, deck4.cardArray, "2 2-Deck Decks should be different after one is shuffled.");

		var deck5 = new Deck(4);
		var deck6 = new Deck(4);
		deepEqual(deck5.cardArray, deck6.cardArray, "2 4-Deck Decks should the same after being created.");
		deck6.shuffle();
		equal(deck6.cardArray.length, 208, "Deck6 length is still the same.");
		equal(deck5.cardArray.length, deck6.cardArray.length, "Deck6 length is still the same as Deck5 length.");
		notDeepEqual(deck5.cardArray, deck6.cardArray, "2 4-Deck Decks should be different after one is shuffled.");
		
		var deck7 = new Deck(6);
		var deck8 = new Deck(6);
		deepEqual(deck7.cardArray, deck8.cardArray, "2 6-Deck Decks should the same after being created.");
		deck8.shuffle();
		equal(deck8.cardArray.length, 312, "Deck8 length is still the same.");
		equal(deck7.cardArray.length, deck8.cardArray.length, "Deck8 length is still the same as Deck7 length.");
		notDeepEqual(deck7.cardArray, deck8.cardArray, "2 6-Deck Decks should be different after one is shuffled.");

		var deck9 = new Deck(8);
		var deck10 = new Deck(8);
		deepEqual(deck9.cardArray, deck10.cardArray, "2 8-Deck Decks should the same after being created.");
		deck10.shuffle();
		equal(deck10.cardArray.length, 416, "Deck10 length is still the same.");
		equal(deck9.cardArray.length, deck10.cardArray.length, "Deck10 length is still the same as Deck9 length.");
		notDeepEqual(deck9.cardArray, deck10.cardArray, "2 8-Deck Decks should be different after one is shuffled.");
	});
	
	// Test display image?
	// test("", function () {

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

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });

	// test("Basic Instantiation and Access of Blackjack Cards and Decks", function () {

	// });



});
