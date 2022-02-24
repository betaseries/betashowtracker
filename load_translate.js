import fs from "fs";
import fetch from "node-fetch";

const language_enabled = ["fr", "en"];
const refreshTranslationConnectionPageJS = (lang) => {
    return new Promise((resolve) => {
        console.log("Fetching translation connection page " + lang);
        fetch(
            "https://localise.biz/api/export/locale/" +
                lang +
                ".js?fallback=fr&no-folding=true&filter=connection_page&key=c3gvhId51iCmrnTJW56QqlrWgQEdkVGr",
            {
                method: "GET",
            }
        )
            .then((res) => res.text())
            .then((resp) => {
                console.log(
                    "Fetching translation connection page " + lang + ": Done"
                );
                if (!fs.existsSync("./public/translation")) {
                    fs.mkdirSync("./public/translation", { recursive: true });
                }
                fs.writeFileSync(
                    "./public/translation/translation_" + lang + ".js",
                    resp
                );
            });
    });
};
const refreshTranslation = (lang) => {
    return new Promise((resolve) => {
        console.log("Fetching translation " + lang);
        fetch(
            "https://localise.biz/api/export/locale/" +
                lang +
                ".json?fallback=fr&no-folding=true&key=c3gvhId51iCmrnTJW56QqlrWgQEdkVGr",
            {
                method: "GET",
            }
        )
            .then((res) => res.text())
            .then((resp) => {
                console.log("Fetching translation " + lang + ": Done");
                return resolve({ [lang]: JSON.parse(resp) });
            });
    });
};
const init_translation_connection_page = () => {
    language_enabled.forEach((item) =>
        refreshTranslationConnectionPageJS(item)
    );
};
const init_translation = () => {
    const data = language_enabled.map((item) => refreshTranslation(item));
    Promise.all(data).then((rep) => {
        const dataJson = rep.reduce(
            (prev, current) => Object.assign(current, prev),
            {}
        );
        if (!fs.existsSync("./src")) {
            fs.mkdirSync("./src", { recursive: true });
        }
        fs.writeFileSync("./src/translation.json", JSON.stringify(dataJson));
    });
};
init_translation();
init_translation_connection_page();
