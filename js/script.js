(function() {
  
  var width = 320;    
  var height = 0;     

  var streaming = false;

  var video = null;
  var canvas = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
  
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    cancelbutton.addEventListener('click', function(ev){
      cancelpicture();
      ev.preventDefault();
    }, false);
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    canvas.setAttribute('src', data);
  }  


  function takepicture() {
    document.getElementById("video").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      //photo.setAttribute('src', data);
      canvas.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }
  function cancelpicture() {
    //document.getElementById("photo").style.display = "none";
    document.getElementById("canvas").style.display = "none";
    document.getElementById("video").style.display = "block";
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();
