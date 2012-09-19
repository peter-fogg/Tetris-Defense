#pragma strict

enum BlockType {
    L_BLOCK,
    T_BLOCK,
    SQUARE_BLOCK,
    LONG_BLOCK
}

var blocks : GameObject[];
var blockType : BlockType;
var lowestBlock : GameObject; // for determining whether we've hit the bottom
var lastMoved : float;
var isMoving : boolean;

function Start () {
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
	blocks = new GameObject[4];
	blocks[0] = MakeBlock(Vector3(0, 1, 0));
	blocks[1] = MakeBlock(Vector3(0, 0, 0));
	blocks[2] = MakeBlock(Vector3(0, -1, 0));
	blocks[3] = MakeBlock(Vector3(1, -1, 0));
	break;
    case 1:
	blockType = BlockType.T_BLOCK;
	blocks = new GameObject[4];
	blocks[0] = MakeBlock(Vector3(0, 0, 0));
	blocks[1] = MakeBlock(Vector3(-1, 0, 0));
	blocks[2] = MakeBlock(Vector3(1, 0, 0));
	blocks[3] = MakeBlock(Vector3(0, -1, 0));
	break;
    case 2:
	blockType = BlockType.SQUARE_BLOCK;
	blocks = new GameObject[4];
	blocks[0] = MakeBlock(Vector3(0, 0, 0));
	blocks[1] = MakeBlock(Vector3(-1, 0, 0));
	blocks[2] = MakeBlock(Vector3(-1, -1, 0));
	blocks[3] = MakeBlock(Vector3(0, -1, 0));
	break;
    case 3:
	blockType = BlockType.LONG_BLOCK;
	blocks = new GameObject[3];
	blocks[0] = MakeBlock(Vector3(0, 0, 0));
	blocks[1] = MakeBlock(Vector3(0, -1, 0));
	blocks[2] = MakeBlock(Vector3(0, -2, 0));
	break;
    }
}

function Update () {
    lowestBlock = GetLowestBlock();
    CheckPosition();
    if(isMoving && Time.time > lastMoved + GameManager.timestep) {
	transform.position.y -= 1;
	lastMoved = Time.time;
    }
}

// figure out what the lowest block is -- it changes when we rotate
function GetLowestBlock() {
    var lowest : GameObject = blocks[0];
    for(var b : GameObject in blocks) {
	if(b.transform.position.y < lowest.transform.position.y) {
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
	    if(!ArrayUtility.Contains.<GameObject>(blocks, otherBlock) &&
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
