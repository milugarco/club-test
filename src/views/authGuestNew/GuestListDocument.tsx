import React from 'react'
import DocumentList from './DocumentList'
import { Card } from '@/components/ui'

const GuestListDocument = () => {
  return (
    <div className="px-0 sm:px-12 md:px-20 lg:px-20 xl:px-40">
      <Card className='border-none flex justify-center w-full flex-col text-center'>
            <h1 className="text-lg lg:text-3xl mb-2 text-center">Documentos cadastrados</h1>
            <p className='mb-4'>Mantenha sempre sua lista de documentos atualizada!</p>
            <DocumentList />
            
            </Card>    
        </div>
  )
}

export default GuestListDocument