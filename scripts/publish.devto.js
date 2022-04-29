const {
    metadata,
    site,
    content,
    contentWithMainImage,
    get, post, coverImageUrl, canonicalUrl
} = require("./publish.common")

let devtoToken = {'api-key': process.env.DEVTO_TOKEN};

;(async ()=>{

    const data = {
        article: {
            title: metadata.title,
            published: false,
            body_markdown: content,
            canonical_url: canonicalUrl,
            main_image: coverImageUrl,
            tags: metadata.tags.filter(t => /^\w+$/.test(t)).slice(0,3),
            description: metadata.description
        }
    };

    
    const postResponse = await post('https://dev.to/api/articles',data, devtoToken)
    console.log("publications: ",postResponse)
})()
