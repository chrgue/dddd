import express, { Express } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { html, json } from './html';

dotenv.config();

const app: Express = express();

app.set('view engine', 'ejs');

fs.readdir(path.join(__dirname, 'pages'), function (err, files) {
    files
        .map((it) => it.split('.').slice(0, -1).join('.'))
        .forEach((it) => {
            const module = require(`./pages/${it}`);
            app.use(`/pages/${it}`, html(module.getProps, module.getComponent));
        })
});

fs.readdir(path.join(__dirname, 'api'), function (err, files) {
    files
        .map((it) => it.split('.').slice(0, -1).join('.'))
        .forEach((it) => {
            const module = require(`./api/${it}`);
            app.use(`/api/${it}`, json(module.getProps, module.getComponent));
        })
});

export { app as default };