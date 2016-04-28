var circleCreator = (function(){

	var Shape = shapeCreator.Shape;
	var getRandomInt = utils.getRandomInt;

	function Circle(radius, loc, speed, traj, col){
		Shape.apply(this, [speed, traj, col]);
		this.radius = radius || this.calcRadius();
		this.loc = loc || this.randomLoc();
	}

	Circle.prototype = Object.create(Shape.prototype);

	Circle.prototype.constructor = Circle;

	Circle.prototype.calcRadius = function(){
		 return getRandomInt([0, 50]);
	};

	Circle.prototype.randomLoc = function() {
		var potentialX = getRandomInt([0 + this.radius, canvasWidth - this.radius]);
		var potentialY = getRandomInt([0 + this.radius, canvasHeight - this.radius]);
		
		var count = 0;
		var extremities = this.extremities.call({radius: this.radius, loc: [potentialX, potentialY]}, {radius: this.radius, loc: [potentialX, potentialY]});	

		while (!this.overlapCheck(extremities)) {
			potentialX = getRandomInt([0 + this.radius, canvasWidth - this.radius]);
			potentialY = getRandomInt([0 + this.radius, canvasHeight - this.radius]);
			extremities = this.extremities.call({radius: this.radius, loc: [potentialX, potentialY]}, {radius: this.radius, loc: [potentialX, potentialY]});
			count++;
			if (count >= 500) {throw "cannot find space";}
		}
		return [potentialX, potentialY];
	};


	Circle.prototype.clear = function(){
		ctx.clearRect(this.loc[0] - this.radius, this.loc[1] - this.radius, this.radius * 2, this.radius * 2);
	};

	Circle.prototype.extremities = function(){
		return {XMax: this.loc[0] + this.radius, XMin: this.loc[0] - this.radius, YMax: this.loc[1] + this.radius, YMin: this.loc[1] - this.radius};
	};

	Circle.prototype.circumPoints = function(){
		points = [];
		for (var x = 1; x < 360; x++){
			points.push([Math.round(this.radius * Math.sin(x * Math.PI / 180) + this.loc[0]), Math.round(this.radius * Math.cos(x * Math.PI / 180) + this.loc[1])]);
		}
		return points;
	};



	Circle.prototype.moveDraw = function(){
		ctx.beginPath();
		ctx.fillStyle = this.col;
		ctx.arc(this.loc[0] += (this.traj[0] * this.speed[0]), this.loc[1] += (this.traj[1] * this.speed[1]),this.radius,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
	};

	Circle.prototype.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = this.col;
		ctx.arc(this.loc[0],this.loc[1],this.radius,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
	};

	return {Circle: Circle};

}());