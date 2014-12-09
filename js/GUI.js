/**
 * @copyright 2014 Paul Liverman III
 */

/**
 * @namespace
 * @description Contains objects for a GUI to modify simulation on the fly.
 * @property {object} main - The main dat.GUI object. Contains folders for other values.
 * @property {object} friction - A dat.GUI folder for friction values.
 * @property {object} thruster - A dat.GUI folder for thruster simulation.
 */
var GUI={
	main:null,
	friction:null,
	thruster:null,
	load:function(){
		//set up GUI
		GUI.main=new dat.GUI();
		GUI.main.add(Render,'iterationDelay',{Max:1,'60':1000/60,'30':1000/30,'10':100,Min:1000})
		.name("FPS");

		GUI.main.add(Game,'gravitationalAcceleration',0,2).step(0.1).name("g");
		GUI.friction=GUI.main.addFolder("Friction");
		GUI.friction.add(Game,'shipBorderRebound',0.05,1).step(0.05);
		GUI.friction.add(Game,'shipBorderFriction',0.05,1).step(0.05);
		GUI.friction.add(Game,'shipDrag',0.9,1).step(0.01);
		GUI.friction.add(Game,'particleDrag',0.5,1).step(0.05);
		GUI.friction.add(Game,'nullifyThreshold',0.1,1).step(0.1);

		GUI.thruster=GUI.main.addFolder("Thruster");
		GUI.thruster.add(Game,'thrusterParticles',1,20).step(1);
		GUI.thruster.add(Game,'thrusterAcceleration',0.05,4).step(0.05);
		GUI.thruster.add(Game,'exhaustSpread',0,14).step(0.2);
		GUI.thruster.add(Game,'exhaustRandomness',0.05,0.5).step(0.05);
		GUI.thruster.add(Game,'minExhaustVelocity',10,20).step(2);
		GUI.thruster.add(Game,'maxExhaustVelocity',12,28).step(2);

		//add Ship data to GUI
		GUI.thruster.add(Game,'particleType',['standard','redFlame','cyanFlame','rainbow'])
		.onChange(function(){
			if (Game.particleType=='standard') {
				Game.ships[Game.playerID].particleType=Particle.effects.standard;
			} else if (Game.particleType=='redFlame') {
				Game.ships[Game.playerID].particleType=Particle.effects.redFlame;
			} else if (Game.particleType=='cyanFlame') {
				Game.ships[Game.playerID].particleType=Particle.effects.cyanFlame;
			} else if (Game.particleType=='rainbow') {
				Game.ships[Game.playerID].particleType=Particle.effects.rainbow;
			}
		});
	}
};
