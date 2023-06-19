leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
song = "";
function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0, 0, 500, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, LeftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remoe_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}
function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
function stop()
{
    song.stop();
}
function modelLoaded()
{
    console.log('PoseNet is Initialized');
}
function gotPoses(results)
{
    if(results.length > 0 )
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log( "LeftWristX = " + leftWristX + " LeftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log( "RightWristX = " + rightWristX + " RightWristY = " + rightWristY);
    }
}