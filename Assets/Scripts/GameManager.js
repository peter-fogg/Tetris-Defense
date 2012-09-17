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
//    board = 
    board[2][1] = b;
    timestep = 1.0;
    lastMoved = Time.time;
}

function Update () {
    if(Time.time > lastMoved + timestep) {
	for(var row : Block[] in board) {
	    for(var block : Block in row) {
		if(block != null) {
		    block.transform.position.y += 1;
		}
	    }
	}
    }
}
