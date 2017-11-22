/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';


const app = express();

export default app;

app.use(morgan('dev'));

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }));






app.get('/',  (req, res) => {
    res.status(200).send({
        message: 'welcome to our events',
    });
});



app.get('*',  (req, res) => {
    res.status(404).send({
        message: 'That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫',
    });
});



const port = process.env.PORT || 4000;

app.listen(port);

console.log(`Find me on http://localhost:${port}`);

