var Ship=function(x,y){
	this.color="blue";
	this.x=x;
	this.y=y;
	this.width=40;
	this.height=40;
	this.v=new vector();
	this.particles=[];
};
Ship.prototype={
	draw:function(context){
		context.fillStyle=this.color;
		context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
	},
	exhaust:function(direction,amount){
		//location,effect,size,speed,parent
		var particle = new Particle(
			{x:this.x,y:this.y},
			{r:240,g:0,b:0,method:function(){
				if (this.color[1] < this.color[0]) {
					this.color[1]+=12;
				} else if (this.color[2] < this.color[0]) {
					this.color[0]-=12;
					this.color[1]-=12;
					this.color[2]-=12;
				}
				if (this.color[0] < 1) this.remove();
			}},
			{width:random.number(1,10),height:random.number(1,10)},
			{x:this.v.x,y:this.v.y},
			this.particles
		);
		if (direction=='up') {
			particle.x+=random.number(-this.width/2,this.width/2);
			particle.y-=this.height/2;
			particle.v.x+=random.number(-Game.exhaustRandomness,Game.exhaustRandomness);
			particle.v.y-=random.number(Game.minExhaustVelocity,Game.maxExhaustVelocity);
		} else if (direction=='left') {
			particle.x-=this.width/2;
			particle.y+=random.number(-this.height/2,this.height/2);
			particle.v.x-=random.number(Game.minExhaustVelocity,Game.maxExhaustVelocity);
			particle.v.y+=random.number(-Game.exhaustRandomness,Game.exhaustRandomness);
		} else if (direction=='right') {
			particle.x+=this.width/2;
			particle.y+=random.number(-this.height/2,this.height/2);
			particle.v.x+=random.number(Game.minExhaustVelocity,Game.maxExhaustVelocity);
			particle.v.y+=random.number(-Game.exhaustRandomness,Game.exhaustRandomness);
		} else if (direction=='down') {
			particle.x+=random.number(-this.width/2,this.width/2);
			particle.y+=this.height/2;
			particle.v.x+=random.number(-Game.exhaustRandomness,Game.exhaustRandomness);
			particle.v.y+=random.number(Game.minExhaustVelocity,Game.maxExhaustVelocity);
		}

		this.particles.push(particle);
	}
};
