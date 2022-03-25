
class Edit2 {

	init(): void {

	}

}

window.onload = () => {
	let edit: Edit2 = new Edit2();
	edit.init();

	let form: HTMLFormElement = document.forms.namedItem("form1");

	form.addEventListener('submit', function (ev) {

		var oOutput = document.querySelector("div");
		var oData = new FormData(form);

		oData.append("CustomField", "This is some extra data");

		var oReq = new XMLHttpRequest();
		oReq.open("POST", "stash.php", true);
		oReq.onload = function (oEvent) {
			oEvent;
			if (oReq.status == 200) {
				oOutput.innerHTML = "Uploaded!";
			} else {
				oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
			}
		};

		oReq.send(oData);
		ev.preventDefault();
	}, false);


	// form.onsubmit = () => {
	// 	try {
	// 		let data: FormData = new FormData(form);
	// 		console.log('form on submit:');
	// 		console.log(data);
	// 		// console.log(JSON.stringify(data));
	// 	}
	// 	catch (e) {
	// 		console.warn(e);
	// 	}
	// 	return false;
	// }

}