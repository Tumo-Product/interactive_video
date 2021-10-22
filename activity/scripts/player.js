const player = {
    canRewind: true,
    controls : {
        play : (video) => {
            document.getElementById("music").play();
            if (video == undefined) {
                document.getElementById(`v_${current_video}`).play();
            } else {
                document.getElementById(video).play();
            }

            view.change_styles(0);
        },
    
        pause : (video) => {
            document.getElementById("music").pause();
            if (video == undefined) {
                document.getElementById(`v_${current_video}`).pause();
            } else {
                document.getElementById(video).pause();
            }

            view.change_styles(1);
        },
    
        rewind_video : (time) => {
            document.getElementById("music").currentTime += time;
            if (player.canRewind) {
                player.canRewind = false;
                let currentVideo = document.getElementById(`v_${current_video}`);
                if (currentVideo.currentTime == currentVideo.duration && time < 0){
                    player.controls.play();
                }
                currentVideo.currentTime += time;

                setTimeout(() => {
                    player.canRewind = true;
                }, 100);
            }         
        }
    }
}
