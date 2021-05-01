import Input from "./Input";
import CloseIcon from "./CloseIcon";
import LoadingIcon from "./LoadingIcon";
import PictureIcon from "./PictureIcon";
import Button from "./Button";
import {useRef, useState} from "react";

/**
 * @param file {File}
 * @returns {string | ArrayBuffer}
 */
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function FileUpload() {
    const fileInputRef = useRef();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const onClickOpenFile = () => fileInputRef.current.click();
    const onChangeFiles = async () => {
        setLoading(true);
        const newFiles = await Promise.all([].slice.call(fileInputRef.current.files).map(readFileAsDataURL));
        setFiles((oldFiles) => newFiles.concat(oldFiles));
        setLoading(false);
    }

    const onClickRemoveFile = (file) => {
        setFiles((oldFiles) => oldFiles.filter((f) => f !== file));
    }

    return (
        <div className="flex flex-col">

            <Input type="file" ref={fileInputRef} onChange={onChangeFiles} multiple hidden/>

            <div className="flex flex-row">

                {files.slice(1, 4).map((file, i) => (
                    <button key={i} className="flex items-center justify-center rounded w-1/2 sm:w-1/3 md:w-1/4 bg-gray-600 overflow-hidden mr-2 h-50 relative" onClick={() => onClickRemoveFile(file)}>
                        <CloseIcon size="4" className="absolute top-2 right-2 z-30 text-white bg-gray-800 rounded-full p-0.5 shadow-sm cursor-pointer"/>
                        <img src={file} alt="" className="w-full"/>
                    </button>
                ))}

                {files.length > 4 ? (
                    <div className="flex items-center justify-center rounded w-1/2 sm:w-1/3 md:w-1/4 bg-gray-500 overflow-hidden p-4 mr-2 text-white h-50">
                        E mais {files.length - 3} imagens...
                    </div>
                ) : null}

                <div className="flex flex-col rounded w-1/2 sm:w-1/3 md:w-1/4 overflow-hidden cursor-pointer" onClick={onClickOpenFile}>
                    <div className="p-4 flex flex-col items-center justify-center bg-gray-300 text-white h-40">
                        {loading ? <LoadingIcon size="10" /> : <PictureIcon size="10"/>}
                    </div>
                    <Button color="blue" textSize="sm" rounded="rounded rounded-t-none" className="w-full">
                        Anexar imagem
                    </Button>
                </div>
            </div>

        </div>
    )
}