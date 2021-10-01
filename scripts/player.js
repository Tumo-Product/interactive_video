const player = {
    canRewind: true,
    controls : {
        play : (video) => {
            if (video == undefined) {
                document.getElementById(`v_${current_video}`).play();
            } else {
                document.getElementById(video).play();
            }

            view.change_styles(0);
        },
    
        pause : (video) => {
            if (video == undefined) {
                document.getElementById(`v_${current_video}`).pause();
            } else {
                document.getElementById(video).pause();
            }

            view.change_styles(1);
        },
    
        rewind_video : (time) => {
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
