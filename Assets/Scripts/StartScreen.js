#pragma strict
//Handles start Screen behavior


function Start () {

}

function Update () {
	
}

function OnMouseOver() {
	if(Input.GetMouseButtonDown(0)) {
		Application.LoadLevel ("Instructions");
    }
}