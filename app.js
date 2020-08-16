//THE MODULE PATTERN
let budgetController = (function () {
	//expenses function constructor
	let Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	//Income function constructor
	let Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	//Data structure for the budget control(private)
	let data = {
		allItems: {
			exp: [],
			inc: [],
		},
		totals: {
			exp: 0,
			inc: 0,
		},
	};

	return {
		addItem: function (type, des, val) {
			let newItem, ID;

			//Create new ID
			//ID = last ID + 1
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			//Create new item based on type (inc or exp)
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			//Push new item to the Data structure of expenses or income
			data.allItems[type].push(newItem);

			//Return the new item
			return newItem;
		},
	};
})();

//THE UI CONTROLLER MODULE
let UIController = (function () {
	let DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
	};

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value, //either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value,
			};
		},

		getDOMstrings: function () {
			return DOMstrings;
		},
	};
})();

//THE GLOBAL CONTROLLER
let controller = (function (budgetCtrl, UICtrl) {
	let DOM = UICtrl.getDOMstrings();

	let setupEventListeners = function () {
		//Add button event
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		//keypress event
		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	};

	let ctrlAddItem = function () {
		let input, newItem;

		//1.Get the filed input data
		input = UICtrl.getInput();

		//2.Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		//3. Add the item to the UI
		//4. Calculate the budget
		//5. Display the budget on thess UI
	};

	return {
		init: function () {
			console.log('App has started');
			setupEventListeners();
		},
	};
})(budgetController, UIController);

controller.init();
