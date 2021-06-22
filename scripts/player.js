const player = {
    videos: undefined,
    controls : {
        load : () => {
            for (let i = 0; i < player.videos.length; i++) {
                player.videos[i].removeAttribute("loop");
                player.videos[i].load();
                player.videos[i].pause();
                player.videos[i].addEventListener("timeupdate", player.controls.check_time);
            }
        },
    
        play : () => {
            player.videos[2].play();
        },
    
        pause : () => {
            player.videos[2].pause();
        },
    
        rewind_video : (time) => {
            player.videos[2].currentTime += time;
        },
    
        check_time : () => {
            // if (player.videos[2].currentTime > 1)
            // player.videos[2].pause();
        }
    }
    
}