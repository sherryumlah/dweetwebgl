// check for webgl support
if (!window.WebGLRenderingContext){
	container.append("Sorry - your browser does not support this webGL technology.  Try it on another device.");
	alert ("No webgl support");
} else {
	// setup canvas
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	var container = $('#container');

	// setup scene
	var scene = new THREE.Scene();

	// setup lighting
	var ambient = new THREE.AmbientLight( 0x101030 );
	ambient.name="light";
	scene.add( ambient );
	var directionalLight = new THREE.DirectionalLight( 0xdddddd);
	directionalLight.position.set( 0, 0, 1 );
	directionalLight.name="light";
	scene.add( directionalLight );

	// setup camera
	var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 0;

	// setup loader
	var loader = new THREE.OBJLoader();

	// setup mouse coords
	var mouseX = 0, mouseY = 0;

	// setup renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(winWidth, winHeight);
	container.append(renderer.domElement);

	// setup objectother
	var defaultModelURL = 'objects/Other/H614.obj';
	setModel(loader, defaultModelURL, scene, renderer);

	// listen for window resizing
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( winWidth, winHeight);
	}
}

window.addEventListener( 'resize', onWindowResize, false );

// SEND MODEL INFORMATION TO VIEWER
// function used to pass parameters to ajax for dweet io
function sendToViewer(type, direction, distance, posX, posY, posZ, modelurl){
	// update dweet io info
	var dweeturl = "*****"; // replace with actual dweeturl
	if (modelurl=='' || modelurl==null){
		modelurl = 'objects/Other/H614.obj';
	}
	$.ajax({
		type: "POST",
		url: dweeturl,
		data: {"type": type,"direction": direction, "distance": distance, "posX": posX, "posY": posY, "posZ": posZ, "modelurl": modelurl}
	}).done(function() {});
}

function setModel(loader, newCtdModel, scene, renderer){
	// setup object
	var model;
	var defaultModelURL = 'objects/Other/H614.obj';
	// remove existing models
	removeModels(scene);
	// load new model
	loader.load( newCtdModel, function ( object ) {
		object.name='model';
		object.url = newCtdModel;
		object.position.y = 0;
		object.position.x = 0;
		object.position.z = 0;
		camera.position.y = 0;
		camera.position.x = 0;
		object.position.z = -500;
		scene.add(object);
		// get position of new model
		var posX = object.position.x;
		var posY = object.position.y;
		var posZ = object.position.z;
		render(scene, camera, renderer);
 		// send new model info to viewer via dweetio
 		sendToViewer("swap","static",0,posX,posY,posZ,newCtdModel);
	}); // end loader
}; // end setModel

function getCurrentModel(scene){
	console.log("get current model 116");
	var sceneObjs = scene.children;
	 // get current object
	 for (var i=0; i<sceneObjs.length; i++){
	 	if (sceneObjs[i].name=='model'){
	 		object = sceneObjs[i];
	 		console.log(object);
	 	};
	 };
	 return object;
	};

// move object coordinates
function moveModel(object, posX, posY, posZ){
	object.position.x=posX;
	object.position.y=posY;
	object.position.z=posZ;
	renderer.render(scene,camera);
}

// FUNCTION FOR CLEARING THE SCENE OF MODELS AND EMPTY OBJECTS
function removeModels(scene){
	console.log("removing models 137");
	var objsToRemove = scene.children;
	for (var i=0; i<objsToRemove.length; i++){
		if (scene.children[i].name==null || scene.children[i].name=='' || scene.children[i].name=='model'){
			scene.remove(scene.children[i]);
		}
	}
	for (var i=0; i<objsToRemove.length; i++){
		console.log(scene.children[i]);
	}
} // end removeModels

function render(scene, camera, renderer) {
	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}

function animateModel(direction, distance, object){
	var times = distance/10;
	var interv = 1;
	if (direction == "right"){
		setTimer(function(){animateRight(object);}, interv, times);
	} else if (direction =="left"){
		setTimer(function(){animateLeft(object);}, interv, times);
	} else if (direction =="up"){
		setTimer(function(){animateUp(object);}, interv, times);
	} else if (direction =="down"){
		setTimer(function(){animateDown(object);}, interv, times);
	} else {
		console.log("got nothing for you.");
	}
};

function setTimer(animate, interv, times){
	var callback = function (t, counter){
		return function(){
			if (t-- >0){
				window.setTimeout(callback, ++counter * interv);
				animate(object);
			} else {
				swipeX = 0;
				interv = 1;
			}
		}
	}(times,0);
	window.setTimeout(callback, interv);
	}; // end setTimer

	function animateRight(object){
		object.rotation.y += 0.1;
		renderer.render(scene,camera);
	};

	function animateLeft(object){
		object.rotation.y -= 0.1;
		renderer.render(scene,camera);
	};

	function animateUp(object){
		object.rotation.x -= 0.1;
		renderer.render(scene,camera);
	};

	function animateDown(object){
		object.rotation.x += 0.1;
		renderer.render(scene,camera);
	};


