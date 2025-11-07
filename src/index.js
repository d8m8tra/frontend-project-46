// import parser from "./parser.js";
// import fs from "fs";
// import path from "path";
// import _ from "lodash";

// // TODO: изменить src на bin в package.json ('bin')

// export default (filepath1, filepath2) => {
//   const data1 = fs.readFileSync(path.resolve(filepath1), "utf-8");
//   const data2 = fs.readFileSync(path.resolve(filepath2), "utf-8");

//   const parsedData1 = parser(data1);
//   const parsedData2 = parser(data2);

//   const keys = [
//     ...new Set([...Object.keys(parsedData1), ...Object.keys(parsedData2)]),
//   ].sort();

//   const diffLines = keys.flatMap((key) => {
//     const value1 = parsedData1[key];
//     const value2 = parsedData2[key];

//     if (value1 !== undefined && value2 === undefined) {
//       return `  - ${key}: ${value1}`;
//     }
//     if (value1 === undefined && value2 !== undefined) {
//       return `  + ${key}: ${value2}`;
//     }
//     if (!_.isEqual(value1, value2)) {
//       return [`  - ${key}: ${value1}`, `  + ${key}: ${value2}`];
//     }
//     return `    ${key}: ${value1}`;
//   });

//   return `{\n${diffLines.join("\n")}\n}`;

//   // Знаки "-" и "+" в выводе означают удаление и добавление элементов соответственно.
//   //  "-" показывает, что в первом файле есть элемент, которого нет во втором (удалено).
//   //  "+" показывает, что элемент появился во втором файле (добавлено).
// };

import parser from "./parser.js";
import fs from "fs";
import path from "path";
import _ from "lodash";

export default (filepath1, filepath2) => {
  const data1 = fs.readFileSync(path.resolve(filepath1), "utf-8");
  const data2 = fs.readFileSync(path.resolve(filepath2), "utf-8");

  const parsedData1 = parser(data1);
  const parsedData2 = parser(data2);

  const keys = [
    ...new Set([...Object.keys(parsedData1), ...Object.keys(parsedData2)]),
  ].sort();

  const formatValue = (value) =>
    typeof value === "object" && value !== null
      ? JSON.stringify(value, null, 2)
      : value;

  const diffLines = keys.flatMap((key) => {
    const value1 = parsedData1[key];
    const value2 = parsedData2[key];

    if (value1 !== undefined && value2 === undefined) {
      return `  - ${key}: ${formatValue(value1)}`;
    }
    if (value1 === undefined && value2 !== undefined) {
      return `  + ${key}: ${formatValue(value2)}`;
    }
    if (!_.isEqual(value1, value2)) {
      return [
        `  - ${key}: ${formatValue(value1)}`,
        `  + ${key}: ${formatValue(value2)}`,
      ];
    }
    return `    ${key}: ${formatValue(value1)}`;
  });

  return `{\n${diffLines.join("\n")}\n}`;
};