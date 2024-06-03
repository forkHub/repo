<?php
	//simple script to handle demo file
if ($_SERVER["REQUEST_METHOD"] == "POST") {
		// var_dump($_POST["body"]);

		$content = $_POST["body"];

		//flag
		$list = $_POST["list"];   //boolean = list project tutorial
		$mode = $_POST["mode"];
		$data = $_POST["data"];

		var_dump($_POST);

		if ($mode == "dev") {
			echo "dev mode";

			if ($data == "judul") {
				echo "list mode";
				$myfile = fopen("./editor/web/tut/dlist.json", "w") or die("Unable to open file!");
				fwrite($myfile, $content);
				fclose($myfile);
			}
			else if ($data == "isi") {
				echo "data mode";

				$id = $_POST["id"];       //project id tutorial
				echo "tut mode";
				$myfile = fopen("./editor/web/tut/d". $id .".json", "w") or die("Unable to open file!");
				fwrite($myfile, $content);
				fclose($myfile);
			}
			else {
				die("invalid data " . $data);
			}
		} else if ($mode == "truth") {
			if ($list == "true") {
			echo "list mode";
			$myfile = fopen("./editor/web/tut/list.json", "w") or die("Unable to open file!");
			fwrite($myfile, $content);
			fclose($myfile);
			}
			else if ($ist == "false") {
			$id = $_POST["id"];       //project id tutorial
			echo "tut mode";
			$myfile = fopen("./editor/web/tut/p". $id .".json", "w") or die("Unable to open file!");
			fwrite($myfile, $content);
			fclose($myfile);
			}
		}
		else {
			die ("mode error: " . $mode);
		}
	}
?>
