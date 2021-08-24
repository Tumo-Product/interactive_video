const parser = {
    dataFetch: async () => {
        return vids;
        let  url	= new URL(document.location.href);
		let _uid    = url.searchParams.get("_uid");
        
        return axios.get(config.query_url + _uid);
    }
}

const vids = {
    segments: [
        {
            id      : "0",
            src     : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            loopSrc : "http://techslides.com/demos/sample-videos/small.mp4",
            choices : [
                {
                    name : "KapuytKapuytKapuytKapuytKapuytKapuyt Kapuyt Kapuyt Kapuyt Kapuyt Kapuyt KapuytKapuytKapuyt",
                    pos  : {
                        x: 100, y: 100
                    },
                    ref  : "00"
                },
                {
                    name : "Karmir",
                    pos  : {
                        x: 300, y: 300
                    },
                    ref  : "01"
                }
            ]
        },
        {
            id      : "00",
            src     : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm",
            loopSrc : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            choices : [
                {
                    name : "optionoptionoption option optionoptionoption option 01",
                    ref  : "000"
                },
                {
                    name : "option 02",
                    ref  : "000"
                },
                {
                    name : "option 03",
                    ref  : "000"
                },
                {
                    name : "option 04",
                    ref  : "000"
                },
            ]
        },
        {
            id      : "01",
            src     : "https://cdn.videvo.net/videvo_files/video/free/2016-06/small_watermarked/160323_15_PokerTracking1_1080p_preview.webm",
            loopSrc : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "010"
                },
                {
                    name : "option 02",
                    ref  : "011"
                }
            ]
        },
        {
            id      : "000",
            src     : "https://cdn.videvo.net/videvo_files/video/free/2016-06/small_watermarked/160323_15_PokerTracking1_1080p_preview.webm",
            loopSrc : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "010"
                },
                {
                    name : "option 02",
                    ref  : "010"
                }
            ]
        },
        {
            id      : "010",
            src     : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm",
            loopSrc : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "010"
                },
                {
                    name : "option 02",
                    ref  : "011"
                }
            ]
        },
    ]
}