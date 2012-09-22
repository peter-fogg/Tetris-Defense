#pragma strict
//Increments score based on blocks destroyed
var score : float;


function Start () {
	score = 0;
}

function Update () {
	gameObject.guiText.text = (score.ToString());
}