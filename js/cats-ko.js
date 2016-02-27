var initialCats = [
	{
		"image": "images/kitten.jpg",
		"name": "Sweet Kitty",
		"timesClicked": 0,
		"nickNames" : ["sweet"]
	},
	{
		"image": "images/very-happy-kitten.jpg",
		"name": "Happy Kitty",
		"timesClicked": 0,
		"nickNames": ["happy"]
	},
	{
		"image": "images/fishbowl.jpg",
		"name": "Fish Bowl Kitty",
		"timesClicked": 0,
		"nickNames": ["fishy"]
	},
	{
		"image": "images/loveyCat.jpg",
		"name": "Hugging Kittens",
		"timesClicked": 0,
		"nickNames": ["huggy","lovey", "family", "sisters"],
	},
	{
		"image": "images/blackAndWhite.jpg",
		"name": "Black and White Cat",
		"timesClicked": 0,
		"nickNames" : ["blackie"]
	},
	{
		"image": "images/KoreaMap.jpg",
		"name": "Korean Map",
		"timesClicked": 0,
		"nickNames": ["Korea"]
	}
];

var Cat = function(thisCat){
	this.catName= ko.observable(thisCat.name);
    this.image = ko.observable(thisCat.image);
	this.clicked= ko.observable(thisCat.timesClicked);
	this.nicknames = ko.observableArray(thisCat.nickNames);

	this.stage = ko.computed(function(){
		var clicks = this.clicked();
		if (clicks <10) {
			return ("Newborn")
		}
		else if (clicks<50) {
			return ("Infant")
		}
		else if (clicks<100){
			return ("Child")
		}
		else if (clicks <200){
			return ("Teen")
		}
		else if (clicks < 500){
			return ("Adult")
		}
		else {
			return ("Ninja")
		}
	},this);	
}

var viewModel = function(){
	var self = this; //alows you to access variables out side of incrementClicked within viewModel.
	
	self.catList = ko.observableArray([]);
	
	initialCats.forEach(function(catItem){
		self.catList.push(new Cat(catItem));
	});
	
	currentCat = ko.observable (this.catList()[0]);
	
	this.inputName = ko.observable(this.currentCat.peek().catName.peek());
	this.inputURL = ko.observable(this.currentCat.peek().image.peek());
	this.inputClicked = ko.observable(this.currentCat.peek().clicked.peek());

	self.incrementClicked = function(){
		currentCat().clicked(currentCat().clicked()+1);
	}
	
	this.catMenuClick = function(clickedCat){
		currentCat(clickedCat);
		
		self.inputName(self.currentCat.peek().catName.peek());
		self.inputURL(self.currentCat.peek().image.peek());
		self.inputClicked(self.currentCat.peek().clicked.peek());
	};
	
	this.saveClick = function(){
		self.currentCat().catName(self.inputName.peek());
		self.currentCat().image(self.inputURL.peek());
		if(/^[0-9]+$/.test(self.inputClicked.peek(), 10)){
			self.currentCat().clicked(self.inputClicked.peek());
		}
	}
	
	this.resetClick = function(){
		self.inputName(self.currentCat.peek().catName.peek());
		self.inputURL(self.currentCat.peek().image.peek());
		self.inputClicked(self.currentCat.peek().clicked.peek());
	}
};

var viewAdmin={
	init: function(){
		this.show = false;
		$("button#admin-button").click(function(event){ viewAdmin.toggleMenu()});
	},
	toggleMenu: function(){
		if (this.show){
			this.show=false
			$("#menu").addClass('hidden');
		}
		else {
			this.show=true
			$("#menu").removeClass('hidden');
		}
	}
}


$(document).ready(function(){
		viewAdmin.init();
		ko.applyBindings(viewModel);
});
