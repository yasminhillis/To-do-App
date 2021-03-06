// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  var state = [
    { id: -3, description: 'first todo' },
    { id: -2, description: 'second todo' },
    { id: -1, description: 'third todo' },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');

    // you will need to use addEventListener


    // add span holding description
    var x = document.createElement("SPAN");
    if (todo.done) {
      x.classList.add('completed') ;
      }


   var text = document.createTextNode(todo.description);
   x.appendChild(text);
   todoNode.appendChild(x);

    // this adds the delete button
    var deleteButtonNode = document.createElement('button');

    deleteButtonNode.className = "delete";
    var t = document.createTextNode("Delete");       // Create a text node
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    deleteButtonNode.appendChild(t);
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markButtonNode = document.createElement('button');
    var te = document.createTextNode("Mark");       // Create a text node
    markButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);


        // x.classList.add('completed');
        // console.log(x.classList);
      update(newState);
      

    });
    markButtonNode.appendChild(te);
    todoNode.appendChild(markButtonNode);

    // add classes for css
    markButtonNode.className = "mark";



    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();
      var description = event.target.description.value; // event.target ....

      if((description==="")||(description===" ")){alert("you write nothing")}

      // hint: todoFunctions.addTodo
      else {
      var newState = todoFunctions.addTodo(state, description); // ?? change this!
      update(newState);}
    });
  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
