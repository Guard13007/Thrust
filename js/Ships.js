var Ship=function(x,y){
	this.color="blue";
	this.x=x;
	this.y=y;
	this.width=40;
	this.height=40;
	this.v=new vector();
	this.exhaust=[];
};
Ship.prototype.draw=function(context){
	context.fillStyle=this.color;
	context.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
};
