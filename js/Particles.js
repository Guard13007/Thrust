var Exhaust=function(x,y,Vx,Vy){
	this.x=x;
	this.y=y;
	this.width=4;
	this.height=8;
	this.color=[240,0,0];
	this.v=new vector(Vx,Vy);
};
Exhaust.prototype.draw=function(){
	context.fillStyle="rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	//context.fillStyle="rgb("+this.color+","+this.color+","+this.color+")";
	context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
};
