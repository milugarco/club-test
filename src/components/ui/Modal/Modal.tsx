import Modal from 'react-modal'
import { NewBusinessModal } from './modalNewBusiness'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { Button } from '@/components/ui'

type ModalProps = {
    isOpen: boolean
    onRequestClose: () => void
    onConfirm?: () => void
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            overlayClassName="dark:bg-gray-900/80 bg-gray-300/80 top-0 h-[100%] w-full flex justify-center items-center fixed"
            className={
                'dark:bg-gray-800 bg-white sm:w-1/2 rounded-xl flex justify-center items-center flex-col mt-40 max-h-[100%] pb-4 w-full max-w-full md:max-w-3xl mx-auto fixed'
            }
            isOpen={isOpen}
            contentLabel="Modal"
            onRequestClose={onRequestClose}
        >
            <div className="h-full w-full flex items-start flex-col mt-2 ml-4">
                <Button
                    className=" w-16 mb-4"
                    type="submit"
                    variant="twoTone"
                    icon={<HiOutlineChevronLeft />}
                    size="xs"
                    onClick={onRequestClose}
                >
                    <span>Voltar</span>
                </Button>
                <NewBusinessModal className="w-full sm:w-11/12 xl:w-2/4 mr-4" />
            </div>
        </Modal>
    )
}
const ModalPerfil: React.FC<ModalProps> = ({
    isOpen,
    onRequestClose,
    onConfirm
}) => {
    return (
        <Modal
            overlayClassName="dark:bg-gray-900/80 bg-gray-300/80 top-0 h-[100%] w-full flex justify-center items-center fixed "
            className={
                'dark:bg-gray-800 bg-white w-11/12 sm:w-1/2 rounded-xl flex justify-center items-center flex-col mt-40 max-h-[100%] pb-4 max-w-full md:max-w-3xl mx-auto fixed'
            }
            isOpen={isOpen}
            contentLabel="Confirmação Modal"
            onRequestClose={onRequestClose}
        >
            <div className="h-full w-11/12 flex items-start flex-col mt-2 ml-4">
                <h2>Confirmação</h2>
                <p>
                    Tem certeza de que deseja continuar sem foto de perfil? Sua
                    foto será visível para todos no evento.
                </p>
                <div className="flex gap-3 mt-5">
                    <Button onClick={onConfirm}>Sim, tenho certeza</Button>
                    <Button variant="solid" onClick={onRequestClose}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export { ModalComponent, ModalPerfil }
