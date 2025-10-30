import parser from "./parser.js"
import fs from "fs"
import path from "path"

export default (filepath1, filepath2) => {
    const data1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const data2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

    const parsedData1 = parser(data1);
    const parsedData2 = parser(data2)

    console.log('parsedData1', parsedData1);
    console.log('parsedData1', parsedData2);
    
    return parsedData1 === parsedData2
}