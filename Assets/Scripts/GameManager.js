#pragma strict

import System.Collections.Generic;

public static var blockList : List.<GameObject>;
public static var height : float;
public static var width : float;
public static var bottomRow : float; // the lowest we can go on the screen
public static var topRow : float;
public static var gameOver : boolean;
public static var timestep : float; // how often to move
var spawnStep : float; // how often to spawn a block group
var lastSpawned : float;

public var blockGroup : BlockGroup; // for Instantiate()

function Start () {
    blockList = new List.<GameObject>();
    timestep = 0.5;
    spawnStep = 5;
    lastSpawned = Time.time; // spawn a block right away
    gameOver = false;
    // figure out what bottomRow should be
    bottomRow = Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)).y + 1;
    topRow = Camera.main.ScreenToWorldPoint(Vector3(0, Camera.main.pixelHeight, 0)).y;
}

function Update () {
	if(Time.time > lastSpawned + spawnStep) {
	    MakeBlockGroup();
	    lastSpawned = Time.time;
	}
}

function MakeBlockGroup () {
    var obj : GameObject = new GameObject();
    obj.AddComponent(BlockGroup);
}

function makeTower(pos : Vector3) {
	var tower: GameObject = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
	tower.transform.position = pos;
	tower.AddComponent(Tower);
}

function OnGUI() {
    if(gameOver) {
	Time.timeScale = 0; // stop the game
	GUI.Button(Rect(Camera.main.pixelWidth, Camera.main.pixelHeight, 100, 30), "You lose!");
    }
}
