#pragma strict

import System.Collections.Generic;

//var lastMoved : float;
var health : float;
//keeps track of the starting health
var maxHealth : float;
//var isMoving : boolean; // solidified or not
var tower : Tower; // might not be necessary?
var isOccupied : boolean;
// kinda weird... creatures set cameFrom[gameObject] = location
var cameFrom : Dictionary.<GameObject, Block>; // Where was this block reached from? (for pathfinding)
var group : BlockGroup; // our parent
//color to lerp between
var lerpedColor : Color = Color.white;

// Create the cube and any other bits.
function Start () {
    cameFrom = new Dictionary.<GameObject, Block>();
    isOccupied = false;
    health = maxHealth = 10;
}


function Update () {
    //Damage/color change handling:
    lerpedColor = Color.Lerp(Color.red, Color.white,health/maxHealth);
    renderer.material.color = lerpedColor;	
}

function OnMouseOver () {
    if(Input.GetMouseButtonDown(0)) {
	group.Rotate();
    }
    if(Input.GetMouseButtonDown(1) && isOccupied === false && GameObject.Find("GameManager").GetComponent(GameManager).numTowers < GameManager.maxTowers) {
	var towerPos: Vector3 = transform.position;
	Debug.Log(towerPos);
	towerPos.z -= 1;
	tower = makeTower(towerPos);
	isOccupied = true;
    }
}

function makeTower(pos : Vector3) {
	var tower: GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
	tower.transform.position = pos;
	tower.AddComponent(Tower);
	tower.GetComponent(Tower).base = this;
	tower.transform.parent = transform;
	GameObject.Find("GameManager").GetComponent(GameManager).numTowers++;
    GameManager.towerList.Add(tower);
    return tower.GetComponent(Tower);
}

function OnDestroy() {
	if(isOccupied === true) {
		GameObject.Find("GameManager").GetComponent(GameManager).numTowers--;
	    GameManager.towerList.Remove(tower.gameObject);
	}
}
