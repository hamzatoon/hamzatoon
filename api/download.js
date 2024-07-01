const express = require('express');
const axios = require('axios');

const app = express();

module.exports = async (req, res) => {
    const imageUrl = req.query.url;
    const fileName = req.query.filename || 'thumbnail.jpg';

    try {
        const response = await axios({
            method: 'GET',
            url: imageUrl,
            responseType: 'arraybuffer'
        });

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(Buffer.from(response.data, 'binary'));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while downloading the image.');
    }
};