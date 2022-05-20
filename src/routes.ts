import express from 'express';
import formidable from 'formidable';
import { ExcelToJson } from './utils/FileConvert';

export const routes = express.Router()

routes.post('/table', (req, res) => {
    const form = formidable({ multiples: true })

    form.parse(req, (err, fields, files: any) => {
        const { month } = fields
        if (err) {
            console.log(err);
            return;
        }

        const convertedFile = ExcelToJson(files.table.filepath, month)

        res.status(201).json(convertedFile)
    })
})