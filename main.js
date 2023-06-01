song="";
objects=[];
status="";

function preload(){
    song=loadSound("alarm.mp3")
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects"; 
}


function modelLoaded(){
    console.log("model loaded");
    status=true;
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    Image(video,0,0,380,380);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill (r,g,b);
            percent = floor(objects[i].confidence*100);
            text(obgects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(object[i.label=="person"]){
               document.getElementById("number_of_objects").innerHTML="Baby Found";
               console.log("stop");
               song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
               console.log("play");
               song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("number_of_objects").innerHTML="Baby Not Found";
               console.log("play");
               song.play();
        }
    }
}
