function onWindowResize() {
	// USED TO RESET DIMENSIONS OF CANVAS ON WINDOW RESIZE
	windowHalfX = window.innerWidth;
	windowHalfY = window.innerHeight;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
	// USED FOR MOUSE COORDINATES
	mouseX = ( event.clientX - windowHalfX ) ;
	mouseY = ( event.clientY - windowHalfY ) ;
}

// SEND MODEL INFORMATION TO VIEWER
// function used to pass parameters to ajax for dweet io
function sendToViewer(type, direction, distance, posX, posY, posZ, modelurl){
	 var dweeturl = "****";
	 if (modelurl=='' || modelurl==null){
	 	modelurl = 'objects/other/h614.obj';
	 }
   	 $.ajax({
		  type: "POST",
		  url: dweeturl,
		  data: {"type": type,"direction": direction, "distance": distance, "posX": posX, "posY": posY, "posZ": posZ, "modelurl": modelurl}
	}).done(function() {});
}

// listen for key controls
document.onkeydown = checkKey;
function checkKey(e) {
	var sceneObjs = scene.children;
	 // get current object
	 for (var i=0; i<sceneObjs.length; i++){
	 	if (sceneObjs[i].name=='model'){
	 		var object = sceneObjs[i];
	 	}
	 }
    e = e || window.event;
    if (e.keyCode == '187') {
        // + zoom
        object.position.z+=10;
    } else if (e.keyCode == '189') {
        // - zoom
        object.position.z-=10;
    } else if (e.keyCode=='39'){
    	// right arrow
    	object.position.x+=10;
    } else if (e.keyCode=='37'){
    	// left arrow
    	object.position.x-=10;
    } else if (e.keyCode=='38'){
    	// up arrow
    	object.position.y+=10;
    } else if (e.keyCode=='40'){
    	// down arrow
    	object.position.y-=10;
    }
    // get new model position
	var posX = object.position.x;
	var posY = object.position.y;
	var posZ = object.position.z;
	renderer.render(scene,camera);
	// send new model location information to viewer
	sendToViewer("move","move",0,posX,posY,posZ,object.url);
} // end checkKey

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

// event listener for swipe
$('#container').swipe({
	swipe:function(event, direction, distance, duration, fingerCount){
   		var times = distance/10;
	   	var sceneObjs = scene.children;
	   	var posX, posY, posZ, modelurl;
	   	// get current object
		for (var i=0; i<sceneObjs.length; i++){
			if (sceneObjs[i].name=='model'){
		 		object = sceneObjs[i];
		 		posX = object.position.x;
		 		posY = object.position.x;
		 		posZ = object.position.z;
		 		modelurl = object.url;
		 	}
	 	};
		// send animation information to viewer
		sendToViewer("swipe",direction,distance,posX,posY,posZ,modelurl);
		var interv = 1;
		var times = distance/10;

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
	},
  	threshold:100
}); // end swipe check


/************** MENU ************************/
// MENU CLICK TO SWAP OBJECTS
$('.subli').on('click', function(e){
	 removeModels(scene);
	 // load new model
	var category = $(this).data('dir');
	var modelNumber = $(this).data('ctdmodel');
	var newCtdModel = "objects/"+category+"/"+modelNumber+".obj";
	var type="swap";
	var direction="static";
	var distance = 0;
	var posX = 0;
	var posY = 0;
	var posZ = 0;
	setModel(loader, newCtdModel, scene, renderer);
});	// end menu event handler

// Menu selection toggle submenus event handler
$(".category").on("click", function(){
	$(this).next('.sub').slideToggle();
	if ($(this).hasClass('master')){
		$(this).toggleClass('active');
	};
});

// hide/show menu options
$('.expand').on('click', function(e){
	$('.mainmenu').toggle();
	if ($(this).hasClass('master')){
		$(this).toggleClass('active');
	};
});
