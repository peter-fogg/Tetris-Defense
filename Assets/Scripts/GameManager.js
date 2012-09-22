#pragma strict

import System.Collections.Generic;

public static var blockList : List.<GameObject>;
public static var towerList : List.<GameObject>;
public static var height : float;
public static var width : float;
public static var bottomRow : float; // the lowest we can go on the screen
public static var topRow : float;
public static var gameOver : boolean;
public static var timestep : float; // how often to move
var spawnStep : float; // how often to spawn a block group
var lastSpawned : float;
var numTowers: float;
public static var maxTowers: float;
var numCreatures: float;
var creatureTime: float; //the time between creature spawns
var spawnTime: float; //the time of the last creature spawn

public var blockGroup : BlockGroup; // for Instantiate()

function Start () {
    blockList = new List.<GameObject>();
    towerList = new List.<GameObject>();
    timestep = 0.1;
    spawnStep = 2;
    lastSpawned = Time.time; // spawn a block right away
    gameOver = false;
    // figure out what bottomRow should be
    bottomRow = Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)).y + 1;
    topRow = Camera.main.ScreenToWorldPoint(Vector3(0, Camera.main.pixelHeight, 0)).y;
    numTowers = 0;
    maxTowers = 10;
    numCreatures = 0;
    creatureTime = 15;
    spawnTime = Time.time;
}

function Update () {
	//spawns a creature every creatureTime seconds
	if(Time.time - spawnTime > creatureTime) {
		makeCreature();
		spawnTime = Time.time;
		if(creatureTime > 5)
			creatureTime -= 0.5;
	}

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

function makeCreature() {
	var rand: float = Random.Range(0, blockList.Count);
	var spawnBlock: GameObject = blockList[rand];
	while(spawnBlock.GetComponent(Block).group.isMoving === true || spawnBlock.GetComponent(Block).isOccupied === true) {
		rand = Random.Range(0, blockList.Count);
		spawnBlock = blockList[rand];
	}
	var creaturePos = spawnBlock.transform.position;
	creaturePos.z -= 1;
	var creature: GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
	creature.transform.position = creaturePos;
	creature.renderer.material.color = Color.green;
	creature.AddComponent(Creature);
	creature.GetComponent(Creature).location = spawnBlock.GetComponent(Block);
	numCreatures++;
}

function OnGUI() {
    if(gameOver) {
	Time.timeScale = 0; // stop the game
	GUI.Button(Rect(Camera.main.pixelWidth, Camera.main.pixelHeight, 100, 30), "You lose!");
	Application.LoadLevel("GameOver");
    }
}
