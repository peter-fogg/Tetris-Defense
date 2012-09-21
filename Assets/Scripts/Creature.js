#pragma strict

//SCRIPT THAT CONTROLS CREATURE BEHAVIOR

var	health			:float; //keeps track of how much health the creature has
var inRange			:boolean; //whether or not the creature is next to a tower
var damage			:float; //keeps track of how much damage the creature deals

function Start () {
	health = 5;
	damage = 1;
}

function Update () {
//~~~Checks to see if there are towers and then moves towards the closest
//~~~If the creature is in range of the tower, attacks

	if ( !inrange ) {
		move();
	}
	
	else {
		var attackTower:towerScript;
		for (float i = 0; i<collection.length(); i++) {
			if (collection[i].health < attackTower.health) {
				attackTower = collection[i];
			}
		}
		attack(attackTower);
	}

}

function move() {


//~~~finds the shortest Path to the nearest tower~~~ 
//check to make sure not next to tower
//figure out which tower is closest
//find shortest path
//figure out which direction to translate
//translate

}

function attack ( Tower ) {
//~~~inflicts damage to a tower~~~
	
 	//inflicts "damage" amount of damage to a tower's health
 	tower.health -= damage;
}
