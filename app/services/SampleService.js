const Article = requiree("./models/SampleModel");

class ArticleService{
    static async getAllSamples(){
        try {
            const allArticles = await  Article.find();
            return allArticles;
        } catch (error) {
            console.log(`Could not fetch articles ${error}`)
        }
    }

    static async createSample(data){
        try {

            const newSample = {
                title: data.title,
                body: data.body,
                article_image: data.article_image
            }
           const response = await new Article(newArticle).save();
           return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getSamplebyId(articleId){
        try {
            const singleArticleResponse =  await Article.findById({_id: articleId});
            return singleArticleResponse;
        } catch (error) {
            console.log(`Article not found. ${error}`)
        }
    }

    static async updateSample(title, body, articleImage){
            try {
                const updateResponse =  await Article.updateOne(
                    {title, body, articleImage}, 
                    {$set: {date: new Date.now()}});

                    return updateResponse;
            } catch (error) {
                console.log(`Could not update Sample ${error}` );

        }
    }

    static async deleteSamle(sampleId){
        try {
            const deletedResponse = await Sample.findOneAndDelete(sampleId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete article ${error}`);
        }

    }
}

module.exports = new ArticleService()