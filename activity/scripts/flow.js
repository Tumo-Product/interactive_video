let tree            = [];
let videos;
let tree_keys       = [];
let current_video   = '0';
let stickyChoices   = false;
let choices         = [];
let choiceIndex     = 0;
let playback        = false;

window.parent.postMessage({
    application: 'activity-manager',
    message: 'set-iframe-height',
    data: { iframeHeight: 500 }
}, '*');

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onPageLoad = async (loaded) => {
    document.getElementById("music").volume = 0.05;
    videos = await parser.dataFetch();
    videos = videos.data.data;

    $("#music").attr("src", videos.music);

    for (let i = 0; i < videos.segments.length; i++) {
        tree[videos.segments[i].id] = { id: videos.segments[i].id, src : videos.segments[i].src, choices : videos.segments[i].choices, loopSrc: videos.segments[i].loopSrc };
        tree_keys[i] = videos.segments[i].id;
    }

    if (!videos.addAllVideos) {
        view.addVideo(current_video, tree[current_video].src);
    }

    await addVideos();
    $(`#loopVideo`).attr("loop", "loop");
    loadVideos();

    view.onStart();
}

const loadVideos = () => {
    let videoElements = $("video");
    let videosLoaded = 0;
    
    videoElements.each(function(i) {
        let video = $(this).get(0);
        video.load();
        
        video.addEventListener('loadeddata', async (e) => {
            if(video.readyState >= 3) {
                video.removeEventListener("loadeddata", (e) => {}, true);
                videosLoaded++;
                console.log("loaded");
                if (videosLoaded == videoElements.length) {
                    await timeout(2000);
                    $("#loadingScreen").hide()
                }
            }
         });
    });
}

const addChoices = async () => {
    let choices = tree[current_video].choices;

    for (let i = 0; i < choices.length; i++) {
        if (choices[i].pos !== undefined || stickyChoices) {
            stickyChoices = true;
            view.addChoice(i, choices[i].pos);
        } else {
            view.addChoice(i);
        }
    }
    
    if (stickyChoices) {
        view.changeChoiceStyle(stickyChoices);
    }
}

const resetStyles = async () => {
    await view.clear_choices();
    stickyChoices = false;
    await view.changeChoiceStyle(stickyChoices);
}

const addVideos = async () => {
    let addedVideos     = [];
    let choices         = tree[current_video].choices;
    
    if (videos.addAllVideos) {
        for (branch in tree) {
            view.addVideo(tree[branch].id, tree[branch].src);
            if (tree[branch].loopSrc === undefined) continue;
            view.addVideo(`l_${tree[branch].id}`, tree[branch].loopSrc);
        }
    } else {
        view.addVideo(`l_${current_video}`, tree[current_video].loopSrc);

        for (let i = 0; i < choices.length; i++) {
            if (addedVideos.includes(choices[i].ref)) {
                continue;
            }
            
            view.addVideo(choices[i].ref, tree[choices[i].ref].src);
            addedVideos[i] = choices[i].ref;
        }
    }

    await resetStyles();
    addChoices();

    await view.update_choices(tree[current_video].choices);
}

const next_video = async (index) => {
    $(`#${current_video}`).css("opacity", 0);
    setTimeout(() => {
        $(`#v_${old_video}`).css("filter", "blur(0px)");
    }, 1000);

    if (!playback) {
        choices.push(index);
    } else {
        choiceIndex++;
    }
    
    let old_video = current_video;
    if (tree[current_video].choices[index].ref === undefined)  {
        $(".controls").hide();
        if (index === 0) {
            playback = true;
            current_video = "0";
            view.current_video  = document.getElementById(`v_${current_video}`);
            $(".video_block").css("opacity", 1);
            view.hide_question();
            player.controls.play();
            choices[choices.length - 1] = 1;
        } else {
            $(".controls").hide();
            $(".recorder").css({"opacity": 1, "pointer-events": "all"});
            $("#background").css("opacity", 1);
            document.getElementById("music").pause();
        }
        return;
    }
    current_video = tree[current_video].choices[index].ref;
    $(".controls").css("display", "flex");
    $("#front img").show();

    if (!videos.addAllVideos) {
        view.next_video();
        addVideos();

        view.current_video  = document.getElementById(`v_${current_video}`);
        view.loopVideo      = document.getElementById(`v_l_${current_video}`);
        player.controls.play();
    } else {
        let remove = [];
        remove.push(old_video);

        for (let i = 0; i < tree[old_video].choices.length; i++) {
            if (i != index) remove.push(tree[old_video].choices[i].ref);
        }

        view.next_video(remove);

        view.current_video  = document.getElementById(`v_${current_video}`);
        view.loopVideo      = document.getElementById(`v_l_${current_video}`);
        player.controls.play();
        await resetStyles();
        addChoices();
        await view.update_choices(tree[current_video].choices);
    }    
}

$(onPageLoad)