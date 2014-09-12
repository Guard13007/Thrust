/**
 * @copyright 2014 Paul Liverman III
 */
/**
 * @constructor
 * @param {object} [location={x:0,y:0}] - Center of Particle.
 * @param {object} [effect={r:255,g:255,b:255,method:function()}] - Define starting color and method to execute on each call to Particle.effect()
 * @param {object} [size={width:1,height:1}] - Size of Particle.
 * @param {object} [speed={x:0,y:0}] - Velocity of Particle.
 * @param {object|Array} [parent] - A parent object can be specified, helps with the remove() method.
 *
 * @property {number} [x=0] - X position.
 * @property {number} [y=0] - Y position.
 * @property {Array} [color=Particle.effects.standard {r,g,b}] - Color as [R,G,B]
 * @property {function} [effect=Particle.effects.standard.method] - Called to modify Particle.
 * @property {number} [width=1] - Width.
 * @property {number} [height=1] - Height.
 * @property {vector} [v=new vector(0,0)] - Velocity.
 * @property {object} [parent=undefined] - Parent object, used in Particle.remove()
 */
var Particle=function(location,effect,size,speed,parent){
	if (location) {
		this.x=location.x;
		this.y=location.y;
	} else {
		this.x=0;
		this.y=0;
	}

	if (!effect) { // If no effect, use standard.
		var effect=Particle.effects.standard;
	}
	this.color=[effect.r,effect.g,effect.b];
	this.effect=effect.method;

	if (size) {
		this.width=size.width;
		this.height=size.height;
	} else {
		this.width=1;
		this.height=1;
	}

	/**
	 * @todo Add a @see or something here to link to Jenjens.physics.vector()
	 */
	this.v=new vector(speed.x,speed.y);

	if (parent) this.parent=parent;
};
Particle.effects={
	standard:{
		r:255,g:255,b:255,
		method:function(){
			this.color[0]-=1;
			this.color[1]-=1;
			this.color[2]-=1;
			if (this.color[0] < 1) this.remove();
		}
	}
};
Particle.prototype={
	remove:function(){
		if (this.parent) {
			if (this.parent.splice) {
				this.parent.splice(this.parent.indexOf(this),1);
			}
			delete this;
		}
	},
	draw:function(context) {
		context.fillStyle="rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
		context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
	}
};
