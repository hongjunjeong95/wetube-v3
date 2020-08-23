import app from './app';
import './db';
import './models/User';

const PORT = process.env.PORT || 5002;

const handleListen = () => {
  console.log(`✅ Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListen);
