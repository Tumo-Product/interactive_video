// axios.defaults.baseURL = "https://blackboxbasic.herokuapp.com/";

const parser = {
    dataFetch: async () => {
        return vids;
        // return axios.get(config.query_url + _uid);
    }
}

const vids = {
    segments: [
        {
            id : "0",
            src : "https://cdn.videvo.net/videvo_files/video/free/2016-06/small_watermarked/160323_24_StackingChips5_1080p_preview.webm",
            choices : [
                {
                    name : "Option 1",
                    ref  : "01"
                },
                {
                    name : "Option 2",
                    ref  : "01"
                }
            ]
        },
        {
            id : "00",
            src : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm",
            choices : [
                {
                    name : "option 01",
                    ref  : "000"
                },
                {
                    name : "option 02",
                    ref  : "001"
                }
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
            id : "010",
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
            id : "011",
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
        }
    ]
}