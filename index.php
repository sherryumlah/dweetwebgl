<!DOCTYPE html>
<html lang="en">
	<head>
		<title>three.js webgl - loaders - OBJ loader</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				font-family: Monospace;
				background-color: #000;
				color: #fff;
				margin: 0px;
				overflow: hidden;
			}
			#info {
				color: #fff;
				position: absolute;
				top: 10px;
				width: 100%;
				text-align: center;
				z-index: 100;
				display:block;
			}
			.container{
				width: 75%;
				float:left;
				height: 100%;
				padding: 0;
				margin: 0;
			}
			#info a, .button { color: #f00; font-weight: bold; text-decoration: underline; cursor: pointer }
			.nav .category, .sub{
				list-style: none;
				margin:0;
				color:#000;
				font-size: 1.25rem;
				cursor: pointer;
				border-bottom: 1px solid #777;
			}
			.nav .category:hover{
				color:#770000;
				margin:0;
				background-color:#ddd;
			}
			.subli:hover{
				color:#770000;
				background-color:#bbb;
			}
			ul{
				-webkit-padding-start: 0px;
				text-indent:1rem;
				margin:0;
				margin-top:40px;
			}
			.sub{
				text-indent:1.75rem;
				background-color:#ddd;
				font-size:1rem;
			}
			.category{
				padding: 0.5rem 0;
			}
			.sub{ display: none;}
			.menu{
				background-color:#eee;
				width: 25%;
				margin:0;
				padding:0;
				float:left;
			}
			.subli{
				border-bottom:1px solid #777;
				padding: 0.5rem 0;
			}
			.subli:last-child{
				border-bottom:0px;
			}
			.master:before{
				content:"> ";
			}
			.active:before{
				content:"V ";
			}
		</style>
	</head>

	<body>
		<div id="container"></div>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/three.min.js"></script>
    <script type="text/javascript" src="js/OBJLoader.js"></script>
    <script type="text/javascript" src="js/Detector.js"></script>
    <script type="text/javascript" src="js/dweet.io.min.js"></script>
    <script type="text/javascript" src="js/viewer.js"></script>
    <script type="text/javascript" src="js/shared.js"></script>
	</body>
</html>
