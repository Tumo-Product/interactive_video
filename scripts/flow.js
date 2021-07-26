let videos;
let tree = [];
let tree_keys = [];
let addedVideos = [];
let current_video = '0';

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onPageLoad = async () => {
    videos = await parser.dataFetch();
    videos = videos.data.data;

    for (let i = 0; i < videos.segments.length; i++) {
        tree[videos.segments[i].id] = { src : videos.segments[i].src, choices : videos.segments[i].choices, loopSrc: videos.segments[i].loopSrc };
        tree_keys[i] = videos.segments[i].id;
    }

    view.onStart();

    view.addVideo(current_video, tree[current_video].src);
    addVideos();
}

const addVideos = async () => {
    let choices = tree[current_video].choices;
    addedVideos = [];
    
    await view.clear_choices();

    view.addVideo(`l_${current_video}`, tree[current_video].loopSrc)

    for (let i = 0; i < choices.length; i++) {
        if (addedVideos.includes(choices[i].ref)) {
            continue;
        }
        
        view.addVideo(choices[i].ref, tree[choices[i].ref].src);
        addedVideos[i] = choices[i].ref;
    }

    for (let i = 0; i < choices.length; i++) {
        view.addChoice(i);
    }

    view.update_choices(tree[current_video].choices);
}

const next_video = async (i) => {
    current_video = tree[current_video].choices[i].ref;
    $(".controls").css("display", "flex");
    
    if (tree[current_video] === undefined) {
        return;
    }

    view.next_video();
    addVideos();
    player.controls.play();
}

$(onPageLoad)