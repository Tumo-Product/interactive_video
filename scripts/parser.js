const parser = {
    dataFetch: async () => {
        return vids;
        let  url	= new URL(document.location.href);
		let _uid    = url.searchParams.get("_uid");
        
        return axios.get(config.query_url + _uid);
    }
}

const vids = {
    addAllVideos: true,
    segments: [
        {
            id      : "0",
            src     : "videos/Q1.mp4",
            choices : [
                {
                    name : "Answer 1",
                    ref  : "00",
                },
                {
                    name : "Answer 2",
                    ref  : "01",
                }
            ]
        },

        {
            id      : "00",
            src     : "videos/A1 + Q2.mp4",
            choices : [
                {
                    name : "Answer 1",
                    ref  : "000"
                },
                {
                    name : "Answer2",
                    ref  : "001"
                }
            ]
        },
        {
            id      : "01",
            src     : "videos/A2 + Q2.mp4",
            choices : [
                {
                    name : "Answer 1",
                    ref  : "000"
                },
                {
                    name : "Answer 2",
                    ref  : "001"
                }
            ]
        },

        {
            id      : "000",
            src     : "videos/Q2A1 + Q3.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "0000"
                },
                {
                    name : "option 02",
                    ref  : "0001"
                }
            ]
        },
        {
            id      : "001",
            src     : "videos/Q2A2 + Q3.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "0000"
                },
                {
                    name : "option 02",
                    ref  : "0001"
                }
            ]
        },

        {
            id      : "0000",
            src     : "videos/Q3A1 + Q4.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "00000"
                },
                {
                    name : "option 02",
                    ref  : "00001"
                }
            ]
        },
        {
            id      : "0001",
            src     : "videos/Q3A2 + Q4.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "00000"
                },
                {
                    name : "option 02",
                    ref  : "00001"
                }
            ]
        },

        {
            id      : "00000",
            src     : "videos/Q4A1 + Q5.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "000000"
                },
                {
                    name : "option 02",
                    ref  : "000001"
                }
            ]
        },
        {
            id      : "00001",
            src     : "videos/Q4A2 + Q5.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "000000"
                },
                {
                    name : "option 02",
                    ref  : "000001"
                }
            ]
        },

        {
            id      : "000000",
            src     : "videos/Q5A1 + Q6.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "0000000"
                },
                {
                    name : "option 02",
                    ref  : "0000001"
                }
            ]
        },
        {
            id      : "000001",
            src     : "videos/Q5A2 + Q6.mp4",
            choices : [
                {
                    name : "option 01",
                    ref  : "0000000"
                },
                {
                    name : "option 02",
                    ref  : "0000001"
                }
            ]
        },

        {
            id      : "0000000",
            src     : "videos/Q6A1 + VO.mp4",
            choices : []
        },
        {
            id      : "0000001",
            src     : "videos/Q6A2 + VO.mp4",
            choices : []
        },
    ]
}