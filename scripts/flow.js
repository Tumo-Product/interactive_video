let videos;
let tree            = [];
let tree_keys       = [];
let current_video   = '0';
let stickyChoices   = false;

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onPageLoad = async () => {
    videos = await parser.dataFetch();
    // videos = videos.data.data;

    for (let i = 0; i < videos.segments.length; i++) {
        tree[videos.segments[i].id] = { id: videos.segments[i].id, src : videos.segments[i].src, choices : videos.segments[i].choices, loopSrc: videos.segments[i].loopSrc };
        tree_keys[i] = videos.segments[i].id;
    }

    if (!videos.addAllVideos) {
        view.addVideo(current_video, tree[current_video].src);
    }

    await addVideos();
    await timeout(2000);

    view.onStart();
    view.toggleLoader();
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
    let old_video = current_video;
    current_video = tree[current_video].choices[index].ref;
    $(".controls").css("display", "flex");
    
    if (tree[current_video] === undefined) {
        return;
    }

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