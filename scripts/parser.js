// axios.defaults.baseURL = "https://blackboxbasic.herokuapp.com/";

const parser = {
    dataFetch: async (_uid) => {
        return vids;
        // return axios.get(config.query_url + _uid);
    }
}

const vids = {
    segments: [
        {
            id : "0",
            src : "https://cdn.videvo.net/videvo_files/video/free/2016-06/small_watermarked/160323_24_StackingChips5_1080p_preview.webm"
        },
        
        {
            id : "00",
            src : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm"
        },

        {
            id : "01",
            src : "https://cdn.videvo.net/videvo_files/video/free/2016-06/small_watermarked/160323_15_PokerTracking1_1080p_preview.webm"
        }
    ]
}