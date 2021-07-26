let videos;
let tree = [];
let tree_keys = [];
let current_video = '0';
let addAllVideos = true;

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onPageLoad = async () => {
    videos = await parser.dataFetch();
    videos = videos.data.data;

    for (let i = 0; i < videos.segments.length; i++) {
        tree[videos.segments[i].id] = { id: videos.segments[i].id, src : videos.segments[i].src, choices : videos.segments[i].choices, loopSrc: videos.segments[i].loopSrc };
        tree_keys[i] = videos.segments[i].id;
    }

    view.onStart();

    if (!addAllVideos) {
        view.addVideo(current_video, tree[current_video].src);
    }
    addVideos();
}

const addVideos = async () => {
    let choices     = tree[current_video].choices;
    let addedVideos = [];
    
    await view.clear_choices();

    if (addAllVideos) {
        for (branch in tree) {
            view.addVideo(tree[branch].id, tree[branch].src);
            view.addVideo(`l_${tree[branch].id}`, tree[branch].loopSrc);
        }
    } else 
    {
        view.addVideo(`l_${current_video}`, tree[current_video].loopSrc)

        for (let i = 0; i < choices.length; i++) {
            if (addedVideos.includes(choices[i].ref)) {
                continue;
            }
            
            view.addVideo(choices[i].ref, tree[choices[i].ref].src);
            addedVideos[i] = choices[i].ref;
        }
    }

    for (let i = 0; i < choices.length; i++) {
        view.addChoice(i);
    }

    view.update_choices(tree[current_video].choices);
}

const next_video = async (i) => {
    let old_video = current_video;
    current_video = tree[current_video].choices[i].ref;
    $(".controls").css("display", "flex");
    
    if (tree[current_video] === undefined) {
        return;
    }

    view.next_video(old_video);
    if (!addAllVideos) addVideos();
    player.controls.play();
}

$(onPageLoad)