import express from 'express'

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()
)
app.use(cors())

app.get('/',(req,res)=>{
    res.send ('hire loop is looping')
})

app.listen(port, ()=>{
    console.log(`Hire loop is running on port ${port}`);
})