#pragma strict
//SCRIPT THAT CONTROLS CREATURE BEHAVIOR
//Devon Wells 
//CS 361

var	health			:float; //keeps track of how much health the creature has
var inRange			:boolean; //whether or not the creature is in range of a tower

function Start () {
	health = 5;
}

function Update () {
//~~~Checks to see if there are towers and then moves towards the closest
//~~~If the creature is in range of the tower, attacks

	if ( !inrange ) {
		move( /* towers */ );
	}
	
	else {
		attack();
	}

}

function move ( /*towers */ ) {
//~~~finds the shortest Path to the nearest tower~~~

//check to make sure not next to tower
//figure out which tower is closest
//find shortest path
//figure out which direction to translate
//translate

}

function attack () {

}

