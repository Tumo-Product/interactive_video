const parser = {
    dataFetch: async () => {
        return axios.get(config.query_url + _uid);
    }
}

const vids = {
    segments: [
        {
            id : "0",
            src : "http://techslides.com/demos/sample-videos/small.mp4",
            choices : [
                {
                    name : "KapuytKapuytKapuytKapuytKapuytKapuyt Kapuyt Kapuyt Kapuyt Kapuyt Kapuyt KapuytKapuytKapuyt",
                    ref  : "00"
                },
                {
                    name : "Karmir",
                    ref  : "01"
                }
            ]
        },
        {
            id : "00",
            src : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm",
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
            id : "01",
            src : "https://cdn.videvo.net/videvo_files/video/free/2016-06/small_watermarked/160323_15_PokerTracking1_1080p_preview.webm",
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
            id : "000",
            src : "https://cdn.videvo.net/videvo_files/video/free/2016-06/small_watermarked/160323_15_PokerTracking1_1080p_preview.webm",
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
            id : "010",
            src : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm",
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