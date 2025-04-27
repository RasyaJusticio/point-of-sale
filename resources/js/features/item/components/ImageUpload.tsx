import { Button } from '@/components/ui/button';
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from '@/components/ui/file-upload';
import { Upload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type ImageUploadProps = {
    value?: File[];
    onChange?: (files: File[]) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
    const [internalFiles, setInternalFiles] = useState<File[]>([]);

    const isControlled = value !== undefined;
    const currentFiles = isControlled ? value : internalFiles;

    const setFiles = (newValue: File[]) => {
        if (onChange) onChange(newValue);
        if (!isControlled) setInternalFiles(newValue);
    };

    const onFileReject = useCallback((file: File, message: string) => {
        toast(message, {
            description: `Gambar "${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" telah ditolak`,
        });
    }, []);

    return (
        <FileUpload
            maxFiles={1}
            maxSize={5 * 1024 * 1024}
            accept="image/*"
            className="w-full"
            value={currentFiles}
            onValueChange={setFiles}
            onFileReject={onFileReject}
        >
            {currentFiles.length === 0 && (
                <FileUploadDropzone>
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center rounded-full border p-2.5">
                            <Upload className="text-muted-foreground size-6" />
                        </div>
                        <p className="text-sm font-medium">Seret & lepaskan gambar di sini</p>
                        <p className="text-muted-foreground text-xs">Atau klik untuk mencari (maks 1 file, hingga 5MB setiap gambar)</p>
                    </div>
                    <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2 w-fit">
                            Cari file
                        </Button>
                    </FileUploadTrigger>
                </FileUploadDropzone>
            )}
            <FileUploadList>
                {currentFiles.map((file, index) => (
                    <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                            <Button variant="ghost" size="icon" className="size-7">
                                <X />
                            </Button>
                        </FileUploadItemDelete>
                    </FileUploadItem>
                ))}
            </FileUploadList>
        </FileUpload>
    );
};

export default ImageUpload;
