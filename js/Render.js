/**
 * @copyright 2014 Paul Liverman III
 */

/**
 * @namespace
 * @description Canvas/Context and how fast to render (also controls how fast physics/particles are simulated).
 * @property {object} canvas - The canvas element.
 * @property {object} context - The context object.
 * @property {number} iterationDelay - How long to wait between each iteration.
 */
var Render={
	canvas:null,
	context:null,
	iterationDelay:1000/30,
	draw:function(){
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
	}
};

/** @description Sets up canvas. */
io.addEvent('load',function(){
	Render.canvas=document.getElementsByTagName('canvas')[0];
	Render.canvas.width=window.innerWidth;
	Render.canvas.height=window.innerHeight;
	Render.context=Render.canvas.getContext('2d');
}
