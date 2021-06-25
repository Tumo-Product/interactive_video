const player = {
    controls : {
        play : () => {
            document.getElementById(`v_${current_video}`).play();
            $("#play").hide();
            $("#pause").show();
        },
    
        pause : () => {
            document.getElementById(`v_${current_video}`).pause();
            $("#play").show();
            $("#pause").hide();
        },
    
        rewind_video : (time) => {
            let currentVideo = document.getElementById(`v_${current_video}`);

            if (currentVideo.currentTime == currentVideo.duration && time < 0)
            {
                $('.choices_block').css("display", "none");
                player.controls.play();
            }

            currentVideo.currentTime += time;
        }
    }
}
