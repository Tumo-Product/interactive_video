const record = document.querySelector('.record');
const stopBtn = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const soundClips = document.querySelector('.sound-clips');
const canvas = document.querySelector('.visualizer');
const mainSection = document.querySelector('.main-controls');
let timer = 0;
let rec, str;
let data;
let played = false;

record.onclick = function() {
    startRecording();
}

stopBtn.disabled = true;

let audioCtx;
const canvasCtx = canvas.getContext("2d");
let paused = false;
let audio = document.getElementById("audioElem");

audio.ontimeupdate = (event) => {
    if (audio.currentTime >= audio.duration) {
        document.querySelector(".controlBtn").classList.remove("flash");
        played = false;
    }
}

document.querySelector(".controlBtn").onclick = () => {
    if (!played) {
        audio.play();
        document.querySelector(".controlBtn").classList.add("flash");
    } else {
        audio.pause();
        document.querySelector(".controlBtn").classList.remove("flash");
    }
    
    played = !played;
}

$(async () => {
    $(".delete").click(() => {
        audio.pause();
        audio.currentTime = 0;
        $("#background").css("opacity", 0).hide();
        $(".recorder img").css({"opacity": 0});
        setTimeout(() => {
            $(".recorder img").hide();

            $(".stop").show().css("opacity", 1);
            $(".pause").show().css("opacity", 1);
            $("canvas").css("opacity", 1).show();
            $(".progressContainer").removeClass("offscreen");
            $(".progress").css("width",  "0%");
            timer = 0;
            rec.start();
            paused = false;
            visualize(str);
        }, 50);
    })
 
    $(".send").click(async () => {
        $("#music").remove();
        audio.pause();
        audio.currentTime = 0;
        $("#choices").remove();
        $("#background").css("opacity", 0).hide();
        $(".recorder img").css({"opacity": 0});
        setTimeout(() => {
            $(".recorder img").hide();
        }, 50);

        let loopIntro = document.getElementById("v_loopIntro");
        if (loopIntro !== null) {
            player.controls.play("v_loopIntro");
            loopIntro.ontimeupdate = () => {
                if (loopIntro.currentTime >= loopIntro.duration) {
                    audio.play();
                    player.controls.play("v_loopVideo");
                    $("#loopIntro").remove();
                    console.log(loopIntro);
                }
            }
        } else {
            audio.play();
            player.controls.play("v_loopVideo");
        }

        audio.ontimeupdate = () => {
            $(".controls").hide();
            if (audio.currentTime >= audio.duration) {
                $("#loopVideo").remove();

                let thankYou = document.getElementById("v_thankYou");
                player.controls.play("v_thankYou");
                thankYou.ontimeupdate = () => {
                    if (thankYou.currentTime >= thankYou.duration) {
                        $(`#v_thankYou`).css("filter", "blur(5px)");
                    }
                };
            }
        }
        
        $(".recorder").css({ "opacity": 0, "pointer-events": "none" });
        $(".video_block").css("transition", "0s"); await timeout(10);
        $(".video_block").css("opacity", 0);
        $("#loopIntro").css("opacity", 1);
        $("#loopVideo").css("opacity", 1); $("#thankYou").css("opacity", 1);

        window.parent.postMessage({
            application: 'activity-manager',
            message: 'set-answers',
            data: { answers: data }
        }, '*');
    });
});

const startRecording = () => {
    $(".stop").show();
    $(".pause").show();
    $(".progressContainer").removeClass("offscreen");
    $(".record").hide();
    $("#background").css('opacity', 0);
    $("#background").attr("src", "images/reviewScreen.png")

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');

        const constraints = { audio: true };
        let chunks = [];

        let onSuccess = function (stream) {
            const mediaRecorder = new MediaRecorder(stream);
            str = stream;
            rec = mediaRecorder;
            mediaRecorder.start();
            visualize(stream);

            stopBtn.onclick = function () {
                paused = true;
                mediaRecorder.stop();
                console.log(mediaRecorder.state);
                console.log("recorder stopped");
            }

            pause.onclick = function() {
                paused = !paused;
                if (paused) {
                    mediaRecorder.pause();
                    $(".pause").addClass("flash");
                } else {
                    mediaRecorder.resume();
                    $(".pause").removeClass("flash");
                    visualize(stream);
                }
            }

            mediaRecorder.onstop = async function (e) {
                $(".progressContainer").addClass("offscreen");
                $(".recorder img").css({"opacity": 0});
                $("canvas").css("opacity", 0);
                
                setTimeout(() => {
                    $(".recorder img").hide();

                    $(".delete").show().css("opacity", 1);
                    $(".send").show().css("opacity", 1);
                    $(".controlBtn").show().css("opacity", 1);
                    $("#background").css("opacity", 1).show();
                }, 50);

                const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                chunks = [];

                let fr = new FileReader();
                basedat = await (new Promise((resolve)=>{
                    fr.readAsDataURL(blob);
                    fr.onloadend = () => { resolve(fr.result); }
                }));

                audio.src = basedat;
                data = [basedat];
            }

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            }
        }

        let onError = function (err) {
            console.log('The following error occured: ' + err);
        }

        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

    } else {
        console.log('getUserMedia not supported on your browser!');
    }
}

const fps = 60;
const frameMinTime = (1000/60) * (60 / fps) - (1000/60) * 0.5;
let lastFrameTime = 0;
function visualize(stream) {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }

    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    //analyser.connect(audioCtx.destination);

    draw();

    function draw() {
        if (!paused) {
            if(new Date().getTime() - lastFrameTime < frameMinTime) {
                requestAnimationFrame(draw);
                return;
            }
            lastFrameTime = new Date().getTime();
            requestAnimationFrame(draw);

            timer++;
            $(".progress").css("width", `${timer / 3600 * 100}%`);
            $(".start").text((timer / 60).toFixed(1) + "s");
            if (timer >= 3600) {
                rec.stop();
                paused = true;
            }

            const WIDTH = canvas.width
            const HEIGHT = canvas.height;

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = '#313131';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            canvasCtx.lineWidth = 1.5;
            canvasCtx.strokeStyle = 'rgba(255, 255, 255)';

            canvasCtx.beginPath();

            let sliceWidth = WIDTH * 2 / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                let v = dataArray[i] / 128.0;
                let y = v * HEIGHT / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth * 1;
            }

            canvasCtx.lineTo(canvas.width, canvas.height);
            canvasCtx.stroke();
        }
    }
}