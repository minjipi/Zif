const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(express.static(path.join(__dirname)));

app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});
