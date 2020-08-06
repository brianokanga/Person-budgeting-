let budgetController = (function () {
	let x = 23;
	let add = function (a) {
		return x + a;
	};
	return {
		publicTest: function (b) {
			return add(b);
		},
	};
})();

//UI module
let UIController = (function () {
	//implimentation
})();

//app controller
let controller = (function (budgetCtrl, UICtrl) {
	var z = budgetCtrl.publicTest(5);

	return {
		anotherPublic: function () {
			console.log(z);
		},
	};
})(budgetController, UIController);
