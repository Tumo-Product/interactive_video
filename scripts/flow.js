let videos;
let tree = [];
let tree_keys = [];
let current_video = '0';
let addedVideos = [];

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onPageLoad = async () => {
    videos = await parser.dataFetch();

    for (let i = 0; i < videos.segments.length; i++) {
        tree[videos.segments[i].id] = {src : videos.segments[i].src, choices : videos.segments[i].choices};
        tree_keys[i] = videos.segments[i].id;
    }

    view.onStart();

    view.addVideo(current_video, tree[current_video].src);
    addVideos();
}

const addVideos = () => {
    let choices = tree[current_video].choices;
    addedVideos = [];

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

const next_video = (i) => {
    current_video = tree[current_video].choices[i].ref;
    
    if (tree[current_video] === undefined) {
        return;
    }

    view.next_video();
    addVideos();
    player.controls.play();
}

$(onPageLoad)