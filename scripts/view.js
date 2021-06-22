const view = {
    addVideo: (id, src) => {
        let videoBlock = `
        <div id="${id}" class="video_block">
            <video class="video" muted="muted">
                <source src="${src}" type="video/mp4">
            </video>
        </div>`;

        $("body").prepend(videoBlock);
    }
}