import app from './app';
import db from './models';
import dbConfig from './config/db';

const port = process.env.PORT || 5001;

// Connect to DB
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`).then(() => {
    console.log('Successfully connect to MongoDB.');
})
.catch(err => {
    console.error('Connection error', err);
    process.exit();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});