#pragma strict
//SCRIPT THAT HANDLES TOWER BEHAVIOR

var health			:float; //keeps track of how much health the tower has
var damage			:float;	//keeps track of how much damage the tower deals
//var prefabBullet	:Transform; //stores the bullet that the tower fires
//var range			:float;	//keeps track of the the range of the turret

function Start () {
	health = 10;
	damage = 1;
}

function Update () {
	//if the tower's health is depleted, destroy the tower
	if (health == 0) {
		Destroy(gameObject);
	}
	
	//otherwise, attack the nearest tower
	else {
		attack();
	}
	
}

function attack() {

}