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

  //Data structure for the budget control
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
}) ();

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
        type: document.querySelector (DOMstrings.inputType).value,
        description: document.querySelector (DOMstrings.inputDescription).value,
        value: document.querySelector (DOMstrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
}) ();

//THE GLOBAL CONTROLLER
let controller = (function (budgetCtrl, UICtrl) {
  let DOM = UICtrl.getDOMstrings ();

  let setupEventListeners = function () {
    //Add button event
    document
      .querySelector (DOM.inputBtn)
      .addEventListener ('click', ctrlAddItem);

    //keypress event
    document.addEventListener ('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem ();
      }
    });
  };

  let ctrlAddItem = function () {
    //1.Get the filed input data
    let input = UICtrl.getInput ();

    //2.Add the item to the budget controller
    //3. Add the item to the UI
    //4. Calculate the budget
    //5. Display the budget on thess UI
  };

  return {
    init: function () {
      console.log ('App has started');
      setupEventListeners ();
    },
  };
}) (budgetController, UIController);

controller.init ();
