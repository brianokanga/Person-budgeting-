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
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
	};

	return {
		//Get User input
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value, //either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value,
			};
		},
		//Add new item to the UI
		addListItem: function (obj, type) {
			let html, newHtml, element;
			//Create HTML  string with placehollder text
			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				html =
					'<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html =
					'<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			//Replace the place holder text with actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			//Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		getDOMstrings: function () {
			return DOMstrings;
		},
	};
})();

//THE APP CONTROLLER
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
		UICtrl.addListItem(newItem, input.type);

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
