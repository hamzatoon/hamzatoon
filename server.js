const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/download', async (req, res) => {
    const imageUrl = req.query.url;
    const fileName = req.query.filename || 'thumbnail.jpg';

    try {
        const response = await axios({
            method: 'GET',
            url: imageUrl,
            responseType: 'stream'
        });

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'image/jpeg');

        response.data.pipe(res);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while downloading the image.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});