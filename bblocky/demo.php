<?php
//simple script to handle demo file
if (false) {

}
else if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // var_dump($_POST["body"]);

  $content = $_POST["body"];

  //flag
  $dev = $_POST["dev"];
  $tut = $_POST["tut"];
  $list = $_POST["list"];   //boolean = list project tutorial

  var_dump($_POST);

  if ($dev == "true") {
    echo "dev mode";
    $myfile = fopen("./editor/src/StoreEntry.ts", "w") or die("Unable to open file!");
    fwrite($myfile, "///<reference path=\"Store.ts\"/>\n");
    fwrite($myfile, "ha.blockly.Store.demo =");
    fwrite($myfile, $content);
    fclose($myfile);
  } else if ($tut == "true") {
    $id = $_POST["id"];       //project id tutorial
    echo "tut mode";
    $myfile = fopen("./editor/web/tut/p". $id .".json", "w") or die("Unable to open file!");
    fwrite($myfile, $content);
    fclose($myfile);
  } else if ($list == "true") {
    echo "list mode";
    $myfile = fopen("./editor/web/tut/list.json", "w") or die("Unable to open file!");
    fwrite($myfile, $content);
    fclose($myfile);
  }
}
else {
    echo "invalid request";
}
?>