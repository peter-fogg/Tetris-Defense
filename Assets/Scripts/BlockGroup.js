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
    transform.position = Vector3(0, GameManager.topRow, 0);
    isMoving = true;
    lastMoved = Time.time;
    var type : int = Random.Range(0, 3);
    switch(type) {
    case 0:
	blockType = BlockType.L_BLOCK;
	blocks = new GameObject[4];
	blocks[0] = MakeBlock(Vector3(0, 0, 0));
	blocks[1] = MakeBlock(Vector3(0, -1, 0));
	blocks[2] = MakeBlock(Vector3(0, -2, 0));
	blocks[3] = MakeBlock(Vector3(1, -2, 0));
	lowestBlock = blocks[2];
	break;
    case 1:
	blockType = BlockType.T_BLOCK;
	blocks = new GameObject[4];
	blocks[0] = MakeBlock(Vector3(0, 0, 0));
	blocks[1] = MakeBlock(Vector3(-1, 0, 0));
	blocks[2] = MakeBlock(Vector3(1, 0, 0));
	blocks[3] = MakeBlock(Vector3(0, -1, 0));
	lowestBlock = blocks[3];
	break;
    case 2:
	blockType = BlockType.SQUARE_BLOCK;
	blocks = new GameObject[4];
	blocks[0] = MakeBlock(Vector3(0, 0, 0));
	blocks[1] = MakeBlock(Vector3(-1, 0, 0));
	blocks[2] = MakeBlock(Vector3(-1, -1, 0));
	blocks[3] = MakeBlock(Vector3(0, -1, 0));
	lowestBlock = blocks[3];
	break;
    case 3:
	blockType = BlockType.LONG_BLOCK;
	blocks = new GameObject[3];
	blocks[0] = MakeBlock(Vector3(0, 0, 0));
	blocks[1] = MakeBlock(Vector3(0, -1, 0));
	blocks[2] = MakeBlock(Vector3(0, -2, 0));
	lowestBlock = blocks[2];
	break;
    }
}

function Update () {
    CheckPosition();
    if(isMoving && Time.time > lastMoved + GameManager.timestep) {
	transform.position.y -= 1;
	lastMoved = Time.time;
    }
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
    for(var b : GameObject in GameManager.blockList) {
	if(ArrayUtility.Contains.<GameObject>(blocks, b) && // it's not us
	   b.GetComponent(Block).group.isMoving == false && // and it's solid
	   Mathf.Abs(b.transform.position.y - lowestBlock.transform.position.y) <= 1 + .01) { // too close! + epsilon
	    isMoving = false;
	    return;
	}
    }
}

function Rotate () {
    transform.Rotate(Vector3(0, 0, 90));
}
