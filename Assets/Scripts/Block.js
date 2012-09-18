#pragma strict

//var lastMoved : float;
var health : float;
//var isMoving : boolean; // solidified or not
var tower : Tower; // might not be necessary?
var group : BlockGroup; // our parent

// Create the cube and any other bits.
function Start () {
    
}

function Update () {
    
}

function OnMouseOver () {
    if(Input.GetMouseButtonDown(1)) {
	group.Rotate();
    }
}
/*// Make sure we're not on top of another block
function CheckPosition() {
    if(!isMoving) { // we're solid, don't worry
	return;
    }
    // check if we're too low
    if(transform.position.y < GameManager.bottomRow) {
	isMoving = false;
    }
    for(var b : GameObject in GameManager.blockList) {
	if(b != gameObject && // it's not us
	   b.GetComponent(Block).isMoving == false && // and it's solid
	   Mathf.Abs(b.transform.position.y - transform.position.y) <= 1 + .01) { // too close! + epsilon
	    isMoving = false;
	    return;
	}
    }
}*/
