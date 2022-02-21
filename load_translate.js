import fs from "fs";
import fetch from "node-fetch";

const language_enabled = ["fr", "en"];
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
            .then((resp) => resolve({ [lang]: JSON.parse(resp) }));
    });
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
