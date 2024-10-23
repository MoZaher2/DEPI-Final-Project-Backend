const express=require('express')
const mongoose=require('mongoose')
const port=8000
const app=express()
const cors=require('cors')
app.use('/uploads', express.static('uploads'));

const usersRouter=require('./routes/users.route')
const categoriesRouter=require('./routes/categories.route')
const articlesRouter=require('./routes/articles.route')
const governoratesRouter=require('./routes/governorates.route')
const citiesRouter=require('./routes/cities.route')
const regionsRouter=require('./routes/regions.route')
const streetsRouter=require('./routes/streets.route')
const mallsRouter=require('./routes/malls.route')
const compoundsRouter=require('./routes/compounds.route')
const propertiesRouter=require('./routes/properties.route')
const adsRouter=require('./routes/ads.route')
const commentsRouter=require('./routes/comments.route')

app.use(cors())
app.use(express.json())

app.use("/api/users",usersRouter)
app.use("/api/categories",categoriesRouter)
app.use("/api/articles",articlesRouter)
// 
app.use("/api/governorates",governoratesRouter)
app.use("/api/cities",citiesRouter)
app.use("/api/regions",regionsRouter)
app.use("/api/streets",streetsRouter)
app.use("/api/compounds",compoundsRouter)
app.use("/api/malls",mallsRouter)
// 
app.use("/api/properties",propertiesRouter)
app.use("/api/ads",adsRouter)
app.use("/api/comments",commentsRouter)



// Route to return the image
app.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`${__dirname}/uploads/${imageName}`);
});







app.all("*",(req,res)=>{
  res.status(404).send({status:"Error",message:"this URL:"+req.url+" or Method "+req.method+" not exist"})
})
// =====>Connect DB<===== //
require("dotenv").config()
mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 5000 }).then(()=>{
  console.log("DB connected successfully")
}).catch((err)=>{console.log("error::==>"+err)});

//start the server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

