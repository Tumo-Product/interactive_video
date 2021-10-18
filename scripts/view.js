const view = {
    current_video   : undefined,
    loopVideo       : undefined,
    mouseMoving     : false,
    loaderOpen      : true,
    hovering        : false,

    onStart: () => {
        let timer;

        view.current_video  = document.getElementById(`v_0`);
        view.loopVideo      = document.getElementById(`v_l_0`);

        $(".control").mouseenter(function() {
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
    toggleLoader: () => {
        view.loaderOpen = !view.loaderOpen;

        if (view.loaderOpen)    $("#loadingScreen").show();
        else                    $("#loadingScreen").hide();
    },
    addVideo: (id, src) => {
        let videoBlock = `
        <div id="${id}" class="video_block">
            <video id="v_${id}" class="video">
                <source src="${src}" type="video/mp4">
            </video>
        </div>`;

        $("body").prepend(videoBlock);

        if (id.charAt(0) != "l") {
            document.getElementById(`v_${id}`).addEventListener('timeupdate', view.update);
        } else {
            document.getElementById(`v_${id}`).addEventListener('timeupdate', function() {
                view.loop(`v_${id}`);
            });
        }
    },
    loop: (id) => {
        if (view.loopVideo === null) return;
        let duration        = view.loopVideo.duration;
        let currentTime     = view.loopVideo.currentTime;

        if (currentTime >= duration) {
            player.controls.play(id);
        }
    },
    update: () => {
        if (view.current_video.duration === undefined || view.current_video.duration === null) return;
        let duration        = view.current_video.duration;
        let currentTime     = view.current_video.currentTime;
        
        if (currentTime >= duration - 1) {
            $(`#v_${current_video}`).css("filter", "blur(5px)");
            if (!playback) {
                view.show_question();
            } else {
                next_video(choices[choiceIndex]);
            }
        }

        if (!playback) {
            if (currentTime > 10) {
                $("#back img").show();
            }
            else if (currentTime < 10) {
                $("#back img").hide();
            }
            if (currentTime < duration - 10) {
                $("#front img").show();
            }
            else if (currentTime > duration - 10) {
                $("#front img").hide();
            }
        } else {
            $("#back img").show();
            $("#front img").show();
        }
    },
    changeChoiceStyle : async (sticky) => {
        if (sticky) {
            $("#choices").css("transition", "0s");

            $("#choices").removeClass   ("choices_block show hide");
            $("#choices").addClass      ("stickyChoices stickyHide");
            await timeout(15);

            $("#choices").css("transition", "1s");
        } else {
            $("#choices").css("transition", "0s");

            $("#choices").removeClass   ("stickyChoices stickyShow stickyHide");
            $("#choices").addClass      ("choices_block hide");
            await timeout(15);

            $("#choices").css("transition", "1s");
        }
    },
    addChoice: (i, pos) => {
        let choice =
        `
        <div class="choices" onclick="next_video(${i})">
            <p></p>
        </div>
        `;
        
        $("#choices").append(choice);

        if (pos !== undefined) {
            $(".choices").eq(i).css("left", pos.x);
            $(".choices").eq(i).css("top", pos.y);
        }
    },
    update_choices : async (choices) => {
        if (!stickyChoices) {
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

            $(".choices").css("width",          `${770 / choiceCount}px`);
            $(".choices").css("margin-right",   `${62  / choiceCount}px`);
            $(".choices").last().css("margin-right",  0);
        }

        view.fitText("choices");
    },
    clear_choices: async () => {
        await timeout(1000);

        $(".choices").each (function() {
            $(this).remove();
        });
    },
    next_video: async (remove) => {
        $("#back img").hide();
        
        view.hide_question();

        if (remove == undefined) {
            $(".video_block").each(function(index) {
                if ($(this).attr('id') != current_video) {
                    $(this).remove();
                }
            });
        } else {
            $(`#l_${remove[0]}`).remove();

            for (let i = 1; i < remove.length; i++) {
                $(`#l_${remove[i]}`).remove();
                $(  `#${remove[i]}`).remove();
            }
        }

        view.current_video  = document.getElementById(`v_${current_video}`);
        view.loopVideo      = document.getElementById(`v_l_${current_video}`);
    },
    show_question : () => {
        $(".controls").hide();
        $(".blackout").css("opacity", "0");
        $("#choices").removeClass(stickyChoices ? "stickyHide" : "hide");
        $("#choices").addClass(   stickyChoices ? "stickyShow" : "show");
    },
    hide_question: () => {
        $(".controls").show();
        $(".blackout").css("opacity", "0.4");
        $("#choices").removeClass(stickyChoices ? "stickyShow" : "show");
        $("#choices").addClass(   stickyChoices ? "stickyHide" : "hide");
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
