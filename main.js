  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/o-8uohv28/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(720, 500);
    // Create the video
    video = createCapture(VIDEO);
    video.size(720, 500);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);


    // Mensajes 
    var img_cb = new Image(); img_cb.src = "canecas/CanecaAprovBlanca.png"; img_cb.width = "500"; 
    var img_cn = new Image(); img_cn.src = "canecas/CanecaNoAprovNegra.png"; img_cn.width = "500"; 
    var img_cv = new Image(); img_cv.src = "canecas/CanecaOrganicoVerde.png"; img_cv.width = "500"; 

    if (label=="Residuo aprovechable - botella") {
        document.querySelector("#mostar").innerHTML = "";
        document.querySelector("#mostar").append(img_cb);
    }

    if(label=="Residuo aprovechable - vaso") {
        document.querySelector("#mostar").innerHTML = "";
        document.querySelector("#mostar").append(img_cb);
    }

    if(label=="Residuo no aprovechable - bolsa") {
        document.querySelector("#mostar").innerHTML = "";
        document.querySelector("#mostar").append(img_cn);
    }

    if(label=="Residuo no aprovechable - caja") {
        document.querySelector("#mostar").innerHTML = "";
        document.querySelector("#mostar").append(img_cn);
    }

    if(label=="Residuo orgánico aprovechable - banano") {
        document.querySelector("#mostar").innerHTML = "";
        document.querySelector("#mostar").append(img_cv);
    }

    if(label=="Residuo orgánico aprovechable - manzana") {
        document.querySelector("#mostar").innerHTML = "";
        document.querySelector("#mostar").append(img_cv);
    }
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }

