/*
*  counting.js Test Suite
*/

$(function() {
	
	test("Sum Count of Non-shuffled and Shuffled Deck Count Tests", function () {
		var d1 = new Deck(1);
		Counting.countCards(d1.cardArray, 1, 52);
		equal(Counting.count, 0,  "Deck Size 1 unshuffled count should be 0.");
		d1.shuffle();
		Counting.countCards(d1.cardArray, 1, 52);
		equal(Counting.count, 0,  "Deck Size 1 shuffled count should be 0.");

		var d2 = new Deck(2);
		Counting.countCards(d2.cardArray, 1, 104);
		equal(Counting.count, 0,  "Deck Size 2 unshuffled count should be 0.");
		d2.shuffle();
		Counting.countCards(d2.cardArray, 1, 104);
		equal(Counting.count, 0,  "Deck Size 2 shuffled count should be 0.");

		var d3 = new Deck(4);
		Counting.countCards(d3.cardArray, 1, 208);
		equal(Counting.count, 0,  "Deck Size 4 unshuffled count should be 0.");
		d3.shuffle();
		Counting.countCards(d3.cardArray, 1, 208);
		equal(Counting.count, 0,  "Deck Size 4 shuffled count should be 0.");

		var d4 = new Deck(6);
		Counting.countCards(d4.cardArray, 1, 312);
		equal(Counting.count, 0,  "Deck Size 6 unshuffled count should be 0.");
		d4.shuffle();
		Counting.countCards(d4.cardArray, 1, 312);
		equal(Counting.count, 0,  "Deck Size 6 shuffled count should be 0.");

		var d5 = new Deck(8);
		Counting.countCards(d5.cardArray, 1, 416);
		equal(Counting.count, 0,  "Deck Size 8 unshuffled count should be 0.");
		d5.shuffle();
		Counting.countCards(d5.cardArray, 1, 416);
		equal(Counting.count, 0,  "Deck Size 8 shuffled count should be 0.");
	});
});