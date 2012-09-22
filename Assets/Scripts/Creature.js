#pragma strict

import System.Collections.Generic;
//SCRIPT THAT CONTROLS CREATURE BEHAVIOR

var health : float; //keeps track of how much health the creature has
var damage : float; //keeps track of how much damage the creature deals
var location : Block; // Where are we right now?
var path : Stack.<Block>;
var lastMoved : float;
var moveRate : float;
var lastFired : float;
var fireRate : float;

function Start () {
    health = 5;
    damage = 1;
    lastMoved = Time.time;
    moveRate = 1;
    lastFired = Time.time;
    fireRate = 1.5;
}

function Update () {
    //~~~Checks to see if there are towers and then moves towards the closest
    //~~~If the creature is in range of the tower, attacks

//    if ( !inRange ) {
//	move();
//    }
    
//    else {
//	var attackTower: Tower;
	// for (var i: float = 0; i < collection.length(); i++) {
	//     if (collection[i].health < attackTower.health) {
	// 	attackTower = collection[i];
	//     }
	// }
//	attack(attackTower);
//    }
    if(location == null) { // our block got destroyed
	GameObject.Find("GameManager").GetComponent(GameManager).numCreatures--;
	Destroy(gameObject);
    }
    else if(!location.group.isMoving) { // this block is solidified
	
    }
    if(path == null) { // figure out what we're doing with our life
	path = Search();
	for(var block : GameObject in GameManager.blockList) {
	    block.GetComponent(Block).cameFrom.Remove(gameObject);
	}
    }
    else if(path.Count == 1) { // there's only one block left; it's our target
	var attackBlock : Block = path.Peek();
	if(attackBlock == null) {
	    path = null;
	}
	else {
	    attack(attackBlock.tower);
	}
    }
    else if(path.Count == 0) {
	path = null;
    }
    else { // not in range, get going!
	move();
    }
}

function move() {
    if(Time.time > lastMoved + moveRate) {
	var target : Block = path.Pop();
	if(target != null &&
	   CheckPosition(target.transform.position) != null) {
	    location = target;
	    transform.position = Vector3(target.transform.position.x,
					 target.transform.position.y,
					 transform.position.z);
	}
	else {
	    path = null; // block doesn't exist, reset path
	}
	lastMoved = Time.time;
    }
}

function attack(tower: Tower) {
    if(tower == null) { // that tower is destroyed!
	path = null; // reset our attack path
    }
    //inflicts "damage" amount of damage to a tower's health
    else {
	if(Time.time > lastFired + fireRate) {
	    tower.health -= damage;
	    lastFired = Time.time;
	}
    }
}

/*
 * Does a breadth-first search through blocks to find a tower. If a valid
 * path is found, it is returned; otherwise returns null.
 */
function Search() {
    var worklist : Queue.<GameObject> = new Queue.<GameObject>();
    var currentPosition : Vector3; // which block we're exploring right now
    AddNeighbors(transform.position, worklist, location);
    var i : int = 0;
    while(worklist.Count != 0) {
	i++;
	var go : GameObject = worklist.Dequeue();
	var block : Block = go.GetComponent(Block);
	if(block.isOccupied) {
		Debug.Log("Path found!");
	    return TraceBack(block);
	}
	AddNeighbors(block.transform.position, worklist, block);
    }
    Debug.Log("No path found. Value of i is: " + i);
    return null;
}

/*
 * Follows the cameFrom links in each Block to find the path from here (the base) to
 * there (the tower).
 */
function TraceBack(start : Block) {
    var path : Stack.<Block> = new Stack.<Block>();
    while(start.cameFrom[gameObject] != location) {
	path.Push(start);
	start = start.cameFrom[gameObject];
    }
    return path;
}

/*
 * Adds neighbors of a given position onto the worklist stack, if they exist. Also
 * sets the cameFrom variable of each block.
 */
function AddNeighbors(position : Vector3, worklist : Queue.<GameObject>, cameFrom : Block) {
    var neighbors : Vector3[] = new Vector3[4];
    neighbors[0] = new Vector3(position.x+1, position.y, 0);
    neighbors[1] = new Vector3(position.x-1, position.y, 0);
    neighbors[2] = new Vector3(position.x, position.y-1, 0);
    neighbors[3] = new Vector3(position.x, position.y+1, 0);
    for(var p : Vector3 in neighbors) {
	var g : GameObject = CheckPosition(p);
	// don't explore blocks that don't exist or have already been visited
	if(g != null && !g.GetComponent(Block).cameFrom.ContainsKey(gameObject)) {
	    Debug.Log("Haven't been here before");
	    worklist.Enqueue(g);
	    g.GetComponent(Block).cameFrom[gameObject] = cameFrom;
	}
    }
}

/*
 * Lets us know if a given position has a block on it or not. Returns
 * said block if it does; otherwise returns null.
 */
function CheckPosition(position : Vector3) {
    var objects : Collider[] = Physics.OverlapSphere(position, .1);
    for(var c : Collider in objects) {
	if(c.gameObject.GetComponent(Block) != null) {
	    return c.gameObject;
	}
    }
    return null;
}
