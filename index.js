const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Разрешить CORS (всё правильно)
app.use(cors());

// Поддержка JSON
app.use(bodyParser.json());

// Отдача статических файлов (включая index.html и CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Обработка формы (POST-запрос)
app.post('/submit', async (req, res) => {
  const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyjaVCDhutvsVTVFOR7_gUpdQl1fiJhIQJQreVMW0gIXk5W94JODI5N_2id8ZsD59l6/exec';

  try {
    const response = await axios.post(googleScriptURL, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при отправке данных' });
  }
});

// Корневой маршрут: отдаём index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
