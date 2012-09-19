#pragma strict

var speed : float;
var range : float;
var ourBlock : GameObject; // maybe take this out later?
var origin : Vector3; // where we started from

function Start () {
    speed = 5;
    transform.localScale = Vector3(.1, .1, .1);
}

function Update () {
    transform.Translate(Vector3.up * Time.deltaTime * speed);
    if(Vector3.Distance(origin, transform.position) > range) {
	Destroy(gameObject);
    }
}

function OnTriggerEnter(other : Collider) {
    if(other.gameObject != ourBlock) {
	GameManager.blockList.Remove(other.gameObject);
	Destroy(other.gameObject);
	Destroy(gameObject);
    }
}
