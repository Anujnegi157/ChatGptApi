const express = require('express');
const fetch = require('node-fetch'); 
const app = express();
require('dotenv').config();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/api', async (req, res) => {
    const url = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': `${process.env.API_KEY}`,
            'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com'
        },
        body: JSON.stringify({ query: req.body.query }) 
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        res.send(result); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); 
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
