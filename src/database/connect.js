import mongoose from 'mongoose'

// Database connection
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

mongoose.connect(uri, {
    useNewUrlParser: true
})

mongoose.set('useCreateIndex', true)

const db = mongoose.connection

db.once('open', () => {
    console.log('Connected to database')
})
