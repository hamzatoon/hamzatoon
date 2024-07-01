const express = require('express');
const path = require('path');
const downloadHandler = require('./server');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', downloadHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
