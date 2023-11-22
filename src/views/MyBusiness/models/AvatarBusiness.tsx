import React, { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import { HiOutlineUpload } from 'react-icons/hi'

interface AvatarImageBusinessProps {
    onChange: (file: File | null) => void
}

const AvatarImageBusiness: React.FC<AvatarImageBusinessProps> = ({
    onChange,
}) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null)

    const onFileUpload = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0]
            setAvatarFile(file)
            onChange(file) // Notifique o componente pai sobre a alteração
        }
    }

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of Array.from(files)) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }

        return valid
    }

    return (
        <div>
            <Upload
                className="cursor-pointer"
                showList={false}
                uploadLimit={1}
                beforeUpload={beforeUpload}
                onChange={onFileUpload}
            >
                <Avatar
                    size={100}
                    src={
                        avatarFile ? URL.createObjectURL(avatarFile) : undefined
                    }
                    icon={<HiOutlineUpload />}
                />
            </Upload>
        </div>
    )
}

export default AvatarImageBusiness
