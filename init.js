import app from './app';
import './db';

const PORT = process.env.PORT || 5001;

const handleListen = () => {
  console.log(`✅Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListen);
