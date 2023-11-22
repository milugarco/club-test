import { useState } from 'react'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { HiOutlineCloudUpload, HiTrash } from 'react-icons/hi'
import { FcImageFile } from 'react-icons/fc'
import { GuestFormProps } from '../interfaces/GuestProps.interface'




export type uploadCnh = {
    photoDocumentOne: string,
    photoDocumentTwo: string
  
  }
const UploadCnh = (props: GuestFormProps) => {
    const { disableSubmit = false, handleStep, formValueStep} = props;
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false)


    const [avatarImg, setAvatarImg] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        photoDocumentOne: formValueStep?.photoDocumentOne || '',
        photoDocumentTwo: '',
      });

      const onFileUpload = (files: File[]) => {
    
        if (files.length > 0) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if(e.target){
                let base64String = e.target.result as string;
                base64String = base64String.replace(/^data:application\/[a-z]+;base64,/, "");
                setIsPhotoUploaded(true);
                setFormData({
                    ...formData,
                    photoDocumentOne: base64String,
                    photoDocumentTwo: ''
                });
                
            }
            };

            reader.readAsDataURL(files[0]);
            setAvatarImg(URL.createObjectURL(files[0]))
            setIsPhotoUploaded(true)
            
        }
    }

    const beforeUpload = (files: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['application/pdf']
        const maxFileSize = 5000000



        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Faça o upload de arquivo .pdf'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Sua imagem deve ter no máximo 5mb!'
                }
            }
        }

        return valid
    }

    const handleNextClick = async () => {
        if (isPhotoUploaded) 
        handleStep?.('seven', {...formData, ...formValueStep});
        
    }

    
    




    const handleDeletePhoto = () => {
        
        setAvatarImg(null)
        setIsPhotoUploaded(false)
    }


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className="text-lg  lg:text-3xl mb-2">
                Faça upload da sua CNH digital em PDF
            </h1>
            <div className="mb-4">
            </div>
            <div className='w-full flex justify-center items-center flex-col'>
                {avatarImg && avatarImg.trim() !== '' ? (<>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <Upload
                            draggable
                            className="bg-gray-100 dark:bg-gray-900 z-31 w-full h-[20vh] sm:w-[600px] mb-4"
                            uploadLimit={1}
                            beforeUpload={beforeUpload}
                            onChange={onFileUpload}
                            showList={true}
                            multiple={false}
                            disabled={true}
                            

                        >
                            
                            <div className="my-16 text-center flex flex-col gap-4 mx-4">
                                <div className="text-6xl flex justify-center">
                                    <FcImageFile />
                                </div>
                                <p className="opacity-60 dark:text-white">
                                    Upload de .pdf concluido
                                </p>
                                
                            </div>
                        </Upload>
                        <div className='flex w-full items-center justify-center gap-4'>
                        <Button variant="solid" className='bg-red-500 hover:bg-red-400 active:bg-red-600 mt-2 mb-6' onClick={handleDeletePhoto} icon={<HiTrash />}>
                            Excluir
                        </Button>
                        
                        </div>
                        
                        
                    </div>
                    
                        <Button  block variant="solid" onClick={handleNextClick} className='w-full'>
                            Próximo
                        </Button>
                        
                    </>
                ) : (
                    <div className='w-full flex flex-col justify-center items-center'>
                        <Upload
                            draggable
                            className="bg-gray-100 dark:bg-gray-900 z-31 w-full h-[20vh] sm:w-[600px] mb-4"
                            uploadLimit={1}
                            beforeUpload={beforeUpload}
                            onChange={onFileUpload}
                            showList={false}
                            multiple={false}

                        >
                            <div className="my-16 text-center flex flex-col gap-4 mx-4">
                                <div className="text-6xl flex justify-center">
                                    <FcImageFile />
                                </div>
                                <p className="opacity-60 dark:text-white">
                                    Suportável: .pdf de no máx 5mb
                                </p>
                                <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                                    Upload
                                </Button>
                            </div>
                        </Upload>
                        
                        <Button  block variant="solid" disabled className='w-full'>
                            Próximo
                        </Button>
                    </div>

                )}
            </div>


            
        </div>
    )
}

export default UploadCnh
