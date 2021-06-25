const view = {
    current_video: undefined,

    addVideo: (id, src) => {
        let videoBlock = `
        <div id="${id}" class="video_block">
            <video id="v_${id}" class="video" muted="muted">
                <source src="${src}" type="video/mp4">
            </video>
        </div>`;

        $("body").prepend(videoBlock);

        view.current_video = document.getElementById(`v_${current_video}`);

        view.current_video.addEventListener("ended", view.toggle_question);
        view.current_video.addEventListener('timeupdate', view.update_controls);
    },
    addChoice: (i) => {
        let choice = `<div class="choices" onclick="next_video(${i})">Option 2 </div>`;
        $(".choices_block").append(choice);
    },
    update_choices : (choices) => {
        $(".choices").each(function(index) {
            $(this).text(choices[index].name);
        });
    },
    next_video: () => {
        $(".choices").each (function() {
            $(this).remove();
        });
        
        $('.choices_block').hide();

        $(".video_block").each(function(index) {
            if ($(this).attr('id') != current_video) {
                $(this).remove();
            }
        });

        view.current_video = document.getElementById(`v_${current_video}`);
    },
    toggle_question : () => {
        $('.choices_block').css("display", "flex");
    },
    update_controls: () => {
        let duration = view.current_video.duration;
        let currentTime = view.current_video.currentTime;

        if (currentTime > 5) {
            $("#back img").show();
        }
        else if (currentTime < 5) {
            $("#back img").hide();
        }

        if (currentTime < duration - 5) {
            $("#front img").show();
        }
        else if (currentTime > duration - 5) {
            $("#front img").hide();
        }
    }
}
