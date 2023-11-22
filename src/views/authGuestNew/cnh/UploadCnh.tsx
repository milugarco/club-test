import { useState } from 'react'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { HiOutlineCloudUpload, HiTrash } from 'react-icons/hi'
import { FcImageFile } from 'react-icons/fc'
import { GuestFormProps } from '../interfaces/GuestProps.interface'
import { useTranslation } from 'react-i18next'




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

      const {t} = useTranslation()

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
                    valid = t('authGuest.cnh.valid.valid1').toString()
                }

                if (f.size >= maxFileSize) {
                    valid = t('authGuest.cnh.valid.valid2').toString()
                }
            }
        }

        return valid
    }

    const handleNextClick = async () => {
        if (isPhotoUploaded) 
        handleStep?.('seven', { ...formValueStep,  photoDocumentOne: formData.photoDocumentOne, photoDocumentTwo: formData.photoDocumentTwo});
        
    }

    
    




    const handleDeletePhoto = () => {
        // Exclua a foto definindo o avatarImg como nulo
        setAvatarImg(null)
        setIsPhotoUploaded(false)
    }


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className="text-lg  lg:text-3xl mb-2">
                {t('authGuest.cnh.paragraph3').toString()}
            </h1>
            <div className="mb-4">
            </div>
            <div className='w-full flex justify-center items-center flex-col'>
                {avatarImg && avatarImg.trim() !== '' ? (<>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <Upload
                            draggable
                            className="bg-gray-100 dark:bg-gray-900 z-31 w-full h-[20vh] sm:w-[500px] mb-4"
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
                                {t('authGuest.cnh.paragraph4').toString()}
                                </p>
                                
                            </div>
                        </Upload>
                        <div className='flex w-full items-center justify-center gap-4'>
                        <Button variant="solid" className='bg-red-500 hover:bg-red-400 active:bg-red-600 mt-2 mb-6 w-full md:w-60' onClick={handleDeletePhoto} icon={<HiTrash />}>
                        {t('authGuest.uploadProfilePhotoStep.deleteButton').toString()}
                        </Button>
                        
                        </div>
                        
                        
                    </div>
                    
                        <Button  block variant="solid" onClick={handleNextClick} className='w-full md:w-60'>
                        {t('authGuest.nextButton').toString()}
                        </Button>
                        
                    </>
                ) : (
                    <div className='w-full flex flex-col justify-center items-center'>
                        <Upload
                            draggable
                            className="bg-gray-100 dark:bg-gray-900 z-31 w-full h-[20vh] sm:w-[500px] mb-4"
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
                                {t('authGuest.cnh.paragraph5').toString()}
                                </p>
                                <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                                {t('authGuest.uploadProfilePhotoStep.uploadButton').toString()}
                                </Button>
                            </div>
                        </Upload>
                        <div className='flex justify-center items-center w-full'>
                        <Button variant="solid" disabled className='w-full md:w-60'>
                        {t('authGuest.nextButton').toString()}
                        </Button>
                        </div>
                    </div>

                )}
            </div>


            
        </div>
    )
}

export default UploadCnh
