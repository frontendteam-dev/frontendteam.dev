require("dotenv").config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require("fs")
const yaml = require('js-yaml');

const kind = `blog`
//const kind = `pills`
const entry = `002 - web components - use tailwind with web components and vite`
const path = `./src/${kind}/${entry}/index.md`

const get = async (url, token) => await (await fetch(url, {
    method: "GET",
    headers: {Authorization: `Bearer ${token}`}
})).json();
const post = async (url, data, auth) => await (await fetch(url, {
    method: "POST",
    headers: {...auth,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"},
    body: JSON.stringify(data)
})).json();

const imageReplaceRegexp = /!\[(.*)\]\((.*)\)/gi
const content = fs.readFileSync(path, "utf8")
const parts = content.split("---")
const yamlPart = parts[1]
const postContent = parts[2]
const metadata = yaml.load(yamlPart)
console.log("yamlPart: ",metadata)
const site = "https://thefrontendteam.com"
const coverImageUrl = `${site}${metadata.permalink}${metadata.image}`
let finalContent = `

![${metadata.imageAlt}](${coverImageUrl})

${postContent}`;

module.exports = {
    metadata,
    site,
    content: postContent,
    contentWithMainImage: finalContent,
    get, post, coverImageUrl, canonicalUrl: site + metadata.permalink
}
