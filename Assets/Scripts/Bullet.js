#pragma strict

var speed : float;
var lifespan : float;
var began : float; // when was this bullet created?
var ourBlock : GameObject; // should take this out later, maybe?

function Start () {
    speed = 5;
    lifespan = 10;
    began = Time.time;
    transform.localScale = Vector3(.1, .1, .1);
}

function Update () {
    transform.Translate(Vector3.up * Time.deltaTime * speed);
    if(lifespan < Time.time - began) {
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
