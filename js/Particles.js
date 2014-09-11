var Particle=function(location,effect,size,speed,parent){ /*x,y,Vx,Vy*/
	if (location) {
		this.x=location.x;
		this.y=location.y;
	} else {
		this.x=0;
		this.y=0;
	}
	this.v=new vector(speed.x,speed.y);

	if (size) {
		this.width=size.width;
		this.height=size.height;
	} else {
		this.width=1;
		this.height=1;
	}

	if (effect) {
		this.color=[effect.r,effect.g,effect.b];
		this.effect=effect.method;
	} else {
		this.color=[255,255,255];
		//method is set by prototype
	}

	if (parent) this.parent=parent;
	/*this.x=x;
	this.y=y;
	this.width=4;
	this.height=8;
	this.color=[240,0,0];
	this.v=new vector(Vx,Vy);*/
};
Particle.effects={
	standard:function(){
		this.color[0]-=1;
		this.color[1]-=1;
		this.color[2]-=1;
		if (this.color[0] < 1) this.remove();
	}
};
Particle.prototype={
	effect:Particle.effects.standard,
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
/*Particle.prototype.draw=function(context){
	context.fillStyle="rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
};*/
