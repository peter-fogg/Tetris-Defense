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
    health = 10;
}

function Update () {
    
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
}

function OnDestroy() {
	if(isOccupied === true) {
		GameObject.Find("GameManager").GetComponent(GameManager).numTowers--;
	    GameManager.towerList.Remove(tower.gameObject);
	}
}
