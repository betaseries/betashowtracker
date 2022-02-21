function callNetflixGuidAccount() {
    return new Promise((resolve) => {
        apiFetch("/sync/netflix").then((resp) => {
            resolve(resp);
        });
    });
}

function callLastActivityNetflix(guid) {
    return new Promise(async (resolve) => {
        let endCall = false;
        let currentPage = 0;
        const version = await callVersionSyncNetflix();
        do {
            const dataApi = await callNetflixAPIActivity(
                guid,
                version,
                currentPage
            );
            callNetflixActivity(dataApi);
            endCall = dataApi.viewedItems.length < 20 || currentPage >= 10;
            if (endCall) {
                resolve(true);
            }
            currentPage++;
        } while (!endCall);
    });
}

function callVersionSyncNetflix() {
    return new Promise((resolve) => {
        apiFetch("/sync/netflix_version").then((response_version) => {
            const { version } = response_version;
            resolve(version);
        });
    });
}

function callNetflixAPIActivity(guid, version, page = 0) {
    return new Promise((resolve) => {
        fetch(
            `https://www.netflix.com/api/shakti/${version}/viewingactivity?pg=${page}&pgSize=20&guid=${guid}`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((resp) => {
                resolve(resp);
            });
    });
}

function callNetflixActivity(jsonNetflix) {
    return new Promise((resolve) => {
        let formData = new FormData();
        formData.append("json", JSON.stringify(jsonNetflix));
        apiFetchPost("/sync/netflix_activity", formData).then((resp) => {
            resolve(resp);
        });
    });
}

function netflixRefresh() {
    return new Promise((resolve) => {
        callNetflixGuidAccount().then((dataSyncNetflix) => {
            if (dataSyncNetflix?.guid?.length > 0) {
                callLastActivityNetflix(dataSyncNetflix.guid).then((_) =>
                    resolve(true)
                );
            } else {
                resolve(true);
            }
        });
    });
}
