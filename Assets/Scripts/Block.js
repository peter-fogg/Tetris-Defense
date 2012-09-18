#pragma strict

var lastMoved : float;
var health : float;
var isMoving : boolean; // solidified or not
var tower : Tower; // might not be necessary?

// Create the cube and any other bits.
function Start () {
    lastMoved = Time.time;
}

function Update () {
    if(Time.time > lastMoved + GameManager.timestep) {
    	transform.position = transform.position + Time.deltaTime * Vector3(0, 10, 0);
	lastMoved = Time.time;
    }
    else {
	
    }
}
