#pragma strict

public static var board : Array;
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
    height = 10;
    width = 10;
    board = new Array();
    for(var i : int = 0; i < height; i++) {
	var arr : Array = new Array();
	board.push(arr);
    }
    var foo : Array = board[2] as Array;
    foo.push(b);
    timestep = 1.0;
    lastMoved = Time.time;
}

function Update () {
//    for(var arr : Array in board) {
	
//    }
}
