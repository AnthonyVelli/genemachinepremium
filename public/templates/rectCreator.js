var rectCreator = (function(){

	var Shape = shapeCreator.Shape;
	var getRandomInt = utils.getRandomInt;

	function Rect (leng, loc, speed, traj, col){
		Shape.apply(this, [speed, traj, col]);
		this.leng = leng || this.calcLeng();
		this.loc = loc || this.randomLoc();
	}

	Rect.prototype = Object.create(Shape.prototype);

	Rect.prototype.constructor = Rect;

	Rect.prototype.calcLeng = function(){
		 return [getRandomInt(0, 50), getRandomInt(0,50)];
	};

	Rect.prototype.clear = function(){
		ctx.clearRect(this.loc[0], this.loc[1], this.leng[0], this.leng[1]);
	};

	Rect.prototype.moveDraw = function(){
		ctx.fillStyle = this.col;
		ctx.fillRect(this.loc[0] += this.traj[0], this.loc[1] += this.traj[1], this.leng[0], this.leng[1]);
	};

	Rect.prototype.draw = function(){
		ctx.fillStyle = this.col;
		ctx.fillRect(this.loc[0], this.loc[1], this.leng[0], this.leng[1]);
	};

	Rect.prototype.randomLoc = function() {
		var potentialX = getRandomInt([0, canvasWidth - this.leng[0]]);
		var potentialY = getRandomInt([0, canvasHeight - this.leng[1]]);
		
		var count = 0;
		var extremities = this.extremities.call({leng: this.leng, loc: [potentialX, potentialY]}, {radius: this.radius, loc: [potentialX, potentialY]});	

		while (!this.overlapCheck(extremities)) {
			potentialX = getRandomInt([0, canvasWidth - this.leng[0]]);
			potentialY = getRandomInt([0, canvasHeight - this.leng[1]]);
			extremities = this.extremities.call({leng: this.leng, loc: [potentialX, potentialY]}, {leng: this.leng, loc: [potentialX, potentialY]});	
			count++;
			if (count >= 500) {throw "cannot find space";}
		}
		return [potentialX, potentialY];
	};

	Rect.prototype.extremities = function(){
		return {XMax: this.loc[0]+this.leng[0], XMin: this.loc[0], YMax: this.loc[1] + this.leng[1], YMin: this.loc[1]};
	};

	return {Rect: Rect};

}());
