const player = {
    controls : {
        play : () => {
            $(`#${current_video}`).children(0).get(0).play();
            $(`#${current_video}`).children(0).get(0).addEventListener("ended", player.controls.toggle_question);
            $('#play').css("z-index", "0");
        },
    
        pause : () => {
            $(`#${current_video}`).children(0).get(0).pause();
            $('#play').css("z-index", "2");

        },
    
        rewind_video : (time) => {
            if($(`#${current_video}`).children(0).get(0).currentTime == $(`#${current_video}`).children(0).get(0).duration && time < 0)
            {
                $('.choices_block').css("display", "none");
                player.controls.play();
            }
            $(`#${current_video}`).children(0).get(0).currentTime += time;

        },
    
        toggle_question : () => {
           $('.choices_block').css("display", "flex");
        }
    }
}
