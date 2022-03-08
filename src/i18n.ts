import { derived } from "svelte/store";
import config from "../config.js";
import { localeStore } from "../src/stores";
import translations from "./translation.json";
let lang = "fr";
const language_enabled = config.language_enabled;
const lang_nav = navigator.language.slice(0, 2);
if (language_enabled.includes(lang_nav)) lang = lang_nav;
localeStore.update(l=> lang)
const locales = Object.keys(translations);

function translate(locale, key, vars, plural) {
    // Let's throw some errors if we're trying to use keys/locales that don't exist.
    // We could improve this by using Typescript and/or fallback values.
    if (!key) throw new Error("no key provided to $t()");
    if (!locale) throw new Error(`no translation for key "${key}"`);

    // Grab the translation from the translations object.
    let text = translations[locale][key];

    // plural management
    if(typeof text ==="object"){
        if(plural){
            text = text["other"]
        } else {
            text = text["one"]
        }
    }

    if (!text) throw new Error(`no translation found for ${locale}.${key}`);

    // Replace any passed in variables in the translation string.
    Object.keys(vars).forEach((k) => {
        const regex = new RegExp(k, "g");
        text = text.replace(regex, vars[k]);
    });

    return text;
}

export const t = derived(
    localeStore,
    ($locale) =>
        (key, vars = {}, plural = false) =>
            translate($locale, key, vars, plural)
);
