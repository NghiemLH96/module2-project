import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//congif firebase
const firebaseConfig = {
    apiKey: "AIzaSyCyxJ5Cb6C_dbZX9soXvsrhZs1sIRkBSdY",
    authDomain: "module2-project-53e34.firebaseapp.com",
    projectId: "module2-project-53e34",
    storageBucket: "module2-project-53e34.appspot.com",
    messagingSenderId: "440222211931",
    appId: "1:440222211931:web:78479d39f4a7b529d6447e",
    measurementId: "G-SG6VMSQTZQ"
  };

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFileToStorage(file, folderName, bufferData = undefined) {
    console.log("file",file)
    // nếu file là null thì không làm gì hết
    if (!file) {
        return false
    }

    let fileRef;
    let metadata;
    if (!bufferData) {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + Math.random() * Date.now() + "."  + file.type.split('/')[1]);
    } else {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + `${Date.now() * Math.ceil(Math.random())}` + file.originalname);
        metadata = {
            contentType: file.mimetype,
        };
    }
    let url;
    if (bufferData) {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    } else {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, file).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }


    return url
}