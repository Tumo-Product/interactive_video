let videos;
let tree = [];
let tree_keys = [];
let current_video = '0';

const onPageLoad = async () => {
    videos = await parser.dataFetch();

    for (let i = 0; i < videos.segments.length; i++) {
        tree[videos.segments[i].id] = {src : videos.segments[i].src, choices : videos.segments[i].choices};
        tree_keys[i] = videos.segments[i].id;
    }

    view.addVideo(current_video, tree[current_video].src);
    view.update_choices(tree[current_video].choices);
    addVideos();

    player.controls.play(current_video);
}

const addVideos = () => {
    let choices = tree[current_video].choices;

    for (let i = 0; i < choices.length; i++) {
        view.addVideo(choices[i].ref, tree[choices[i].ref].src);
    }
}

const next_video = (i) => {
    current_video = tree[current_video].choices[i].ref;
    
    if (tree[current_video] === undefined) {
        return;
    }

    view.next_video(current_video);
    addVideos();
    player.controls.play(current_video);
}

$(onPageLoad)