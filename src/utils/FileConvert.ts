import excelToJson from 'convert-excel-to-json';
import path from 'path';

export function ExcelToJson(filePath: string) {
    const resolvedPath = filePath.split(path.sep).join(path.posix.sep);

    const result = excelToJson({
        sourceFile: resolvedPath
    })

    const jsonFile = ColumnsAdjust(result['Junho'])
    return jsonFile
}

function ColumnsAdjust(jsonFile: any) {
    let header = jsonFile.shift()
    for (let i = 0; i < jsonFile.length; ++i) {
        let temp: any = {}
        Object.entries(jsonFile[i]).forEach(tuple => {
            const key = tuple[0]
            const val = tuple[1]
            const newKey = header[key]
            temp[newKey] = val
        })
        jsonFile[i] = temp
    }

    return jsonFile
}