const player = {
    controls : {
        play : (id) => {
            $(`#${id}`).children(0).get(0).play();
            $(`#${id}`).children(0).get(0).addEventListener("ended", player.controls.toggle_question);
        },
    
        pause : (id) => {
            $(`#${id}`).children(0).get(0).pause();
        },
    
        rewind_video : (time, id) => {
            $(`#${id}`).children(0).get(0).currentTime += time;
        },
    
        toggle_question : () => {
           $('.choices_block').css("display", "flex");
        }
    }
}
