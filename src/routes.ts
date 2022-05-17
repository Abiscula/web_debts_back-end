import express from 'express';
import formidable from 'formidable';
import { ExcelToJson } from './utils/FileConvert';

export const routes = express.Router()

routes.post('/table', (req, res) => {
    const form = formidable({ multiples: true })

    form.parse(req, (err, _, files: any) => {
        if (err) {
            console.log(err);
            return;
        }

        const convertedFile = ExcelToJson(files.table.filepath)

        res.status(201).json(convertedFile)
    })
})