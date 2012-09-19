#pragma strict
//SCRIPT THAT HANDLES TOWER BEHAVIOR

var health : float;			:float; //keeps track of how much health the tower has
var damage : float;			:float;	//keeps track of how much damage the tower deals
//var prefabBullet	:Transform; //stores the bullet that the tower fires
//var range			:float;	//keeps track of the the range of the turret
var bfire			:float;
//var cenemy  // best creature enemy
var benemy : Vector3   // best block
var base: 			Block; //keeps track of the block that the tower is placed on

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
	
//	cenemy = cattack(); // checks if there is a creature in range ot attack
	benemy = battack(); // check if there are blocks in range to attack
	
//	if(cenemy != null)
//		attack(cenemy);
//	else
		attack(benemy);	
}

/*function cattack() { // looks for creature to attack that is within range
	
	// search the list of creatures
	// compare to range
	// if a creature is within range, return command to attack it
	
	// return null if no creatures
}*/

function battack() { // looks for a block to attack
	// check for blocks in range
	var min : 10;
	for(var i : 0; i < blockList.length; i++) {
		if(Vector3.Distance(blockList.get(i).position, transform.position))
			if(blockList.get(i).isOccupied == false)
				return blockList.get(i).position; 
	}
	return transform.position;
}

function attack(var target){ // attack a given target

	// instantiate a bullet heading in the direction of given target
	var bullet : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
	bullet.transform.position = Vector3.Lerp(transform.position, target, Time.time);
	Destroy(bullet);	
}

}

function OnMouseDown() {
	if(base.group.isMoving === false)
		base.group.Rotate();
}
