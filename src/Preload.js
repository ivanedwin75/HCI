TABGAME.Preload = function(game) {};
TABGAME.Preload.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((TABGAME._WIDTH-297)*0.5, (TABGAME._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((TABGAME._WIDTH-158)*0.5, (TABGAME._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('canica', 'img/ball.png');
		this.load.image('llegada', 'img/hole.png');
		this.load.image('element-w', 'img/element-w.png');
		this.load.image('element-h', 'img/element-h.png');
		this.load.image('element-p', 'img/element-p.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('screen-bg', 'img/screen-bg.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');
		this.load.image('border-horizontal', 'img/border-horizontal.png');
		this.load.image('border-vertical', 'img/border-vertical.png');

		this.load.spritesheet('button-start', 'img/button-start.png', 146, 51);
		this.load.spritesheet('button-menu', 'img/button-menu.png');

	},
	create: function() {
		this.game.state.start('MainMenu');
	},
};
