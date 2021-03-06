TABGAME.MainMenu = function(game) {};
TABGAME.MainMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-mainmenu');
		this.gameTitle = this.add.sprite(TABGAME._WIDTH*0.5, 40, 'title');
		this.gameTitle.anchor.set(0.5,0);
		this.startButton = this.add.button(TABGAME._WIDTH*0.5, 250, 'button-start', this.startGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
		this.menuButton = this.add.button(TABGAME._WIDTH*0.5, 170, 'button-menu', this.MenuOpcion, this, 2, 0, 1);
		this.menuButton.anchor.set(0.5,0);
		this.menuButton.input.useHandCursor=true;
	},

	startGame: function() {
		this.game.state.start('Game');
	},

	MenuOpcion:function(){
		this.game.state.menu('MenuOptions');
	},
};
