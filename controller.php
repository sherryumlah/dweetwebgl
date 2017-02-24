<!DOCTYPE html>
<html lang="en">
	<head>
		<title>three.js webgl - loaders - OBJ loader</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<link rel="stylesheet" type="text/css" href="styles.css">
	</head>

	<body>
	<div id="menu" class="menu">
	<p class="expand master">MENU</p>
		<nav class="nav mainmenu">
		<?php
			$dir = 'objects';
			$subdirs = scandir($dir);
			// get directory list
			echo "<ul class='nav'>";
			for ($i=0; $i<(count($subdirs)); $i++){
				if ($subdirs[$i]!='.' && $subdirs[$i]!='..'){
					$this_dir = $subdirs[$i];
					echo "<li class='category master'>".$this_dir."</li>";
					$files = scandir('objects/'.$this_dir);
					echo "<ul class='sub'>";
					for ($f=0; $f<(count($files)); $f++){
						if ($files[$f]!='.' && $files[$f]!='..'){
							$this_file = preg_replace('/\\.[^.\\s]{3,4}$/', '', $files[$f]);
							$this_file = strtoupper($this_file);
							echo "<li class='subli' data-ctdmodel='$this_file' data-dir='$this_dir'>".$this_file."</li>";
						}
					}
					echo "</ul>";
				}
			}
		echo "</ul>";
		?>
		</nav>
	</div>
	<div id="instruct" class="instruct">
		<p>
			<strong>CONTROLS</strong><br>
			Swipe or click and drag with the mouse to spin.<br>
			Use the + and - keys to zoom in and out.<br>
			Use the up, down, left, right arrow keys to move.<br>
		</p>
	</div>
	<!-- canvas container -->
	<div id="container"></div>

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script src="js/three.min.js"></script>
	<script src="js/OBJLoader.js"></script>
	<script src="js/Detector.js"></script>
	<script type="text/javascript" src="js/swipe.js"></script>
	<script type="text/javascript" src="js/dweet.io.min.js"></script>
	<script type="text/javascript" src="js/shared.js"></script>
	<script type="text/javascript" src="js/js.js"></script>
	</body>
</html>
