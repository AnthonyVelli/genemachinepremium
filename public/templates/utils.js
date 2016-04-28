var utils = (function(){

	function getRandomInt(minMaxArr) {
		return Math.floor(Math.random() * (minMaxArr[1] - minMaxArr[0])) + minMaxArr[0];
	}

	return {getRandomInt: getRandomInt};



}());