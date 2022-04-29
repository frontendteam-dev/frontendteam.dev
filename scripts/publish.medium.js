const {
        metadata,
        content,
        contentWithMainImage,
        get, post, coverImageUrl, canonicalUrl
    } = require("./publish.common")

let mediumToken = {Authorization: "Bearer "+process.env.MEDIUM_TOKEN};

;(async ()=>{

    const postData = {
        title: metadata.title,
        contentFormat: "markdown",
        content: contentWithMainImage,
        tags: metadata.tags,
        canonicalUrl: canonicalUrl,
        publishStatus: "draft"
    }

    const meResponse = await get("https://api.medium.com/v1/me", mediumToken)
    const userId = meResponse.data.id
    console.log("userId: ",userId)
    
    const postResponse = await post(`https://api.medium.com/v1/users/${userId}/posts`, postData, mediumToken)
    console.log("publications: ",postResponse)
})()
