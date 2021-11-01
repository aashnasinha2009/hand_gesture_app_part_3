prediction1="";
prediction2="";

Webcam.set({
height:300,
width:350,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
 document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log(ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qGhZ-_R6K/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
 var synth=window.speechSynthesis;
 speakdata1="The first prediction is "+prediction1;
 speakdata2="The second prediction is "+prediction2;
 var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
 synth.speak(utterthis);
}

function check(){

    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}

function gotResult(error,results){

    if(error){
    console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;

        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();

        if(results[0].label=="Best"){

            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }

        if(results[0].label=="Victory"){

            document.getElementById("update_emoji").innerHTML = "&#9996;"
        }

        if(results[0].label=="Amazing"){

            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }




        if(results[1].label=="Best"){

            document.getElementById("update_emoji2").innerHTML = "&#128077;"
        }
      
        if(results[1].label=="Victory"){

            document.getElementById("update_emoji2").innerHTML = "&#9996;"
        }

        if(results[1].label=="Amazing"){

            document.getElementById("update_emoji2").innerHTML = "&#128076;"
        }

    }
}
