import app from './app';

const PORT = 5001;

const handleListen = () => {
  console.log(`✅Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListen);
