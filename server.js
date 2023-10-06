/*


const express = require('express')
const cors = require('cors')

const app = express()

var corOptions = {
    origin: 'https://localhost:3000'
}



app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const router = require('./routes/productRouter.js')
app.use('/api/products',router)



app.get('/',(req, res) => {
    res.json({message: 'hello from api'})

})


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


*/