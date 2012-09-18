#pragma strict

var lastMoved : float;
var health : float;
var isMoving : boolean; // solidified or not
var isOccupied: boolean;

// Create the cube and any other bits.
function Start () {
    isMoving = true;
    lastMoved = Time.time;
    isOccupied = false;
}

function Update () {
    CheckPosition();
    if(Time.time > lastMoved + GameManager.timestep && isMoving) {
    	transform.position.y -= 1;
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
	if(b != gameObject && // it's not us
	   b.GetComponent(Block).isMoving == false && // and it's solid
	   Mathf.Abs(b.transform.position.y - transform.position.y) <= 1) { // too close!
	    isMoving = false;
	    return;
	}
    }
}

function OnMouseOver() {
	if(Input.GetMouseButtonDown(1)) {
		var towerPos: Vector3 = transform.position;
		Debug.Log(towerPos);
		towerPos.z -= 1;
		makeTower(towerPos);
		isOccupied = true;
	}
}

function makeTower(pos : Vector3) {
	var tower: GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
	tower.transform.position = pos;
	//tower.transform.Rotate(new Vector3(90, 0, 0));
	tower.AddComponent(Tower);
	tower.transform.parent = transform;
}
