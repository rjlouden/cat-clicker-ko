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
	//console.log(this.currentCat().catName());
	//this.currentCat.extend({notify:'always'});
	
	this.incrementClicked = function(){
		this.clicked(this.clicked()+1);
	}

	//this.currentCat().clicked.subscribe(function(newValue){
	//	console.log("s2");
	//	if(viewAdmin.jPM.isOpen()){
	//		console.log("subscribed");
	//		//viewAdmin.render();
	//	}
	//});
	
	this.catMenuClick = function(clickedCat){
		currentCat(clickedCat);
	};
	
/*var viewAdmin = {
	init: function(){
		this.jPM = $.jPanelMenu({
				openPosition: "23%",
				closeOnContentClick: false,
				afterOpen: function(){
				viewAdmin.render();
				viewAdmin.updatePanel(true);
			},
			afterClose: function(){
				viewAdmin.updatePanel(false);
			}
		});
        this.jPM.on();

		this.catName = document.getElementsByName("cat-name-input")[1];
		this.catURL = document.getElementsByName("cat-url-input")[1];
		this.catClicked = document.getElementsByName("clicked-input")[1];		
	},
	"updatePanel": function (inPanel){
		if(inPanel) {
			$("#main").addClass('panel'); }
		else {
			$("#main").removeClass('panel');
		}
	},
	render: function(){
	var thisCat=self.currentCat();

	$("button#save").click(function(event){ viewAdmin.saveEvent()});
	$("button#reset").click(function(event){ viewAdmin.render()});	

	viewAdmin.catName.value=thisCat.catName();
	viewAdmin.catURL.value=thisCat.image();
	viewAdmin.catClicked.value=thisCat.clicked();
		
	},
	saveEvent: function(){
		var thisCat=self.currentCat();
		
		if (thisCat.catName() !== this.catName.value || 
		thisCat.image() !== this.catURL.value || 
		thisCat.clicked() !== this.catClicked.value){
			if (/^[0-9]+$/.test(this.catClicked.value, 10)){
				thisCat.catName(this.catName.value);
				thisCat.image(this.catURL.value);
				thisCat.clicked(this.catClicked.value); 
			}
			
		}
	}
}
*/
//viewAdmin.init();
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
