const parser = {
    dataFetch: async () => {
        let  url	= new URL(document.location.href);
		let _uid    = url.searchParams.get("_uid");
        if (_uid === null) _uid = "first";
        
        return axios.get(config.query_url + _uid);
    }
}