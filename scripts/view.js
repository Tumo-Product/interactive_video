const view = {
    addVideo: (id, src) => {
        let videoBlock = `
        <div id="${id}" class="video_block">
            <video class="video" muted="muted">
                <source src="${src}" type="video/mp4">
            </video>
        </div>`;

        $("body").prepend(videoBlock);
    },

    update_choices : (choices) => {
        $(".choices").each(function(index) {
            $(this).text(choices[index].name);
        })
    },

    next_video: (new_index) => {
        $('.choices_block').hide();
        view.update_choices(tree[new_index].choices);

        $(".video_block").each(function(index) {
            if ($(this).attr('id') != current_video) {
                $(this).remove();
            }
        })
    }
}
