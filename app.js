//THE MODULE PATTERN

//Immediately invoked function(IIFE)
//IIFEs allows data privacy because it creates a new scope not visible from
// the outer scope
//the secret of the pattern is that it returns an object containing the function we want to be public

let budgetController = (function () {
	//implementation
	let x = 23;

	//private method
	var add = function (a) {
		return x + a;
	};
	return {
		//public method returns an object
		publicTest: function (b) {
			return add(b);
		},
	};
})();

//THE UI CONTROLLER MODULE
let UIController = (function () {
	//implimentation
})();

//THE  CONTROLLER
//this controller has access the other two
let controller = (function (budgetCtrl, UICtrl) {
	//implimentation
	let z = budgetCtrl.publicTest(20);

	return {
		anotherPublic: function () {
			console.log(z);
		},
	};
})(budgetController, UIController);
