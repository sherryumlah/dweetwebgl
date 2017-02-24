function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
}

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	//	camera.position.x += ( mouseX - camera.position.x ) * .05;
	//	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}


function swapModel(loader, newCtdModel, scene, renderer){

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
	}); // end loader
}; // end swapModel




/***** DWEET IO LISTENER **********/
		// listen for changes to model
		dweetio.listen_for("*****", function(dweet){

			if (dweet.content.type == "swap"){
				// swap model for new one
				removeModels(scene);

			// 	console.log(dweet.content.modelurl);
			swapModel(loader, dweet.content.modelurl, scene, renderer);
			//render(scene, camera, renderer);

		} else if (dweet.content.type=="move"){
				// get new x,y,z coords
				console.log(scene);
				var posX = dweet.content.posX;
				var posY = dweet.content.posY;
				var posZ = dweet.content.posZ;

			 	// get current object
			 	var object = getCurrentModel(scene);

			 	// move object to new coords
			 	moveModel(object, posX, posY, posZ);

			 } else if (dweet.content.type=="swipe"){
				// we are animating current model
				// get swipe gesture and animation information
				var direction = dweet.content.direction;
				var distance = dweet.content.distance;
				var object = getCurrentModel(scene);
				animateModel(direction,distance,object);
			};

	} ); //end dweet


		window.addEventListener( 'resize', onWindowResize, false );

