TABGAME.Game = function(game) {};
TABGAME.Game.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-bg');
		this.add.sprite(0, 0, 'panel');
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.fontSmall = { font: "16px Arial", fill: "#e4beef" };
		this.fontBig = { font: "16px Arial", fill: "#e4beef" };
		this.fontMessage = { font: "24px Arial", fill: "#e4beef",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 6;
		this.movementForce = 10;
		this.Posini_canica = { x: TABGAME._WIDTH*0.5, y: 450 };

		this.pauseButton = this.add.button(TABGAME._WIDTH-8, 8, 'button-pause', this.Pausar, this);
		this.pauseButton.anchor.set(1,0);
		this.pauseButton.input.useHandCursor = true;
		this.timerText = this.game.add.text(15, 15, "Time: "+this.timer, this.fontBig);
		this.levelText = this.game.add.text(120, 10, "Level: "+this.level+" / "+this.maxLevels, this.fontSmall);
		this.totalTimeText = this.game.add.text(120, 30, "Total time: "+this.totalTimer, this.fontSmall);

		this.llegada = this.add.sprite(TABGAME._WIDTH*0.5, 90, 'llegada');
		this.physics.enable(this.llegada, Phaser.Physics.ARCADE);
		this.llegada.anchor.set(0.5);
		this.llegada.body.setSize(2, 2);

		this.canica = this.add.sprite(this.Posini_canica.x, this.Posini_canica.y, 'canica');
		this.canica.anchor.set(0.5);
		this.physics.enable(this.canica, Phaser.Physics.ARCADE);
		this.canica.body.setSize(18, 18);
		this.canica.body.bounce.set(0.3, 0.3);


		this.initNiveles();
		this.mostrar_lvl(1);
		this.keys = this.game.input.keyboard.createCursorKeys();

		TABGAME._player = this.canica;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.time.events.loop(Phaser.Timer.SECOND, this.actualizar_tiempo, this);

		this.bordes = this.add.group();
		this.bordes.enableBody = true;
		this.bordes.physicsBodyType = Phaser.Physics.ARCADE;
		this.bordes.create(0, 50, 'border-horizontal');
		this.bordes.create(0, TABGAME._HEIGHT-2, 'border-horizontal');
		this.bordes.create(0, 0, 'border-vertical');
		this.bordes.create(TABGAME._WIDTH-2, 0, 'border-vertical');
		this.bordes.setAll('body.immovable', true);
	},

	initNiveles: function() {
		this.niveles = [];
		this.const_nivel = [
			[
				{ x: 21, y: 224, t: 'w' },
				{ x: 21, y: 124, t: 'w' },
				{ x: 21, y: 324, t: 'w' },
				{ x: 242, y: 350, t: 'h' },
				{ x: 146, y: 324, t: 'p' }
			],
			[
				{ x: 96, y: 224, t: 'w' }
			],
			[
				{ x: 72, y: 320, t: 'w' },
				{ x: 200, y: 320, t: 'h' },
				{ x: 72, y: 150, t: 'w' }
			],
			[
				{ x: 64, y: 352, t: 'h' },
				{ x: 224, y: 352, t: 'h' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 128, y: 240, t: 'w' },
				{ x: 200, y: 52, t: 'h' }
			],
			[
				{ x: 78, y: 352, t: 'h' },
				{ x: 78, y: 320, t: 'w' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 192, y: 240, t: 'w' },
				{ x: 30, y: 150, t: 'w' },
				{ x: 158, y: 150, t: 'w' }
			],
			[
				{ x: 188, y: 352, t: 'h' },
				{ x: 92, y: 320, t: 'w' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 128, y: 240, t: 'w' },
				{ x: 256, y: 240, t: 'h' },
				{ x: 180, y: 52, t: 'h' },
				{ x: 52, y: 148, t: 'w' }
			]

		];
		//enlazando los datos de las matrices anteriores
		for(var i=0; i<this.maxLevels; i++) {
			var nivel_nuevo = this.add.group();
			nivel_nuevo.enableBody = true;
			nivel_nuevo.physicsBodyType = Phaser.Physics.ARCADE;
			for(var j=0; j<this.const_nivel[i].length; j++) {
				var item = this.const_nivel[i][j];
				nivel_nuevo.create(item.x, item.y, 'element-'+item.t);
			}
			nivel_nuevo.setAll('body.immovable', true);
			nivel_nuevo.visible = false;
			this.niveles.push(nivel_nuevo);
		}
	},

	mostrar_lvl: function(level) {
		var lvl = level | this.level;
		if(this.niveles[lvl-2]) {
			this.niveles[lvl-2].visible = false;
		}
		this.niveles[lvl-1].visible = true;
	},

	actualizar_tiempo: function() {
		this.timer++;
		this.timerText.setText("Tiempo: "+this.timer);
		this.totalTimeText.setText("Tiempo total: "+(this.totalTimer+this.timer));
	},

	Pausar: function() {
		this.game.paused = true;
		var pausedText = this.add.text(TABGAME._WIDTH*0.5, 250, "Game paused,\ntap anywhere to continue.", this.fontMessage);
		pausedText.anchor.set(0.5);
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused = false;
		}, this);
	},

	update: function() {
		if(this.keys.left.isDown) {
			this.canica.body.velocity.x -= this.movementForce;
		}
		else if(this.keys.right.isDown) {
			this.canica.body.velocity.x += this.movementForce;
		}
		if(this.keys.up.isDown) {
			this.canica.body.velocity.y -= this.movementForce;
		}
		else if(this.keys.down.isDown) {
			this.canica.body.velocity.y += this.movementForce;
		}
		this.physics.arcade.collide(this.canica, this.bordes,null, null, this);
		this.physics.arcade.collide(this.canica, this.niveles[this.level-1], this.preguntas, null, this);
		this.physics.arcade.overlap(this.canica, this.llegada, this.fin_lvl, null, this);
	},

	/*initPreg: function() {
		this.preg = [];
		this.const_preg = [
			[
				"No hay ningun planeta llamado marte",
				"No hay ningun planeta llamado marte",
				"No hay ningun marte"
			],
			[
	 			"No hay ningun planeta llamado marte"
			],
			[
				"No hay ningun marte"
			]

		];
	},
*/
	preguntas: function(){
		//var tmp=Math.round(Math.random()*3);
		//var tmp2="";
	 	//tmp2=this.const_preg[0];
		//alert(tmp2);
		//confirm(this.initPreg[this.const_preg[level-1]][tmp].t);
	},

	fin_lvl: function() {
		if(this.level >= this.maxLevels) {
			this.totalTimer += this.timer;
			alert('FELICIDADES!!!! TERMINASTE EL JUEGO\nTiempo total: '+this.totalTimer+' segundos!');
			this.game.state.start('MainMenu');
		}
		else {
			alert('BIEN!!, nivel '+this.level+' completado!');
			this.totalTimer += this.timer;
			this.timer = 0;
			this.level++;
			this.timerText.setText("Time: "+this.timer);
			this.totalTimeText.setText("Total time: "+this.totalTimer);
			this.levelText.setText("Level: "+this.level+" / "+this.maxLevels);
			this.canica.body.x = this.Posini_canica.x;
			this.canica.body.y = this.Posini_canica.y;
			this.canica.body.velocity.x = 0;
			this.canica.body.velocity.y = 0;
			this.mostrar_lvl();
		}
	}
};
