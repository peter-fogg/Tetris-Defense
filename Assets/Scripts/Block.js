#pragma strict

//var lastMoved : float;
var health : float;
//var isMoving : boolean; // solidified or not
var tower : Tower; // might not be necessary?
var isOccupied : boolean;
var group : BlockGroup; // our parent

// Create the cube and any other bits.
function Start () {
    isOccupied = false;
}

function Update () {
    
}

function OnMouseOver () {
    if(Input.GetMouseButtonDown(0)) {
	group.Rotate();
    }
    if(Input.GetMouseButtonDown(1) && isOccupied === false) {
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
	tower.AddComponent(Tower);
	tower.transform.parent = transform;
	tower.GetComponent(Tower).base = this;
}
