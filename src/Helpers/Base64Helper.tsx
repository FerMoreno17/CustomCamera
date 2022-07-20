import RNFS from 'react-native-fs';

//IMPORTANTE: Usar solo si se necesitan los archivos guardados
export async function getDirectoryFiles() {
    // get a list of files and directories in the main bundle
    RNFS.readDir(RNFS.DownloadDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
            // stat the first file
            //Da error undefined cuando el directorio está vacio, luego de tomar foto y levantar
            //levantar de nuevo, el error desaparece
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((statResult) => {
            if (statResult[0].isFile()) {
                return RNFS.readFile(statResult[1], 'utf8');
            }
            return 'no file';
        })
        .catch((err) => {
            console.log(err.message, err.code);
        });
}


export async function getBase64(imageUri: any, desafio: string) {
    const filepath = await imageUri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');

    //-----------------------------
    // create a path you want to write to
    // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
    // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable

    //mover a otro lado
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getTime();
    var temp_date = day + month + year + '_' + hour;
    var temp_name = `${desafio}_${temp_date}`;

    var path = `${RNFS.DownloadDirectoryPath}/${temp_name}.txt`;

    // write the file
    RNFS.writeFile(path, imageUriBase64.toString(), 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!', success);
        })
        .catch((err) => {
            console.log(err.message);
        });
    //----------------------------------------------------------

    return imageUriBase64;
}
