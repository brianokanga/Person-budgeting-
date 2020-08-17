//THE MODULE PATTERN

//===============================

//THE BUDGET CONTROLLER MODULE
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

	//calculate total(private)
	let calculateTotal = function (type) {
		let sum = 0;
		data.allItems[type].forEach(function (cur) {
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	//Global Data structure for the budget control(private)
	let data = {
		allItems: {
			exp: [],
			inc: [],
		},
		totals: {
			exp: 0,
			inc: 0,
		},
		budget: 0,
		percentage: -1,
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

		calculateBudget: function () {
			//1. Calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			//2. calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			//3. Calculate the percentage of income that we spent
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},

		getBudget: function () {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage,
			};
		},

		testing: function () {
			console.log(data);
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
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
	};

	return {
		//Get User input
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value, //either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
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

		clearFields: function () {
			let fields, fieldsArr;
			fields = document.querySelectorAll(
				DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
			);

			//converting list to array
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function (current, index, array) {
				current.value = '';
			});

			return fieldsArr;
		},

		displayBudget: function (obj) {
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expensesLabel).textContent =
				obj.totalExp;
			document.querySelector(DOMstrings.percentageLabel).textContent =
				obj.percentage;

			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent =
					obj.percentage;
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
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

	let updateBudget = function () {
		//1. Calculate the budget
		budgetCtrl.calculateBudget();

		//2. Return budget
		let budget = budgetCtrl.getBudget();

		//3. Display the budget on thess UI
		UICtrl.displayBudget(budget);
	};

	let ctrlAddItem = function () {
		let input, newItem;

		//1.Get the filed input data
		input = UICtrl.getInput();

		if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
			//2.Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			//3. Add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			//4. Clear the fields
			UICtrl.clearFields();

			//5. Calculate and update budget
			updateBudget();
		}
	};

	return {
		init: function () {
			console.log('App has started');
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1,
			});
			setupEventListeners();
		},
	};
})(budgetController, UIController);

controller.init();
