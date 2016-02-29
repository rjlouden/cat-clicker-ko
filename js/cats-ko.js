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

/*function updatePrimaryButton(catName){
	$(".menu-button").filter(":button").removeClass('btn-primary');

	var thisButton = $(".menu-button").filter(":contains('"+catName+"')").filter(function(){
		return $(this).text() == event.target.innerHTML;
	});

	thisButton.addClass('btn-primary');
} */

var viewModel = function(){
	var self = this; //alows you to access variables out side of incrementClicked within viewModel.
	
	//list of cats
	this.catList = ko.observableArray([]);
	
	initialCats.forEach(function(catItem){
		self.catList.push(new Cat(catItem));
	});
	
	this.currentCat = ko.observable (this.catList()[0]);
	
	//Cat in the Admin area.
	this.inputCat = ko.observable (new Cat ({
						name: this.currentCat.peek().catName.peek(),
						image: this.currentCat.peek().image.peek(),
						timesClicked: this.currentCat.peek().clicked.peek(),
						nickNames: this.currentCat.peek().clicked.peek()
						}));
	
	this.incrementClicked = function(){
		currentCat().clicked(currentCat().clicked()+1);
		inputCat().clicked(currentCat().clicked.peek());
	}
	
	this.catMenuClick = function(clickedCat, event){
		currentCat(clickedCat);
		
		self.updateInputCat()
		
		$(".menu-button").filter(":button").removeClass('btn-primary');
		$(event.currentTarget).addClass('btn-primary');
	};
	
	//Make inputCat match currentCat
	this.updateInputCat = function(){
		self.inputCat().catName(self.currentCat.peek().catName.peek());
		self.inputCat().image(self.currentCat.peek().image.peek());
		self.inputCat().clicked(self.currentCat.peek().clicked.peek());
	}
	
	//Update currentCat with inputCat
	this.saveClick = function(){
		self.currentCat().catName(self.inputCat().catName.peek());
		self.currentCat().image(self.inputCat().image.peek());
		if(/^[0-9]+$/.test(self.inputCat().clicked.peek(), 10)){
			self.currentCat().clicked(self.inputCat().clicked.peek());
		}
	}
};

//Configure Admin button and panel.
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
		//Setting initial Primary wouldn't work in viewModel
		$(($(".menu-button").filter(":button")[0])).addClass('btn-primary');
});
