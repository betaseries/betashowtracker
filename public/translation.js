let lang = "fr";
const language_enabled = ["fr", "en"];
const lang_nav = navigator.language.slice(0, 2);
if (language_enabled.includes(lang_nav)) lang = lang_nav;

var tag = document.createElement("script");
tag.src = "/translation/translation_" + lang + ".js";
document
    .getElementsByTagName("head")
    [document.getElementsByTagName("head").length - 1].appendChild(tag);
