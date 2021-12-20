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
                    name : "Bien sûr",
                    ref  : "00",
                },
                {
                    name : "Non",
                    ref  : "01",
                }
            ]
        },

        {
            id      : "00",
            src     : "videos/A1 + Q2.mp4",
            choices : [
                {
                    name : "Les spagetti bolognaises",
                    ref  : "000"
                },
                {
                    name : "La pomme",
                    ref  : "001"
                }
            ]
        },
        {
            id      : "01",
            src     : "videos/A2 + Q2.mp4",
            choices : [
                {
                    name : "Les spagetti bolognaises",
                    ref  : "000"
                },
                {
                    name : "La pomme",
                    ref  : "001"
                }
            ]
        },

        {
            id      : "000",
            src     : "videos/Q2A1 + Q3.mp4",
            choices : [
                {
                    name : "Échangeons nos vêtements",
                    ref  : "0000"
                },
                {
                    name : "Achète de nouveaux habits",
                    ref  : "0001"
                }
            ]
        },
        {
            id      : "001",
            src     : "videos/Q2A2 + Q3.mp4",
            choices : [
                {
                    name : "Échangeons-nous",
                    ref  : "0000"
                },
                {
                    name : "Achète de nouveaux habits",
                    ref  : "0001"
                }
            ]
        },

        {
            id      : "0000",
            src     : "videos/Q3A1 + Q4.mp4",
            choices : [
                {
                    name : "Une bouteille en plastique ",
                    ref  : "00000"
                },
                {
                    name : "Une bouteille en acier inoxydable",
                    ref  : "00001"
                }
            ]
        },
        {
            id      : "0001",
            src     : "videos/Q3A2 + Q4.mp4",
            choices : [
                {
                    name : "Une bouteille en plastique",
                    ref  : "00000"
                },
                {
                    name : "Une bouteille en acier inoxydable",
                    ref  : "00001"
                }
            ]
        },

        {
            id      : "00000",
            src     : "videos/Q4A1 + Q5.mp4",
            choices : [
                {
                    name : "Publie sur Instagram",
                    ref  : "000000"
                },
                {
                    name : "Regarde ton environnement",
                    ref  : "000001"
                }
            ]
        },
        {
            id      : "00001",
            src     : "videos/Q4A2 + Q5.mp4",
            choices : [
                {
                    name : "Publie sur Instagram",
                    ref  : "000000"
                },
                {
                    name : "Regarde ton environnement",
                    ref  : "000001"
                }
            ]
        },

        {
            id      : "000000",
            src     : "videos/Q5A1 + Q6.mp4",
            choices : [
                {
                    name : "Utilise le ventilateur",
                    ref  : "0000000"
                },
                {
                    name : "Ignore la chaleur",
                    ref  : "0000001"
                }
            ]
        },
        {
            id      : "000001",
            src     : "videos/Q5A2 + Q6.mp4",
            choices : [
                {
                    name : "Utilise le ventilateur",
                    ref  : "0000000"
                },
                {
                    name : "Ignore la chaleur ",
                    ref  : "0000001"
                }
            ]
        },

        {
            id      : "0000000",
            src     : "videos/Q6A1 + VO.mp4",
            choices : [
                {
                    name : "Regarde tes choix",
                },
                {
                    name : "Enregistre ta réponse",
                }
            ]
        },
        {
            id      : "0000001",
            src     : "videos/Q6A2 + VO.mp4",
            choices : [
                {
                    name : "Regarde tes choix",
                },
                {
                    name : "Enregistre ta réponse",
                }
            ]
        },
        {
            id      : "finalVideo",
            src     : "videos/Final Loop.mp4",
        },
        {
            id      : "thankYou",
            src     : "videos/Thank You.mp4",
        }
    ]
}