/**
 * @copyright 2014 Paul Liverman III
 */
/**
 * @constructor
 * @description Creates a rectangular object to be used with other Particles for basic particle effects.
 * @param {object} [location={x:0,y:0}] - Center of Particle.
 * @param {object} [effect={r:255,g:255,b:255,method:function()}] - Define starting color and method to execute on each call to Particle.effect()
 * @param {object} [size={width:1,height:1}] - Size of Particle.
 * @param {object} [speed={x:0,y:0}] - Velocity of Particle.
 * @param {object|Array} [parent] - A parent object can be specified, helps with the remove() method.
 *
 * @property {number} x - X position.
 * @property {number} y - Y position.
 * @property {Array} color - Color as [R,G,B]
 * @property {function} effect - Called to modify Particle.
 * @property {number} width - Width.
 * @property {number} height - Height.
 * @property {vector} v - Velocity.
 * @see http://guard13007.github.io/Jenjens/docs
 * @todo Update the linkie.
 * @property {object} [parent] - Parent object, used in Particle.remove()
 * @property {function} onCreate - Called if it exists when it is created.
 */
var Particle=function(location,effect,size,speed,parent){
	if (location) {
		this.x=location.x;
		this.y=location.y;
	} else {
		this.x=0;
		this.y=0;
	}

	if (!effect) // If no effect, use standard.
		var effect=Particle.effects.standard;
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
	 * @see http://guard13007.github.io/Jenjens/docs
	 * @todo Update link above to proper link once Jenjens.physics.vector() is documented.
	 * @todo Figure out why this part of the documentation seems to be ignored.
	 */
	this.v=new vector(speed.x,speed.y);

	if (parent) this.parent=parent;

	if (effect.onCreate) {
		this.onCreate=effect.onCreate;
		this.onCreate();
	}
};
/**
 * @description Defined Particle effects available.
 * @property {object} standard - White slowly fading to black.
 * @property {object} redFlame - Red fading through orange to yellow to white to black.
 * @property {object} cyanFlame - Cyan color fading to white through a slight purple to black.
 * @property {object} rainbow - Random colors changing randomly until they break.
 */
Particle.effects={
	standard:{
		r:255,g:255,b:255,
		method:function(){
			this.color[0]-=1;
			this.color[1]-=1;
			this.color[2]-=1;
			if (this.color[0] < 1) this.remove();
		}
	},
	redFlame:{
		r:240,g:0,b:0,
		method:function(){
			if (this.color[1] < this.color[0]) {
				this.color[1]+=12;
			} else if (this.color[2] < this.color[0]) {
				this.color[0]-=12;
				this.color[1]-=12;
				this.color[2]-=12;
			}
			if (this.color[0] < 1) this.remove();
		}
	},
	cyanFlame:{
		r:0,g:200,b:250,
		method:function(){
			//this.color
			if (this.color[0] < this.color[2]) {
				this.color[0]+=25;
			} else {
				this.color[0]-=12;
				this.color[1]-=9;
				this.color[2]-=12;
			}
			if (this.color[0] < 1) this.remove();
		}
	},
	rainbow:{
		r:0,g:0,b:0,
		method:function(){
			this.color[0]+=random.integer(-33,33);
			this.color[1]+=random.integer(-33,33);
			this.color[2]+=random.integer(-33,33);
			if (this.color[0]>255 || this.color[0]<0 ||
				this.color[1]>255 || this.color[1]<0 ||
				this.color[2]>255 || this.color[2]<0)
				this.remove();
		},
		onCreate:function(){
			this.color[0]=random.integer(0,255);
			this.color[1]=random.integer(0,255);
			this.color[2]=random.integer(0,255);
		}
	}
};
Particle.prototype={
	/**
	 * @description If parent is an Array, splices itself out of parent. Then deletes itself.
	 */
	remove:function(){
		if (this.parent) {
			if (this.parent.splice) {
				this.parent.splice(this.parent.indexOf(this),1);
			}
			delete this;
		}
	},
	/**
	 * @description Draws the Particle according to its color, x/y, and width/height.
	 * @param {object} context - Which canvas context to draw to.
	 */
	draw:function(context) {
		context.fillStyle="rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
		context.translate(this.x,this.y);
		context.rotate(0);
		context.fillRect(-this.width/2,-this.height/2,this.width,this.height);
		context.rotate(0);
		context.translate(-this.x,-this.y);
	}
};
