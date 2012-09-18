#pragma strict

import System.Collections.Generic;

public static var blockList : List.<GameObject>;
public static var height : float;
public static var width : float;
public static var bottomRow : float; // the lowest we can go on the screen

public static var timestep : float; // how often to move
var lastMoved : float; // when we last moved

public var block : Block; // for Instantiate()

function Start () {
    blockList = new List.<GameObject>();
    MakeBlock(Vector3(0, 0, 0));
    MakeBlock(Vector3(0, 2, 0));
    timestep = 1.0;
    lastMoved = Time.time;
    // figure out what bottomRow should be
    bottomRow = Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)).y + 1;
}

function Update () {
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

function makeTower(pos : Vector3) {
	var tower: GameObject = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
	tower.transform.position = pos;
	tower.AddComponent(Tower);


}

function MakeBlock(pos : Vector3) {
    var block : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
    block.AddComponent(Block);
    block.transform.position = pos;
    blockList.Add(block);
}
