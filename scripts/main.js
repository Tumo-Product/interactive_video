const video_player = {
    load_video : () =>{
        let video = document.getElementById("video");
        video.load();
        video.play();
    }
}

video_player.load_video();