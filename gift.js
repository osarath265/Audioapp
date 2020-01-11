const modelParams = {
    flipHorizontal: false,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.5,    // confidence threshold for predictions.
  }
  var fontsize=100;

navigator.getUserMedia=
 navigator.getUserMedia || 
 navigator.webkitGetUserMedia || 
 navigator.mozGetUserMedia||
 navigator.msGetUserMedia;

 const video=document.querySelector('#video');
 const audio=document.querySelector('#audio');
 const draw=document.querySelector('#draw');
 let model;
 

 handTrack.startVideo(video)
    .then(status=>{
        if(status){
            navigator.getUserMedia({video:{}},stream=>{
                video.srcObject=stream;
                setInterval(runDetection,100)
            },
            err=>console.log(err)
            );
        }
    });
function runDetection(){
    model.detect(video).then(predictions=>
        {
            if(predictions.length !==0)
            {
                let hand1=predictions[0].bbox;
                let x=hand1[0];
                let y=hand1[1];
                
                if(y>300)
                {
                    if(x<150)
                    {
                        audio.src="audio1.mp3";
                        $('#indicator4').css('color','lightgreen');
                        $('#indicator2').css('color','white');
                        $('#indicator1').css('color','white');
                        $('#indicator3').css('color','white');
                    
                    }
                   
                    else if(x>400 && x<500)
                    {
                        audio.src="kgf.mp3";
                        $('#indicator1').css('color','black');
                        $('#indicator2').css('color','white');
                        $('#indicator3').css('color','white');
                        $('#indicator4').css('color','white');
                    }
                    else if(x>300 && x<400){
                        audio.src="stark.mp3";
                        $('#indicator2').css('color','red');
                        $('#indicator1').css('color','white');
                        $('#indicator3').css('color','white');
                        $('#indicator4').css('color','white');
                    }
                    else if(x>150 && x<300)
                    {
                        audio.src="avengers.mp3";
                        $('#indicator3').css('color','blue');
                        $('#indicator2').css('color','white');
                        $('#indicator1').css('color','white');
                        $('#indicator4').css('color','white');
                    }
                }
                audio.play();
            }
        });
}


handTrack.load(modelParams)
      .then(lmodel=>
        {
            model=lmodel;
        });       


