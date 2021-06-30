const player = {
    controls : {
        play : () => {
            document.getElementById(`v_${current_video}`).play();
            view.change_styles(0);
            view.hide_question();
        },
    
        pause : () => {
            document.getElementById(`v_${current_video}`).pause();
            view.change_styles(1);
        },
    
        rewind_video : (time) => {
            let currentVideo = document.getElementById(`v_${current_video}`);

            if (currentVideo.currentTime == currentVideo.duration && time < 0)
            {
                view.hide_question();
                player.controls.play();
            }

            currentVideo.currentTime += time;
        }
    }
}
