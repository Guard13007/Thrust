var GUI={
	main:null,
	friction:null,
	thruster:null
};
var Render={
	canvas:null,
	context:null,
	iterationDelay:33
};
var Game={
	gravitationalAcceleration:0.5,

	exhaustSpread:1.2,
	exhaustRandomness:0.3,
	minExhaustVelocity:16,
	maxExhaustVelocity:20,
	thrusterAcceleration:1,
	thrusterParticles:2,

	shipBorderRebound:0.35,
	shipBorderFriction:0.8,
	shipDrag:0.99,

	particleDrag:0.9,

	ships:[],
	playerID:0,

	loop:function(){
		forEach(Game.ships,function(b){
			//apply Ship velocity
			b.x+=b.v.x;
			b.y+=b.v.y;
			//Ship to border collisions
			if (b.y > window.innerHeight-b.height/2) {
				b.y = window.innerHeight-b.height/2;
				b.v.y=-b.v.y*Game.shipBorderRebound;
				b.v.x*=Game.shipBorderFriction;
			} else if (b.y < b.height/2) {
				b.y = b.height/2;
				b.v.y=-b.v.y*Game.shipBorderRebound;
				b.v.x*=Game.shipBorderFriction;
			}
			if (b.x > window.innerWidth-b.width/2) {
				b.x = window.innerWidth-b.width/2;
				b.v.x=-b.v.x*Game.shipBorderRebound;
				b.v.y*=Game.shipBorderFriction;
			} else if (b.x < b.width/2) {
				b.x = b.width/2;
				b.v.x=-b.v.x*Game.shipBorderRebound;
				b.v.y*=Game.shipBorderFriction;
			}
			forEach(b.particles,function(a){
				//apply Particle velocity
				a.x+=a.v.x;
				a.y+=a.v.y;
				//Particle to border collision
				if (a.y > window.innerHeight-a.height/2) {
					a.y = window.innerHeight-a.height/2;
					a.v.y=-a.v.y;
				} else if (a.y < a.height/2) {
					a.y = a.height/2;
					a.v.y=-a.v.y;
				}
				if (a.x > window.innerWidth-a.width/2) {
					a.x = window.innerWidth-a.width/2;
					a.v.x=-a.v.x;
				} else if (a.x < a.width/2) {
					a.x = a.width/2;
					a.v.x=-a.v.x;
				}
				//Particle to Ship collision
				if (a.x-a.width/2  < b.x+b.width/2  &&
					a.x+a.width/2  > b.x-b.width/2  &&
					a.y-a.height/2 < b.y+b.height/2 &&
					a.y+a.height/2 > b.y-b.height/2
				) {
					a.v.x+=b.v.x;
					a.v.y+=b.v.y;
					/*if(b.v.x>0 && ship.v.x>0 || b.v.x<0 && ship.v.x<0){
						b.v.x+=ship.v.x;
					}else{
						b.v.x-=ship.v.x;
					}
					if(b.v.y>0 && ship.v.y>0 || b.v.y<0 && ship.v.y<0){
						b.v.y+=ship.v.y;
					}else{
						b.v.y-=ship.v.y;
					}*/
				}
				//update Particle velocity
				a.v.x*=Game.particleDrag;
				a.v.y*=Game.particleDrag;
				a.v.x+=random.number(-Game.exhaustRandomness*a.v.x,Game.exhaustRandomness*a.v.x);
				a.v.y+=random.number(-Game.exhaustRandomness*a.v.y,Game.exhaustRandomness*a.v.y);
			});
			//update Ship velocity (gravity / drag)
			b.v.y+=Game.gravitationalAcceleration;
			b.v.x*=Game.shipDrag;
			b.v.y*=Game.shipDrag;
		});
		//apply Ship thrust
		if (io.keysHeld[Jenjens.keys.w] || io.keysHeld[Jenjens.keys.up]) {
			Game.ships[Game.playerID].v.y-=Game.thrusterAcceleration;
			Game.ships[Game.playerID].exhaust('down',Game.thrusterParticles);
		}
		if (io.keysHeld[Jenjens.keys.a] || io.keysHeld[Jenjens.keys.left]) {
			Game.ships[Game.playerID].v.x-=Game.thrusterAcceleration;
			Game.ships[Game.playerID].exhaust('right',Game.thrusterParticles);
		}
		if (io.keysHeld[Jenjens.keys.s] || io.keysHeld[Jenjens.keys.down]) {
			Game.ships[Game.playerID].v.y+=Game.thrusterAcceleration;
			Game.ships[Game.playerID].exhaust('up',Game.thrusterParticles);
		}
		if (io.keysHeld[Jenjens.keys.d] || io.keysHeld[Jenjens.keys.right]) {
			Game.ships[Game.playerID].v.x+=Game.thrusterAcceleration;
			Game.ships[Game.playerID].exhaust('left',Game.thrusterParticles);
		}
		//clear canvas
		Jenjens.render.clear(Render.context);
		//draw and update Particles
		forEach(Game.ships,function(b){
			forEach(b.particles,function(a){
				a.draw(Render.context);
				a.effect();
			});
		});
		//draw Ships
		forEach(Game.ships,function(b){
			b.draw(Render.context);
		});

		setTimeout(Game.loop,Render.iterationDelay);
	}
};

io.addEvent('keydown',io.keyDown);
io.addEvent('keyup',io.keyUp);
io.addEvent('load',function(){
	//set up canvas
	Render.canvas=document.getElementsByTagName('canvas')[0];
	Render.canvas.width=window.innerWidth;
	Render.canvas.height=window.innerHeight;
	Render.context=Render.canvas.getContext('2d');

	//set up GUI
	GUI.main=new dat.GUI();
	GUI.main.add(Render,'iterationDelay',{Max:1,'60':17,'30':33,'10':100,Min:2000}).name("FPS");

	GUI.main.add(Game,'gravitationalAcceleration',0,2).step(0.1).name("g");
	GUI.friction=GUI.main.addFolder("Friction");
	GUI.friction.add(Game,'shipBorderRebound',0.05,1).step(0.05);
	GUI.friction.add(Game,'shipBorderFriction',0.05,1).step(0.05);
	GUI.friction.add(Game,'shipDrag',0.9,1).step(0.01);
	GUI.friction.add(Game,'particleDrag',0.5,1).step(0.05);
	GUI.thruster=GUI.main.addFolder("Thruster");
	GUI.thruster.add(Game,'thrusterParticles',1,10).step(1);
	GUI.thruster.add(Game,'thrusterAcceleration',0.1,5).step(0.1);
	GUI.thruster.add(Game,'exhaustSpread',0,10).step(0.2);
	GUI.thruster.add(Game,'exhaustRandomness',0.05,1).step(0.05);
	GUI.thruster.add(Game,'minExhaustVelocity',10,20).step(2);
	GUI.thruster.add(Game,'maxExhaustVelocity',10,30).step(2);

	//create Ship
	Game.ships.push(new Ship(window.innerWidth/2,window.innerHeight/2));

	//add Ship data to GUI
	/*GUI.thruster.add(Game.ships[Game.playerID],'particleType',{
		standard:Particle.effects.standard,
		redFlame:Particle.effects.redFlame,
		cyanFlame:Particle.effects.cyanFlame
	});*/

	//start main loop
	Game.loop();
});
io.addEvent('resize',function(){
	Render.canvas.width=window.innerWidth;
	Render.canvas.height=window.innerHeight;
});
