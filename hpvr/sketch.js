// variable to hold a reference to our A-Frame world
var world;
var container;
var spinBool = 0;
var patronus;
var sparkles = [];
var j = 0

function preload(){
	patronus = loadSound('patronus.mp3');
}


function setup() {

	// no canvas needed
	noCanvas();
	
	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');


		// pick a random texture


		// create a box here
		// note the inclusion of a 'clickFunction' property - this function will be invoked
		// every time this box is clicked on.  note that the function accepts a single argument
		// -- this is a reference to the box that was clicked (essentially the entity itself)
		var tree = new OBJ({
							asset: 'dead_obj',
							mtl: 'dead_mtl',
							x:0,
							y:5,
							z:-3,
							rotationX:0,
							rotationY:180,
							scaleX:3,
							scaleY:4,
							scaleZ:3,
							
	});
							
	


		world.add(tree);

		




	
	


	// create a plane to serve as our "ground"
	var g = new Plane({
						x:0, y:0, z:0,
						width:100, height:100,
						asset: 'stone',
						repeatX: 100,
						repeatY: 100,
						rotationX:-90, metalness:0.25
					   });



	// add the plane to our world
	world.add(g);


hummingbird = new Container3D({x:0, y:2, z:-3});

	// add the container to the world
	world.add(hummingbird);

	

	var s1 = new Sphere({
						x:0, y:0, z:-5,
						red: 255, green:255, blue:255,
						scaleX:0.1,
						scaleY:0.1,
						scaleZ:-0.07
						});	

	// add the box to the container
	hummingbird.addChild(s1);

	var c1 = new Cone({
						x:0.206, y:-0.033, z:-4.85,
						red: 255, green:255, blue:255,
						scaleX:0.023,
						scaleY:0.544,
						scaleZ:0.003,
						rotationX: 8.514, 
						rotationY: -31.78, 
						rotationZ: -99.401,
						red: 255, green:255, blue:255,
				
						});	

	// add the box to the container
	hummingbird.addChild(c1);

		
	var d1 = new Dodecahedron({
						x:0.327, y:0.347, z:-4.501,
						red: 255, green:255, blue:255,
						scaleX:0.332,
						scaleY:0.520,
						scaleZ:0.046,
						rotationX: -29.38, 
						rotationY: 142.44, 
						rotationZ: 13.314,
						red: 255, green:255, blue:255,
						clickFunction: function(theDodecahedron) {
							spinBool = 1;
						}
						});	

	// add the box to the container
	hummingbird.addChild(d1);
	
		var d2 = new Dodecahedron({
						x:0.459, y:0.347, z:-5.003,
						red: 255, green:255, blue:255,
						scaleX:0.332,
						scaleY:0.520,
						scaleZ:0.046,
						rotationX: 32.033, 
						rotationY: 155.38, 
						rotationZ: -5.003,
						red: 255, green:255, blue:255,
						clickFunction: function(theDodecahedron) {
							spinBool = 1;
						}
						});	

	// add the box to the container
	hummingbird.addChild(d2);




}







function draw() {

	if (mouseIsPressed) {
		world.moveUserForward(0.05);
	}

	// wrap around!

	// step 1: get the user's position
	// this is an object with three properties (x, y and z)
	var pos = world.getUserPosition();

	// now evaluate
	if (pos.x > 50) {
		world.setUserPosition(-50, pos.y, pos.z);
	}
	else if (pos.x < -50) {
		world.setUserPosition(50, pos.y, pos.z);
	}
	if (pos.z > 50) {
		world.setUserPosition(pos.x, pos.y, -50);
	}
	else if (pos.z < -50) {
		world.setUserPosition(pos.x, pos.y, 50);
	}







	if (spinBool == 1){
		hummingbird.spinY(1);
		

	}

	if (mouseIsPressed) {
		world.moveUserForward(0.05);
	}

	// wrap around!

	// step 1: get the user's position
	// this is an object with three properties (x, y and z)
	var pos = world.getUserPosition();

	// now evaluate
	if (pos.x > 50) {
		world.setUserPosition(-50, pos.y, pos.z);
	}
	else if (pos.x < -50) {
		world.setUserPosition(50, pos.y, pos.z);
	}
	if (pos.z > 50) {
		world.setUserPosition(pos.x, pos.y, -50);
	}
	else if (pos.z < -50) {
		world.setUserPosition(pos.x, pos.y, 50);
	}


while (j<15){


 for (let i = 0; i < 5; i++) {
    let s = new Sparkle(0, 0, -3);
    sparkles.push(s);
  }

for (var i = 0; i < sparkles.length; i++) {
		var result = sparkles[i].move();
		if (result == "gone") {
			sparkles.splice(i, 1);
			i-=1;
			j++;
		}

	}


}



}

function mousePressed() {
			if (spinBool == 1){
			patronus.play();
			}
	
}


class Sparkle {

	constructor(x,y,z) {

		this.mysparkle = new Box({
								x:x, y:y, z:z,
								red: 255, green:255, blue:255,
								scaleX: 0.5,
								scaleY: 0.5,
								scaleZ: 0.5
		});

		world.add(this.mysparkle);

		this.xOffset = random(1000);
		this.zOffset = random(2000, 3000);
	}

	move() {
		var yMovement = 0.01;

		var xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		var zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

		this.xOffset += 0.01;
		this.yOffset += 0.01;

		this.mysparkle.nudge(xMovement, yMovement, zMovement);

		var sparkleScale = this.mysparkle.getScale();
		this.mysparkle.setScale( sparkleScale.x-0.005, sparkleScale.y-0.005, sparkleScale.z-0.005);

		if (sparkleScale.x <= 0.20) {
			this.mysparkle.setRed(219);
			this.mysparkle.setGreen(243);
			this.mysparkle.setBlue(250);
		}
		if (sparkleScale.x <= 0.3 && sparkleScale.x > 0.2) {
			this.mysparkle.setRed(204);
			this.mysparkle.setGreen(255);
			this.mysparkle.setBlue(204);
			
		}
		if (sparkleScale.x <= 0.4 && sparkleScale.x > 0.3) {
			this.mysparkle.setRed(102);
			this.mysparkle.setGreen(204);
			this.mysparkle.setBlue(102);
		}
		if (sparkleScale.x <= 0.5 && sparkleScale.x > 0.4) {
			this.mysparkle.setRed(51);
			this.mysparkle.setGreen(178);
			this.mysparkle.setBlue(51);
			
		}

		if (sparkleScale.x <= 0) {
			world.remove(this.mysparkle);
			return "gone";
		}
		else {
			return "ok";
		}
	}
}



