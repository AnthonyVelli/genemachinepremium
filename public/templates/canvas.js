
	
	var animation;
	var canvasWidth = 560;
	var canvasHeight = 560;
	var xcount = 0;
	var topwall = 0;
	var bottwall = 555;
	var leftwall = 0;
	var rightwall = 555;
	var objs = [];
	var clicked = false;
	var canvas;
	var ctx;





function changeTraj (collidedObj, obj){
	var objXvelocity = obj.traj[0] * obj.speed[0];
	var collidedObjXvelocity = collidedObj.traj[0] * collidedObj.speed[0];
	var xVelocityTransfer = Math.abs(objXvelocity - collidedObjXvelocity);		
	var objYvelocity = obj.traj[1] * obj.speed[1];
	var collidedObjYvelocity = collidedObj.traj[1] * collidedObj.speed[1];
	var yVelocityTransfer = Math.abs(objYvelocity - collidedObjYvelocity);	
	

	if (xVelocityTransfer >= 1) {
		console.log(xVelocityTransfer);
		collidedObj.traj[0] *= -1;
		collidedObj.speed[0] = Math.ceil(xVelocityTransfer / 2);
		obj.traj[0] *= -1;
		obj.speed[0] = Math.ceil(xVelocityTransfer / 2);
	}
	if (yVelocityTransfer >= 1) {
		collidedObj.traj[1] *= -1;
		collidedObj.speed[1] = Math.ceil(yVelocityTransfer / 2);
		obj.traj[1] *= -1;
		obj.speed[1] = Math.ceil(yVelocityTransfer / 2);
	}
}



 function occupiedSpace(potentialObj){
	if (objs.find(function(ele) {
		return hitDetection(potentialObj, ele);
	})) {
		return true;
	}
}


function stopAnimation(){
	if (clicked) {
		clicked = false;
		window.requestAnimationFrame(draw);
	} else {
		clicked = true;
		window.cancelAnimationFrame(animation);
	}
}

window.onkeydown=function(event){
	if (event.keyCode == 40) {
		objs[0].clear();
		objs[0].loc[1] += 5;
		objs[0].draw();
	} else if (event.keyCode == 38) {
		objs[0].clear();
		objs[0].loc[1] -= 5;
		objs[0].draw();
	}
};

function start(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	var boxes = document.getElementById('inputbox').value;

	objs.push(new rectCreator.Rect([5,200], [15, 50], [0,0], [0,0], "black"));

	for (var y = 0; y < boxes; y++){
		objs.push(new circleCreator.Circle());
	}

	animation = window.requestAnimationFrame(draw);
}
function draw(){
	objs.forEach(function (obj, idx) {
		obj.clear();
		obj.wallHitCheck();
		objs.forEach(function (collidedObjCheck, idxCheck) {
			if (idx !== idxCheck && obj.objHitCheck(collidedObjCheck)){
				changeTraj(collidedObjCheck, obj);
			}
		});
		obj.moveDraw();
	});
	
  	animation = window.requestAnimationFrame(draw);

}

