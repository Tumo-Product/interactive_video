const player = {
    video: undefined,
    controls : {
        load : () => {
            player.video[2].removeAttribute("loop");
            player.video[2].load();
            player.video[2].pause();
            player.video[2].addEventListener("timeupdate", player.controls.check_time);
        },
    
        play : () => {
            player.video[2].play();
        },
    
        pause : () => {
            player.video[2].pause();
        },
    
        rewind_video : (time) => {
            player.video[2].currentTime += time;
        },
    
        check_time : () => {
            if (player.video[2].currentTime > 1)
            player.video[2].pause();
        }
    }
    
}