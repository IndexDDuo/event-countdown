// // //https://github.com/itinance/react-native-fs#readfilefilepath-string-encoding-string-promisestring
// // //react native fs
// // //npm install react-native-fs
import RNFS from "react-native-fs";

// // // export function readFile(
// // // 	filepath: string,
// // // 	encodingOrOptions?: any
// // // ): Promise<string>

// // // export function writeFile(
// // // 	filepath: string,
// // // 	contents: string,
// // // 	encodingOrOptions?: any
// // // ): Promise<void>

// // // export function appendFile(
// // // 	filepath: string,
// // // 	contents: string,
// // // 	encodingOrOptions?: string
// // // ): Promise<void>

const path = RNFS.DocumentDirectoryPath + "/data.json";

export const readFile = async () => {
  try {
    const content = await RNFS.readFile(path, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.log(err);
  }
};
