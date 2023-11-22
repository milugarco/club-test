import { Button } from '@/components/ui';
import React, { useState } from 'react';
import { HiOutlinePlusCircle, HiPencil, HiPencilAlt } from 'react-icons/hi';

const DocumentList = () => {
  const [documents, setDocuments] = useState([
    { id: 1, type: 'RG', number: '123456' },
    { id: 2, type: 'CNH', number: '789012' },
    // Adicione mais documentos conforme necessário
  ]);

  const handleAddDocument = () => {
    // Lógica para adicionar um novo documento
    const newDocument = {
      id: documents.length + 1,
      type: `Novo Tipo ${documents.length + 1}`,
      number: `Novo Número ${documents.length + 1}`,
    };

    setDocuments([...documents, newDocument]);
  };

  const handleEditDocument = (id: any) => {
    // Lógica para editar um documento específico (ainda não implementada neste exemplo)
    console.log(`Editar documento com ID ${id}`);
  };

  return (
    <div>
        
      <ul className='flex gap-4 flex-col w-full'>
      <Button onClick={handleAddDocument} variant='solid' className='flex justify-center items-center text-center gap-2 flex-row w-full md:w-60 shadow-lg'><HiOutlinePlusCircle className='text-2xl' /> Adicionar Documento</Button>
        
        {documents.map((document) => (
          <li key={document.id} className='dark:bg-gray-900 bg-zinc-100 rounded-lg h-20 flex flex-row justify-between text-center items-center px-4'>
            <div>Documento: {document.type}</div> 
            <div>Número: {document.number}</div>
            <button onClick={() => handleEditDocument(document.id)} className='text-2xl'><HiPencilAlt /></button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default DocumentList;
