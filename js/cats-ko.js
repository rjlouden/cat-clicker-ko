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
	this.clicked= ko.observable(0);
	this.nicknames = ko.observableArray(thisCat.nickNames);
/*	nicknames = ko.observableArray([
	{"name": "huggy"},
	{"name":"lovey"},
	{"name":"family"},
	{"name":"sisters"}]); 
*/	
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
		else if (click < 500){
			return ("Adult")
		}
		else {
			return ("Ninja")
		}
	},this);	
}

var viewModel = function(){
	var self = this; //alows you to access variables out side of incrementClicked within viewModel.
	
	this.catList = ko.observableArray([]);
	
	initialCats.forEach(function(catItem){
		self.catList.push(new Cat(catItem));
	});
	
	this.currentCat = ko.observable (this.catList()[0]);
	this.currentCat.extend({notify:'always'});
	
	this.incrementClicked = function(){
		this.clicked(this.clicked()+1);
	}

	this.catMenuClick = function(clickedCat){
		currentCat(clickedCat);
	}
}

var viewAdmin = {
	init: function(){
		this.jPM = $.jPanelMenu({
				openPosition: "23%",
				closeOnContentClick: false//,
		//		afterOpen: function(){
		//		viewAdmin.render();
		//		viewMenu.updatePanel(true);
		//		viewCat.updatePanel(true);
		//	},
		//	afterClose: function(){
		//		viewMenu.updatePanel(false);
		//		viewCat.updatePanel(false);
		//	}
		});
        this.jPM.on();	
	}
};
$(document).ready(function(){
		viewAdmin.init();
		ko.applyBindings(viewModel);
});
