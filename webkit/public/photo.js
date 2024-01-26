const width = 640, height = 480,
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

let video = null, isSetup = false;
let once = false;
let resetflag = false;
const timer_text = document.getElementById("timer");

const counter = 5
let countdown = counter;
let tld;
let tld2;

function countDown() {
    timer.innerText = countdown;

    if (countdown <= 0) {
        ctx.scale(1, -1);
        ctx.drawImage(video, 100, 100, width, height);
        clearInterval(tld);
    }

    countdown--;
}

function reset() {
    once = false;
    countdown = counter;
    clearInterval(tld2);
}

function startPhoto(e) {

    if (once == false) {
        once = true;

        if (e !== undefined)
            e.preventDefault();

        tld = setInterval(countDown, 1000); 
    }
}

function Setup(){
    if(!isSetup){
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        canvas.style.backgroundColor = 'purple'
        
        video = document.getElementById('camera');        
        
        navigator.mediaDevices
            .getUserMedia({video:true, audio:false})
            .then((stream)=>{
                video.srcObject = stream;
                video.play();
            }).catch((err)=>{
                console.error(`error obtaining video stream: \n ${err}`);
            });

        isSetup = true;
    }
}



Setup();