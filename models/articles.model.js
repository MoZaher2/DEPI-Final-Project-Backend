const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  meta_description: { type: String, required: true },
  key_words: { type: String, required: true },
  article_body: { type: String, required: true },
  article_image: { type: String, required: true },
  finished: { type: Boolean, default: true },
  article_url: { type: String, required: true ,unique:true},
  tags:{ type: [], default: []},
  category_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
},{timestamps:true});



const Article = mongoose.model('Articles', articleSchema);

module.exports = Article;