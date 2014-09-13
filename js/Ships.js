/**
 * @copyright 2014 Paul Liverman III
 */
/**
 * @constructor
 * @description Creates rectangular object that can fire out Particles and move about.
 * @see Particle
 * @param {number} [x=0] - X position.
 * @param {number} [y=0] - Y position.
 * @param {object} [particleType=Particle.effects.redFlame] - Type of Particle effect to use.
 *
 * @property {string} [color="blue"] - Color of object.
 * @property {number} [x=0] - X position.
 * @property {number} [y=0] - Y position.
 * @property {number} [width=40] - Width.
 * @property {number} [height=40] - Height.
 * @property {vector} [v=new vector()] - Velocity.
 * @property {Array} [particles=[]] - Particles created by this Ship.
 * @property {object} [particleType=Particle.effects.redFlame] - Type of Particle effect to use.
 */
var Ship=function(x,y,particleType){
	this.color="blue";
	x? this.x=x : this.x=0;
	y? this.y=y : this.y=0;
	this.width=40;
	this.height=40;
	/**
	 * @see http://guard13007.github.io/Jenjens/docs
	 * @todo Update link when Jenjens.physics.vector() documented.
	 */
	this.v=new vector();
	this.particles=[];

	if (particleType) this.particleType=particleType;
};
Ship.prototype={
	particleType:Particle.effects.redFlame,
	/**
	 * @description Draws the Ship according to its color, x/y, and width/height.
	 * @param {object} context - Which canvas context to draw to.
	 */
	draw:function(context){
		context.fillStyle=this.color;
		context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
	},
	/**
	 * @description Creates a new Particle based on direction Ship is thrusting.
	 * @see Particle
	 * @param {string} direction - Which direction to generate in.
	 * @param {number} [amount=1] - How many to generate.
	 */
	exhaust:function(direction,amount){
		for (var i=0;i<amount;i++){
			var particle = new Particle(
				{x:this.x,y:this.y},
				this.particleType,
				{width:random.number(1,10),height:random.number(1,10)},
				{x:this.v.x,y:this.v.y},
				this.particles
			);

			if (direction=='up') {
				particle.x+=random.number(-this.width/2,this.width/2);
				particle.y-=this.height/2;
				particle.v.x+=random.number(-Game.exhaustSpread,Game.exhaustSpread);
				particle.v.y-=random.number(Game.minExhaustVelocity,Game.maxExhaustVelocity);
			} else if (direction=='left') {
				particle.x-=this.width/2;
				particle.y+=random.number(-this.height/2,this.height/2);
				particle.v.x-=random.number(Game.minExhaustVelocity,Game.maxExhaustVelocity);
				particle.v.y+=random.number(-Game.exhaustSpread,Game.exhaustSpread);
			} else if (direction=='right') {
				particle.x+=this.width/2;
				particle.y+=random.number(-this.height/2,this.height/2);
				particle.v.x+=random.number(Game.minExhaustVelocity,Game.maxExhaustVelocity);
				particle.v.y+=random.number(-Game.exhaustSpread,Game.exhaustSpread);
			} else if (direction=='down') {
				particle.x+=random.number(-this.width/2,this.width/2);
				particle.y+=this.height/2;
				particle.v.x+=random.number(-Game.exhaustSpread,Game.exhaustSpread);
				particle.v.y+=random.number(Game.minExhaustVelocity,Game.maxExhaustVelocity);
			}

			this.particles.push(particle);
		}
	}
};
