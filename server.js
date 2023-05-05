const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/api', async (req, res) => {
    try {
        const categories = fs.readdirSync(path.resolve(__dirname, 'public', 'sounds'));
        const categoryParam = req.query.category;
        const categoryList = categoryParam ? categoryParam.split(',') : categories;
        const data = {};

        for (const category of categoryList) {
            if (!categories.includes(category)) {
                res.send(categories);
                return;
            }

            const sounds = fs.readdirSync(path.join('public', 'sounds', category))
                .map(sound => ({
                    path: path.join('/public', 'sounds', category, sound),
                    file: sound,
                    name: sound.replace(/\.mp3/gi, '').replace(/[-_\s]+/g, ' ').trim().toUpperCase()
                }));

            data[category] = sounds;
        }

        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

app.get('/page/:category', async (req, res) => {
    try {
        const responses = await Promise.all([
            fetch('http://localhost:3000/api'),
            fetch('http://localhost:3000/api?category=all')
        ]);

        const [sounds, categories] = await Promise.all(responses.map(res => res.json()));
        const category = req.query.category || req.params.category;
        res.render('index', { sounds, categories, category });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));