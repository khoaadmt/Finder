import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Button, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";
import "./index.css";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface Props {
    fileList: UploadFile<any>[];
    setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
    maxCount: number;
}
export const PicturesWall: React.FC<Props> = (props) => {
    const { fileList, setFileList, maxCount } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleUpload = async () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("files", file.originFileObj as File);
        });

        try {
            const response = await axios.post("http://localhost:5000/api/upload/post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            message.success("Upload successfully.");
            setFileList(
                response.data.files.map((file: any) => ({
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    url: file.url,
                }))
            );
        } catch (error) {
            message.error("Upload failed.");
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Upload
                className="custom-upload"
                listType="picture-card"
                maxCount={maxCount}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}>
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    className="check"
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};
