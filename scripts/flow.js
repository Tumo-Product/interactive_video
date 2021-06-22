let videos;
let tree = [];
let treeKeys = [];

const onPageLoad = async () => {
    videos = await parser.dataFetch();

    for (let i = 0; i < videos.segments.length; i++) {
        tree[videos.segments[i].id] = videos.segments[i].src;
        treeKeys[i] = videos.segments[i].id;
    }

    console.log(tree);
    addVideos();
}

const addVideos = async () => {
    for (let i = 0; i < treeKeys.length; i++) {
        view.addVideo(treeKeys[i], tree[treeKeys[i]]);

    }
}

$(onPageLoad)