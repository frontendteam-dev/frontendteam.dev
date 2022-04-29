const {
    metadata,
    site,
    content,
    contentWithMainImage,
    get, post, coverImageUrl, canonicalUrl
} = require("./publish.common")

let hashnodeToken = {Authorization: process.env.HASHNODE_TOKEN};

;(async ()=>{

    const data = {
        input: {
            title: metadata.title,
            contentMarkdown: content,
            tags: [],
            coverImageURL: coverImageUrl,
            isRepublished: {
                originalArticleURL:canonicalUrl}
            }
        
    };

    
    const postResponse = await post('https://api.hashnode.com',
        {
            query: 'mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }',
            variables: data,
        }, hashnodeToken)
    console.log("publications: ",postResponse)
})()
