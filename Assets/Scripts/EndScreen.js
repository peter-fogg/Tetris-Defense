#pragma strict

function Start () {
}

function Update () {

}

function OnMouseOver() {
	if(Input.GetMouseButtonDown(0)) {
		Application.LoadLevel ("StartScreen");
    }
}