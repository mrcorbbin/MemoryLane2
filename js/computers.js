/*

li.list-inline-item
	div.card
		div.p-3
			h4 = Name
			ul
				li SPEED
				li STORAGE
				li PRICE
			div.text-center
				button.btn.btn-primary.btn-lg
					(data-toggle="modal" data-target="#myModal")

*/

var COMPUTERS = {}

function Computer(conf){
	this.name = conf.name;
	this.speed = conf.speed;
	this.space = 40309100;
	this.price = conf.price || 1999.99;
	this.description = conf.description || "";
	this.sell_price = 200;
	this.bought = conf.bought || false;
	this.mods = [];
	this.card = new ComputerCard(this);
	if (conf.bought == true){
		this.card.buy();
	}
	this.forpreference = conf.pref || "mac";
	COMPUTERS[this.name] = this;
}

Computer.prototype.buy = function() {
	if (GAME.buy(this.price) == true){
		this.bought = true;
		GAME.computer = this;
		this.card.buy();
		GAME.createTransaction("computer",this.name);
	}
	else {
		alert("You don't have "+ this.price + " to spend...")
	}
};

Computer.prototype.buysell = function () {
	var me = this;
	if (this.bought){
		var msg = new ModalMessage("Are you sure?","Are you sure you want to sell this computer?","#modal_message","#modal_title")
		msg.show(function(){
			me.bought = false;
			$(me.card.price.element).html("Buy price: $" + me.buy_price);
			$(me.card.btn.element).addClass("btn-success");
			$(me.card.btn.element).removeClass("btn-primary");
			$(me.card.btn.element).html("buy");
			GAME.money += me.sell_price
		})
	}
	else {
		var msg = new ModalMessage("Are you sure?","Are you sure you want to buy this computer?","#modal_message","#modal_title")
		msg.show(function(){
			if (GAME.buy(me.buy_price) == true){
				me.bought = true;
				$(me.card.price.element).html("Sell price: $" + me.sell_price);
				$(me.card.btn.element).removeClass("btn-success");
				$(me.card.btn.element).addClass("btn-primary");
				$(me.card.btn.element).html("sell");
			}
		})
	}
}

Computer.prototype.getSpeed = function() {
	var total = 0;
	for (var i = 0; i < this.mods.length; i++) {
		total += this.mods[i].speed;
	};
	return this.speed + total;
};

Computer.PowerBook100 = new Computer({
	name : "PowerBook100",
	speed : 1525244,
	bought : true,
	description : "Personal Computing. The easy way.",
})

Computer.PowerBookG4 = new Computer({
	name : "PowerBook G4",
	speed : 6025244,
	description : "More. Is more. Presenting the world's first 17\" notebook computer."
})

Computer.MacBookPro = new Computer({
	name : "MacBook Pro",
	speed : 32083244,
	price : 4000,
	description : "8 hours of battery life."
})

Computer.MacBookPro2013 = new Computer({
	name : "MacBook Pro 2013",
	speed : 128083244,
	price : 400000,
	description : "16 hours of battery life."
})

Computer.MacBookPro2020 = new Computer({
	name : "MacBook Pro 2020",
	speed : 5120832404,
	price : 5000000,
	description : "39 hours of battery life."
})


Computer.MacSheetPro2028 = new Computer({
	name : "MacSheet Pro 2028",
	speed : 78006324040,
	price : 900000000,
	description : "7 days of battery life. Paper thin."
})

Computer.MacSheetPro2032 = new Computer({
	name : "MacSheet Pro 2032",
	speed : 345006324040,
	price : 1491040000,
	description : "12 days of battery life."
})

Computer.MacSheetPro2036 = new Computer({
	name : "MacSheet Pro 2036",
	speed : 7590006324040,
	price : 104918499148,
	description : "2 weeks of battery life."
})



Computer.mod = function (conf) {
	this.speed = conf.speed || 0;
	this.storage = conf.storage || 0;
}
