#pragma strict

import System.Collections.Generic;

enum BlockType {
    L_BLOCK,
    T_BLOCK,
    SQUARE_BLOCK,
    LONG_BLOCK
}

var blocks : List.<GameObject>;
var blockType : BlockType;
var lowestBlock : GameObject; // for determining whether we've hit the bottom
var lastMoved : float;
var isMoving : boolean;

function Start () {
    blocks = new List.<GameObject>();
    var screenHeight : float = Camera.main.orthographicSize*2;
//    var screenWidth : float = Camera.main.ScreenToWorldPoint(Vector3(Camera.main.pixelWidth, 0, 0)).x -
//	Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)).x;
    var screenWidth : float = screenHeight*Camera.main.aspect;
    var x : int = Mathf.FloorToInt(Random.Range(-screenWidth/2, screenWidth/2));
    transform.position = Vector3(x, GameManager.topRow, 0);
    isMoving = true;
    lastMoved = Time.time;
    var type : int = Random.Range(0, 3);
    switch(type) {
    case 0:
	blockType = BlockType.L_BLOCK;
	blocks.Add(MakeBlock(Vector3(0, 1, 0)));
	blocks.Add(MakeBlock(Vector3(0, 0, 0)));
	blocks.Add(MakeBlock(Vector3(0, -1, 0)));
	blocks.Add(MakeBlock(Vector3(1, -1, 0)));
	break;
    case 1:
	blockType = BlockType.T_BLOCK;
	blocks.Add(MakeBlock(Vector3(0, 0, 0)));
	blocks.Add(MakeBlock(Vector3(-1, 0, 0)));
	blocks.Add(MakeBlock(Vector3(1, 0, 0)));
	blocks.Add(MakeBlock(Vector3(0, -1, 0)));
	break;
    case 2:
	blockType = BlockType.SQUARE_BLOCK;
	blocks.Add(MakeBlock(Vector3(0, 0, 0)));
	blocks.Add(MakeBlock(Vector3(-1, 0, 0)));
	blocks.Add(MakeBlock(Vector3(-1, -1, 0)));
	blocks.Add(MakeBlock(Vector3(0, -1, 0)));
	break;
    case 3:
	blockType = BlockType.LONG_BLOCK;
	blocks.Add(MakeBlock(Vector3(0, 0, 0)));
	blocks.Add(MakeBlock(Vector3(0, -1, 0)));
	blocks.Add(MakeBlock(Vector3(0, -2, 0)));
	break;
    }
}

function Update () {
    lowestBlock = GetLowestBlock();
    if(blocks.Count == 0) { // if there aren't any more blocks, we don't need a block group anymore
	Destroy(gameObject);
    }
    else {
	CheckPosition();
	if(isMoving && Time.time > lastMoved + GameManager.timestep) {
	    transform.position.y -= 1;
	    lastMoved = Time.time;
	}
    }
}

/* figure out what the lowest block is -- it changes when we rotate
 * The for loop in here is kinda funky -- we can't use a foreach loop,
 * because we're modifying the list if it's got null elements. Whatever.
 */
function GetLowestBlock() {
    var lowest : GameObject;
    var count = blocks.Count;
    for(var i : int = 0; i < count; i++) {
	var b : GameObject = blocks[i];
	if(b == null) { // Take out destroyed blocks
	    count--;
	    blocks.Remove(b);
	    continue;
	}
	if(lowest == null || b.transform.position.y < lowest.transform.position.y) {
	    lowest = b;
	}
    }
    return lowest;
}

function GetHighestBlock() {
    var highest : GameObject = blocks[0];
    for(var b : GameObject in blocks) {
	if(b.transform.position.y > highest.transform.position.y) {
	    highest = b;
	}
    }
    return highest;
}

function MakeBlock(pos : Vector3) {
    var block : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
    block.AddComponent(Block);
    block.GetComponent(Block).group = this;
//    block.AddComponent(Collider);
//    block.GetComponent(Collider).isTrigger = true;
    block.collider.isTrigger = true;
    block.transform.parent = transform;
    block.transform.localPosition = pos;
    GameManager.blockList.Add(block);
    return block;
}

function CheckPosition() {
    if(!isMoving) { // we're solid, don't worry
	return;
    }
    // check if we're too low
    if(lowestBlock.transform.position.y < GameManager.bottomRow) {
	isMoving = false;
    }
    // wow! this is inefficient! but it seems to work for now...
    for(var thisBlock : GameObject in blocks) {
	for(var otherBlock : GameObject in GameManager.blockList) {
	    if(otherBlock != null &&
	       !blocks.Contains(otherBlock) &&
	       otherBlock.GetComponent(Block).group.isMoving == false &&
	       Mathf.Approximately(otherBlock.transform.position.x, thisBlock.transform.position.x) &&
	       Mathf.Abs(otherBlock.transform.position.y - thisBlock.transform.position.y) <= 1) {
		isMoving = false;
		if(GetHighestBlock().transform.position.y >= GameManager.topRow) {
		    GameManager.gameOver = true;
		}
		return;
	    }
	}
    }
}

function Rotate () {
    if(blockType != BlockType.SQUARE_BLOCK && isMoving) {
	transform.Rotate(Vector3(0, 0, 90));
    }
}
