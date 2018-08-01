var mesh, mesh2, mesh3
var renderer, scene, camera, container
var arSource, arContext, arMarker = []

// Start content
init()

function init(){

    // Main HTML container
    container = document.getElementById('container')

    // Render setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    scene = new THREE.Scene()
    camera = new THREE.Camera()

    renderer.setClearColor(0x000000, 0)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // scene setup
    container.appendChild(renderer.domElement)
    scene.add(camera)
    scene.visible = false

    mesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({
        color: 0x16025F,
        transparent: true,
        opacity: 0.5
    }))

    mesh2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({
        color: 0x1F3277,
        transparent: true,
        opacity: 0.5
    }))

    mesh3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({
        color: 0x3478A6,
        transparent: true,
        opacity: 0.4
    }))

    scene.add(mesh)
    scene.add(mesh2)
    scene.add(mesh3)

    // AR requirements
    arSource = new THREEx.ArToolkitSource({
        sourceType : 'webcam',
    })

    arContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: './assets/data/camera_para.dat',
        detectionMode: 'mono',
    })

    arMarker[0] = new THREEx.ArMarkerControls(arContext, camera, {
        type : 'pattern',
        patternUrl : './assets/data/patt.hiro',
        changeMatrixMode: 'cameraTransformMatrix'
    })

    arMarker[1] = new THREEx.ArMarkerControls(arContext, camera, {
        type : 'pattern',
        patternUrl : './assets/data/u4bi.patt',
        changeMatrixMode: 'cameraTransformMatrix'
    })

    /* handle */
    arSource.init(function(){
        arSource.onResize()
        arSource.copySizeTo(renderer.domElement)
        if(arContext.arController !== null) arSource.copySizeTo(arContext.arController.canvas)
    })

    arContext.init(function onCompleted(){
        camera.projectionMatrix.copy(arContext.getProjectionMatrix())
    })

    render()  

}   



/**
 * Render AR animation
 */
function render () {
    requestAnimationFrame(render)
    renderer.render(scene,camera)                

    if(arSource.ready === false) return

    arContext.update(arSource.domElement)
    scene.visible = camera.visible

    mesh.rotateX(.15)
    mesh2.rotateY(.15)
    mesh3.rotateZ(.2)
}          
