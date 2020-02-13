// these need to be accessed inside more than one function so we'll declare them first




let container;
let container2;
let camera;
let camera2;
let controls1;
let renderer;
let renderer2;
let scene;
let scene2;


var objects = [];
const mixers = [];
const clock = new THREE.Clock();

function init() {

  container = document.querySelector( '#scene-container' );
  container2 = document.querySelector( '#scene-container2' );

  scene = new THREE.Scene();
  scene2 = new THREE.Scene();
  

 

  createCamera();
  //createCamera2();
  createControls();
  createLights();
  //createLights2();
  loadModels();
  loadModels2();
  createRenderer();
  //createRenderer2();

  var controls = new THREE.DragControls( objects, camera, renderer.domElement );

  controls.addEventListener( 'dragstart', function ( event ) {

    event.object.material.emissive.set( 0xaaaaaa );
    controls1.enabled = false;


  } );

  controls.addEventListener( 'dragend', function ( event ) {

    event.object.material.emissive.set( 0x000000 );
    controls1.enabled = true;

  } );



  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera( 50, container.clientWidth / container.clientHeight, 1, 100 );
  camera.position.set( 0, 12.5, 18.5 );

  camera2 = new THREE.PerspectiveCamera( 50, container2.clientWidth / container2.clientHeight, 1, 100 );
  camera2.position.set( 15, 8, 1 );


}
//function createCamera2() {

 // camera2 = new THREE.PerspectiveCamera( 50, container2.clientWidth / container2.clientHeight, 1, 100 );
 // camera2.position.set( 5, 5, 5 );



//}

function createControls() {

  controls1 = new THREE.OrbitControls( camera, container );
  controls2 = new THREE.OrbitControls( camera2, container2 );
  

  

}



function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  const mainLight2 = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );
  
  scene.add( ambientLight, mainLight );
  scene2.add(mainLight2);
  
}

/*function createLights2() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  scene2.add( ambientLight, mainLight );
  
}*/

function loadModels() {

  const loader = new THREE.GLTFLoader();
  
  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoadStatic = ( gltf, position ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

    /*const animation = gltf.animations[ 0 ];

    const mixer = new THREE.AnimationMixer( model );
    mixers.push( mixer );

    const action = mixer.clipAction( animation );
    action.play();*/
    
    scene.add( model );
    
    
    
    


  };


  const onLoadMove = ( gltf, position ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

    /*const animation = gltf.animations[ 0 ];

    const mixer = new THREE.AnimationMixer( model );
    mixers.push( mixer );

    const action = mixer.clipAction( animation );
    action.play();*/
    
    scene.add( model );
    objects.push (model);
    
    
    
    


  };

  
  

  
  var targetEl = document.getElementById("target");
  targetEl.addEventListener("click", onclick, false);

function onclick(){

  var sculpttestPosition = new THREE.Vector3( 1, 0, 1 );
  var model = loader.load( '3D/models/Egg.glb', gltf => onLoadMove( gltf, sculpttestPosition ));
     
      /*const animation = gltf.animations[ 0 ];
  
      const mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );
  
      const action = mixer.clipAction( animation );
      action.play();*/
      
      scene.add( model );
      
      
  
  
    };

    var target2El = document.getElementById("target2");
    target2El.addEventListener("click", onclick2, false);

function onclick2(){

  var sculpttestPosition = new THREE.Vector3( -4, 0, -5 );
  var object = loader.load( '3D/models/Badring.glb', gltf => onLoadStatic( gltf, sculpttestPosition ));
     
      /*const animation = gltf.animations[ 0 ];
  
      const mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );
  
      const action = mixer.clipAction( animation );
      action.play();*/
      
      scene.add( object );
      
      
      
  
  
    };

   

    
  
    

  
    

  
  
  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  

  const flamingoPosition = new THREE.Vector3( 7.5, 0, -10 );
  loader.load( '3D/models/d.glb', gltf => onLoadStatic( gltf, flamingoPosition ), onProgress, onError );

  const storkPosition = new THREE.Vector3( 0, -6.5, -10 );
  loader.load( '3D/models/Scene.glb', gltf => onLoadStatic( gltf, storkPosition ), onProgress, onError );

  

}
function loadModels2() {

  const loader = new THREE.GLTFLoader();
  
  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position ) => {
    //scene2.background = new THREE.Color(0xFFA500);
    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

    /*const animation = gltf.animations[ 0 ];

    const mixer = new THREE.AnimationMixer( model );
    mixers.push( mixer );

    const action = mixer.clipAction( animation );
    action.play();*/
    
    scene2.add( model );
    
    
    
    
  

  };
  
  const storkPosition = new THREE.Vector3( 5, 4, 0 );
  loader.load( '3D/models/badring2.glb', gltf => onLoad( gltf, storkPosition ));
 



}


function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );
  renderer.setClearColor( 0x000000, 0 );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;
  container.appendChild( renderer.domElement );


// Create REnderer2

  renderer2 = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer2.setSize( container2.clientWidth, container2.clientHeight );
  renderer2.setClearColor( 0x000000, 0 );

  renderer2.setPixelRatio( window.devicePixelRatio );

  renderer2.gammaFactor = 2.2;
  renderer2.gammaOutput = true;

  renderer2.physicallyCorrectLights = true;
  container2.appendChild( renderer2.domElement );

  

}

/*function createRenderer2() {

  // create a WebGLRenderer and set its width and height
  renderer2 = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer2.setSize( container2.clientWidth, container2.clientHeight );
  renderer2.setClearColor( 0x000000, 0 );

  renderer2.setPixelRatio( window.devicePixelRatio );

  renderer2.gammaFactor = 2.2;
  renderer2.gammaOutput = true;

  renderer2.physicallyCorrectLights = true;
  container2.appendChild( renderer2.domElement );


  

}*/





function update() {

  const delta = clock.getDelta();

  for ( const mixer of mixers ) {

    mixer.update( delta );

  }

}

function render() {

  renderer.render( scene, camera );
  renderer2.render( scene2, camera2);
  

}



function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

init();
