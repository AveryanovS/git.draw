const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/config.json', (_req, res) => {
    res.sendFile(`${__dirname}/config.json`);
});

app.post('/', (req, res) => {
    fs.writeFile('config.json', JSON.stringify(req.body, null, 4), err => {
        if(err)
            return res.status(500).send();
        res.send({});
    });
});

app.listen(8080, () => {
    console.log('http://localhost:8080');
});
