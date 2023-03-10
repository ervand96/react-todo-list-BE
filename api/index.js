const express = require('express')

const PORT = process.env.PORT ?? 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server ${PORT}`);
})