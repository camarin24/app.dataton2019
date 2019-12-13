import React, { Component } from 'react';

export default class AR extends Component {

    state = {
        user: null,
        random_user: {},
        ip: 0
    }

    componentDidMount() {



        window.THREEx.ArToolkitContext.baseURL = process.env.PUBLIC_URL;
        // init renderer
        var renderer = new window.THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        const elem = document.getElementById("ar-body");
        renderer.setClearColor(new window.THREE.Color('lightgrey'), 0)
        renderer.setSize(elem.offsetWidth, elem.offsetHeight);
        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0px'
        renderer.domElement.style.left = '0px'
        elem.appendChild(renderer.domElement);
        // array of functions for the rendering loop
        var onRenderFcts = [];
        // init scene and camera
        var scene = new window.THREE.Scene();
        //////////////////////////////////////////////////////////////////////////////////
        //		Initialize a basic camera
        //////////////////////////////////////////////////////////////////////////////////
        // Create a camera
        var camera = new window.THREE.Camera();
        scene.add(camera);
        ////////////////////////////////////////////////////////////////////////////////
        //          handle arToolkitSource
        ////////////////////////////////////////////////////////////////////////////////
        var arToolkitSource = new window.THREEx.ArToolkitSource({
            // to read from the webcam
            sourceType: 'webcam',
            // // to read from an image
            // sourceType : 'image',
            // sourceUrl : window.THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',
            // to read from a video
            // sourceType : 'video',
            displayWidth: elem.offsetWidth,
            displayHeight: elem.offsetHeight,
            // sourceUrl : window.THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',
        })
        arToolkitSource.init(function onReady() {
            onResize()
        })
        // handle resize
        window.addEventListener('resize', function () {
            onResize()
        })


        function onResize() {
            arToolkitSource.onResizeElement()
            arToolkitSource.copyElementSizeTo(renderer.domElement)
            if (arToolkitContext.arController !== null) {
                arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
            }
        }
        ////////////////////////////////////////////////////////////////////////////////
        //          initialize arToolkitContext
        ////////////////////////////////////////////////////////////////////////////////
        // create atToolkitContext
        var arToolkitContext = new window.THREEx.ArToolkitContext({
            cameraParametersUrl: window.THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
            detectionMode: 'mono',
            // maxDetectionRate: 30,
            canvasWidth: elem.offsetWidth,
            canvasHeight: elem.offsetHeight,
        })
        // initialize it
        arToolkitContext.init(function onCompleted() {
            // copy projection matrix to camera
            camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        })
        // update artoolkit on every frame
        onRenderFcts.push(function () {
            if (arToolkitSource.ready === false) return
            arToolkitContext.update(arToolkitSource.domElement)
            // update scene.visible if the marker is seen
            // scene.visible = camera.visible
        })
        ////////////////////////////////////////////////////////////////////////////////
        //          Create a ArMarkerControls
        ////////////////////////////////////////////////////////////////////////////////
        // init controls for camera
        var markerControls = new window.THREEx.ArMarkerControls(arToolkitContext, camera, {
            type: 'pattern',
            patternUrl: window.THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
            // patternUrl : window.THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
            // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
            changeMatrixMode: 'cameraTransformMatrix'
        })
        // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
        scene.visible = false
        //////////////////////////////////////////////////////////////////////////////////
        //		add an object in the scene
        //////////////////////////////////////////////////////////////////////////////////
        // add a torus knot


        var geometry = new window.THREE.CubeGeometry(1, 1, 1);
        var material = new window.THREE.MeshBasicMaterial({
            color: '#284182'
        });
        var mesh1 = new window.THREE.Mesh(geometry, material);
        mesh1.position.y = geometry.parameters.height / 2
        scene.add(mesh1);

        var geometry = new window.THREE.CubeGeometry(1.3, 1.3, 1.3);
        var material = new window.THREE.MeshBasicMaterial({
            color: '#F4D113'
        });
        var mesh2 = new window.THREE.Mesh(geometry, material);
        mesh2.position.y = geometry.parameters.height / 2
        mesh2.position.z = geometry.parameters.height * 1.4
        scene.add(mesh2);

        var geometry = new window.THREE.CubeGeometry(0.8, 0.8, 0.8);
        var material = new window.THREE.MeshBasicMaterial({
            color: '#C4202B'
        });
        var mesh3 = new window.THREE.Mesh(geometry, material);
        mesh3.position.y = geometry.parameters.height / 2
        mesh3.position.z = -geometry.parameters.height * 1.6
        scene.add(mesh3);


        let user_name = sessionStorage.getItem('user_name')
        console.log(user_name);
        user_name = 'Felcidades ' + user_name + ' te tenemos un crédito por $1.000.000!'

        let sprite = new window.THREE.TextSprite({
            fillStyle: '#ffffff',
            fontFamily: '"Helvetica',
            fontSize: 0.15,
            fontWeight: 'bold',
            text: [
                user_name,
            ].join('\n'),
        });
        sprite.position.y = 1.7
        scene.add(sprite);
        onRenderFcts.push(function (delta) {
            mesh1.rotation.y += Math.PI * delta
            mesh2.rotation.y -= Math.PI * delta
            mesh3.rotation.y += Math.PI * delta
        })


        //////////////////////////////////////////////////////////////////////////////////
        //		render the whole thing on the page
        //////////////////////////////////////////////////////////////////////////////////
        // render the scene
        onRenderFcts.push(function () {
            renderer.render(scene, camera);
        })
        // run the rendering loop
        var lastTimeMsec = null
        requestAnimationFrame(function animate(nowMsec) {
            // keep looping
            requestAnimationFrame(animate);
            // measure time
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
            lastTimeMsec = nowMsec
            // call each update function
            onRenderFcts.forEach(function (onRenderFct) {
                onRenderFct(deltaMsec / 1000, nowMsec / 1000)
            })
        })
    }

    getName() {

    }

    render() {
        return (<div id="ar-body" style={{ width: "100vh", height: "100vh" }} />)
    }
}
