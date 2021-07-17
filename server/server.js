const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');
const cors = require('cors');
require('dotenv').config()



const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((error) => console.log('DB CONNECTION ERROR', error));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// routes middleware
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));



