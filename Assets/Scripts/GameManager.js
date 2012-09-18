#pragma strict

public static var board : Block[,];
public static var height : float;
public static var width : float;
public static var mainCamera : Camera;

var timestep : float; // how often to move
var lastMoved : float; // when we last moved

public var block : Block; // for Instantiate()

function Start () {
    var b : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
    b.AddComponent(Block);
    b.transform.position = Vector3(0, 0, 0);
    timestep = 1.0;
    lastMoved = Time.time;
}

function Update () {
    /*if(Time.time > lastMoved + timestep) {
	for(var row : Block[] in board) {
	    for(var block : Block in row) {
		if(block != null) {
		    block.transform.position.y += 1;
		}
	    }
	}
    }
    */
    //places a tower where the player right-clicks
	if(Input.GetMouseButtonDown(1)) {
		var mousePos: Vector3 = Input.mousePosition;
		//Debug.Log(mousePos);
		mousePos.z = 20; //some arbitrary distance from the camera, can be determined later
		var worldPos: Vector3 = Camera.main.ScreenToWorldPoint(mousePos);
		// var towerClone = Instantiate(tower, worldPos, Quaternion.identity);
		Debug.Log(worldPos);
		makeTower(worldPos);
	}
	
}

function makeTower(pos: Vector3) {
	var tower: GameObject = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
	tower.transform.position = pos;
	tower.AddComponent(Tower);
}
