import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connted to DB');
const handleError = (error) => console.log(`❌ Connecion ${error}`);

db.on('error', handleError);
db.once('open', handleOpen);
