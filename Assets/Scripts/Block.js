#pragma strict

var lastMoved : float;
var health : float;
var isMoving : boolean; // solidified or not
var tower : Tower; // might not be necessary?

// Create the cube and any other bits.
function Start () {
<<<<<<< HEAD
=======
    isMoving = true;
>>>>>>> 7049a8c0532201020364f1669e899b5d96beca69
    lastMoved = Time.time;
}

function Update () {
<<<<<<< HEAD
    if(Time.time > lastMoved + GameManager.timestep) {
    	transform.position = transform.position + Time.deltaTime * Vector3(0, 10, 0);
	lastMoved = Time.time;
    }
    else {
	
=======
    CheckPosition();
    if(Time.time > lastMoved + GameManager.timestep && isMoving) {
    	transform.position = transform.position + Time.deltaTime * Vector3(0, -40, 0);
	lastMoved = Time.time;
    }
    // check if we're too low
    if(transform.position.y < GameManager.bottomRow) {
	isMoving = false;
    }
}

// Make sure we're not on top of another block
function CheckPosition() {
    if(!isMoving) { // we're solid, don't worry
	return;
    }
    for(var b : GameObject in GameManager.blockList) {
	if(Mathf.Abs(b.transform.position.y - transform.position.y) < 30) { // too close!
	    isMoving = false;
	    return;
	}
>>>>>>> 7049a8c0532201020364f1669e899b5d96beca69
    }
}
