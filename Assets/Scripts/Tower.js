#pragma strict
//SCRIPT THAT HANDLES TOWER BEHAVIOR

var health : float; //keeps track of how much health the tower has
//var damage : float;	//keeps track of how much damage the tower deals
var range : float;	//keeps track of the the range of the turret
//var cenemy  // best creature enemy
var benemy : Block;   // best block
var base : Block; //keeps track of the block that the tower is placed on
var lastFired : float;
var fireRate : float;

function Start () {
    health = 10;
//    damage = 1;
    range = 10; // decide what range of tower is
    fireRate = .2; // decide what firing freq is
    lastFired = 0;
}

function Update () {
	//if the tower's health is depleted, destroy the tower
    // also if our block is gone
	if (health == 0 || base == null) {
		Destroy(gameObject);
	}
	//otherwise, pick attack
	
//	cenemy = cattack(); // checks if there is a creature in range ot attack
	
//	if(cenemy != null)
//		attack(cenemy);
//	else
    if(benemy == null) {
	benemy = battack(); // check if there are blocks in range to attack
	print("block at " + benemy.transform.position);
    }
    else {
	attack(benemy);
    }
}

/*function cattack() { // looks for creature to attack that is within range
	
	// search the list of creatures
	// compare to range
	// if a creature is within range, return command to attack it
	
	// return null if no creatures
}*/

function battack() { // looks for a block to attack
	for(var enemy: GameObject in GameManager.blockList) {
	    if(enemy != base.gameObject &&
	       enemy.GetComponent(Block).isOccupied == false &&
	       Vector3.Distance(enemy.transform.position, transform.position) < range) {
		return enemy.GetComponent(Block);
	    }
	}
	return null;
}

function attack(target : Block){ // attack a given target
    if(Time.time > lastFired + fireRate) {
	var bullet : GameObject = MakeBullet();
	bullet.transform.position = Vector3.Lerp(transform.position, target.transform.position, Time.time);
	var targetDirection = target.transform.position - transform.position;
	bullet.transform.Rotate(Vector3(0, 0, Vector3.Angle(targetDirection, transform.forward)));
	print("target "+target.transform.position);
//	bullet.transform.LookAt(target.transform.position);
	lastFired = Time.time;
    }
 }

function OnMouseDown() {
    if(base.group.isMoving === false)
	base.group.Rotate();
}

function MakeBullet() {
    var bullet : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
    bullet.AddComponent(Bullet);
    bullet.AddComponent(Rigidbody);
    bullet.GetComponent(Rigidbody).useGravity = false;
    bullet.collider.isTrigger = true;
    bullet.transform.position = transform.position;
    bullet.transform.position.z = 0;
    bullet.GetComponent(Bullet).origin = base.transform.position;
    bullet.GetComponent(Bullet).ourBlock = base.gameObject;
    bullet.GetComponent(Bullet).range = range;
    return bullet;
}
