#pragma strict

function Start () {
	gameObject.guiText.text = (GameObject.Find("Score").GetComponent(Score).ToString());
}

function Update () {

}

function OnMouseOver() {
	if(Input.GetMouseButtonDown(0)) {
		Application.LoadLevel ("StartScreen");
    }
}