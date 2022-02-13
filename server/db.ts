import db from './models';
import dbConfig from './config/db';
import roleLoader from './helpers/roleLoader';

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`).then(() => {
    console.log('Successfully connect to MongoDB.');
    roleLoader();
})
.catch(err => {
    console.error('Connection error', err);
    process.exit();
});

export default db;

