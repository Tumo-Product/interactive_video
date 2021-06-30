const view = {
    current_video: undefined,
    mouseMoving: false,
    hovering: false,

    onStart: () => {
        let timer;

        $(".control").hover(function() {
            $(".controls").css("opacity", 1);
            view.hovering = true;
        }).mouseleave(function() {
            view.hovering = false;
        });

        $('body').mousemove(function() {
            if (!view.hovering) {
                $(".controls").css("opacity", 1);
                clearTimeout(timer);

                timer = setTimeout(function(){
                    $(".controls").css("opacity", 0);
                }, 2000);
            } else {
                clearTimeout(timer);
            }
        });
    },
    addVideo: (id, src) => {
        let videoBlock = `
        <div id="${id}" class="video_block">
            <video id="v_${id}" class="video" muted="muted">
                <source src="${src}" type="video/mp4">
            </video>
        </div>`;

        $("body").prepend(videoBlock);

        view.current_video = document.getElementById(`v_${current_video}`);

        view.current_video.addEventListener("ended", view.show_question);
        view.current_video.addEventListener('timeupdate', view.update_controls);
    },
    addChoice: (i) => {
        let choice =
        `
        <div class="choices" onclick="next_video(${i})">
            <p></p>
        </div>
        `;
        $(".choices_block").append(choice);
    },
    update_choices : async (choices) => {
        let choiceCount = 0;

        $(".choices").each(function(index) {
            choiceCount++;
            $(this).children("p").text(choices[index].name);

            $(this).mousedown(function () {
                $(this).append(`<div class="click"></div>`);
            });
            $(this).mouseup(async function () {
                $(this).find(".click").remove();
            });
            $(this).mouseleave(function () {
                $(this).find(".click").remove();
            });
        });

        $(".choices").css("width", `${770 / choiceCount}px`);
        $(".choices").css("margin-right",  `${62 / choiceCount}px`);
        $(".choices").last().css("margin-right",  0);

        view.fitText("choices");
    },
    clear_choices: async () => {
        await timeout(1000);
        $(".choices").each (function() {
            $(this).remove();
        });
    },
    next_video: async () => {
        $("#back img").hide();
        
        view.hide_question();

        $(".video_block").each(function(index) {
            if ($(this).attr('id') != current_video) {
                $(this).remove();
            }
        });

        view.current_video = document.getElementById(`v_${current_video}`);
    },
    show_question : () => {
        $(".blackout").css("opacity", "0");
        $(".controls").hide();
        $(".choices_block").removeClass("hide");
        $(".choices_block").addClass("show");
    },
    hide_question: () => {
        $(".choices_block").removeClass("show");
        $(".choices_block").addClass("hide");
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
    },
    fitText: (name) => {
		$(`.${name} p`).each(function (i) {
			let size;
			let desiredHeight = 50;

			while ($(this).prop("scrollHeight") > desiredHeight || $(this).width() > $(this).parent().width()) {
				size = parseInt($(this).css("font-size"), 10);
				$(this).css("font-size", size - 1);
			}
		});
	},

    change_styles : (event) => {
        if (event == 0){
            $(".blackout").css("opacity", "0");
            $("#play").hide();
            $("#pause").show();
        }
        else{
            $(".blackout").css("opacity", "0.42");
            $("#play").show();
            $("#pause").hide();
        }

       
    }
}
