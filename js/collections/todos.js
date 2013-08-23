var app = app || [];

var TodoList = Backbone.Collection.extend({
	//Reference to this collections model
	model: app.Todo,

	//Save all of the todo items under the 'todos-backbone' namespace
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	//Filter down the list of all todo items that are finished
	completed: function() {
		return this.filter(function(todo) { 
			return todo.get('completed');
		});
	},

	//Filter down the list to only todo items that are still not finished
	remaining: function() {
		return this.without.apply(this, this.completed());
	},

	//We keep the Todos in seq order, despite being saved by unordered GUID in the DB
	nextOrder: function() {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	//Todos are sorted by their original insertion order
	comparator: function(todo) {
		return todo.get('order');
	}

});

//Create out global collection of **Todos**
app.Todos = new TodoList();