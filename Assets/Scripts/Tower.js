#pragma strict
//SCRIPT THAT HANDLES TOWER BEHAVIOR

var health : float; //keeps track of how much health the tower has
var maxHealth: float;
//var damage : float;	//keeps track of how much damage the tower deals
var range : float;	//keeps track of the the range of the turret
//var cenemy  // best creature enemy
var benemy : Block;   // best block
var base : Block; //keeps track of the block that the tower is placed on
var lastFired : float;
var fireRate : float;
var lerpedColor: Color = Color.cyan;

function Start () {
    health = maxHealth = 10;
//    damage = 1;
    range = 10; // decide what range of tower is
    fireRate = .2; // decide what firing freq is
    lastFired = 0;
    renderer.material.color = lerpedColor;
}

function Update () {
	//Damage/color change handling:
	lerpedColor = Color.Lerp(Color.red, Color.cyan,health/maxHealth);
   	renderer.material.color = lerpedColor;
	
	//if the tower's health is depleted, destroy the tower
    // also if our block is gone
	if (health <= 0 || base == null) {
		Destroy(gameObject);
	}
	//otherwise, pick attack
	
//	cenemy = cattack(); // checks if there is a creature in range ot attack
	
//	if(cenemy != null)
//		attack(cenemy);
//	else
    if(benemy == null) {
	benemy = battack(); // check if there are blocks in range to attack
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
    var result : Block;
    for(var enemy: GameObject in GameManager.blockList) {
	var enemyPos : Vector3 = enemy.transform.position;
	if(enemy != base.gameObject &&
//	   enemy.GetComponent(Block).isOccupied == false &&
	   enemyPos.y > transform.position.y &&
	   Vector3.Distance(enemyPos, transform.position) < range) {
	    if(result == null ||
	       Vector3.Distance(enemyPos, transform.position) <
	       Vector3.Distance(result.transform.position, transform.position)) {
		result = enemy.GetComponent(Block);
	    }
	}
    }
    if(result == null) { // if there aren't any good towers, just attack ourselves
	attack(base);
    }
    return result;
}

function attack(target : Block){ // attack a given target
    if(Time.time > lastFired + fireRate) {
	var bullet : GameObject = MakeBullet();
	bullet.transform.LookAt(target.transform);
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
