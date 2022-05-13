import express from 'express';
import formidable from 'formidable';
import excelToJson from 'convert-excel-to-json';
import path from 'path';

export const routes = express.Router()

routes.post('/table', (req, res) => {
    const form = formidable({ multiples: true })

    form.parse(req, (err, _, files: any) => {
        if (err) {
            console.log(err);
            return;
        }

        const filePath = files.table.filepath
        const resolvedPath = filePath.split(path.sep).join(path.posix.sep);

        const result = excelToJson({
            sourceFile: resolvedPath
        })

        res.status(201).json(result)
    })
})