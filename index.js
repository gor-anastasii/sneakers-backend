const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001; 

app.use(cors());
app.use(bodyParser.json());


const readData = () => {
    const data = fs.readFileSync('data/items.json');
    return JSON.parse(data);
};


const writeData = (data) => {
    fs.writeFileSync('data/items.json', JSON.stringify(data, null, 2));
};


app.get('/items', (req, res) => {
    const items = readData();
    res.json(items);
});


app.put('/items/:id', (req, res) => {
    const items = readData();
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    
    if (index !== -1) {
        items[index] = { ...items[index], ...req.body };
        writeData(items);
        res.json(items[index]);
    } else {
        res.status(404).send('Item not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});