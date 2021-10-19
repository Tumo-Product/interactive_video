window.parent.postMessage({
    application: "activity-manager",
    message: "init"
}, '*');

window.addEventListener("message", event => {
    if (event.data.application !== "activity-manager") {
        return;
    }

    console.log(event.data.message);
    console.log(event.data);

    switch(event.data.message) {
        case 'init-response':
            const { data } = event.data;
            let src = data.answers[0];
            document.getElementById("audioElem").src = src;
        break;
    }
});

window.parent.postMessage({
    application: 'activity-manager',
    message: 'set-iframe-height',
    data: { iframeHeight: 100 }
}, '*');