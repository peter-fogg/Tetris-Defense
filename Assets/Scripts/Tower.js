#pragma strict
//SCRIPT THAT HANDLES TOWER BEHAVIOR

var health			:float; //keeps track of how much health the tower has
var damage			:float;	//keeps track of how much damage the tower deals
//var prefabBullet	:Transform; //stores the bullet that the tower fires
//var range			:float;	//keeps track of the the range of the turret
var range			:float;
var bfire			:float;
//var cenemy  // best creature enemy
//var benemy   // best block

function Start () {
	health = 10;
	damage = 1;
	range = 5; // decide what range of tower is
	bfire = 1; // decide what firing freq is
}

function Update () {
	//if the tower's health is depleted, destroy the tower
	if (health == 0) {
		Destroy(gameObject);
	}
	//otherwise, pick attack
	
	/*
	
	
	cenemy = cattack(); // checks if there is a creature in range ot attack
	benemy = battack(); // check if there are blocks in range to attack
	
	if(cenemy != null)
		attack(cenemy);
	else
		attack(benemy);
	
	
	
	
}

/*function cattack() { // looks for creature to attack that is within range
	
	// search the list of creatures
	// compare to range
	// if a creature is within range, return command to attack it
	
	// return null if no creatures
}

function battack() { // looks for a block to attack
	// check for blocks in range
	// weigh blcoks such that, worst to best
	//   -- aren't your block
	//   -- don't have a tower on them
	//   -- are within range
	// return coordinates to attack based on best weight
}

function attack(var target){ // attack a given target

	// instantiate a bullet heading in the direction of given target
	// make bullet faster than update time? or calculate where the bullet should go?
	
}

*/
