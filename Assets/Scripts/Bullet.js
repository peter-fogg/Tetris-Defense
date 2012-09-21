#pragma strict

var speed : float;
var range : float;
var damage : float;
var ourBlock : GameObject; // maybe take this out later?
var origin : Vector3; // where we started from

function Start () {
    speed = 5;
    damage = 1;
    transform.localScale = Vector3(.1, .1, .1);
}

function Update () {
    transform.Translate(Vector3.up * Time.deltaTime * speed);
    if(Vector3.Distance(origin, transform.position) > range) {
	Destroy(gameObject);
    }
}

function OnTriggerEnter(other : Collider) {
    var block : Block = other.gameObject.GetComponent(Block);
    if(other.gameObject != ourBlock && block != null) {
	Destroy(gameObject);
	block.health -= damage;
	if(block.health <= 0) {
	    GameManager.blockList.Remove(block.gameObject);
	    Destroy(block.gameObject);
	}
    }
}
