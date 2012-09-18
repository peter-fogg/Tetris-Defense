#pragma strict

enum BlockType {
    L_BLOCK,
    T_BLOCK,
    SQUARE_BLOCK,
    LONG_BLOCK
}

var blocks : GameObject[];
var blockType : BlockType;

function Start () {
    var type : int = Random.Range(0, 3);
    type = 3;
    switch(type) {
    case 0:
	blockType = BlockType.L_BLOCK;
	break;
    case 1:
	blockType = BlockType.T_BLOCK;
	break;
    case 2:
	blockType = BlockType.SQUARE_BLOCK;
	break;
    case 3:
	blockType = BlockType.LONG_BLOCK;
	blocks = new GameObject[3];
	blocks[0] = MakeBlock(Vector3(0, GameManager.topRow, 0));
	blocks[1] = MakeBlock(Vector3(0, GameManager.topRow - 1, 0));
	blocks[2] = MakeBlock(Vector3(0, GameManager.topRow - 2, 0));
	break;
    }
}

function Update () {
    /*for(var b : GameObject in blocks) {
	b.GetComponent(Block)transform.position.y -= 1;
    }*/
}

function MakeBlock(pos : Vector3) {
    var block : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
    block.AddComponent(Block);
    block.GetComponent(Block).isMoving = true;
    block.transform.position = pos;
    GameManager.blockList.Add(block);
    return block;
}
