import React, { useState, useEffect } from 'react';
import { Button, Spinner } from "@/components/ui";
import { HiPencil } from "react-icons/hi";
import { GuestFormProps } from "./interfaces/GuestProps.interface";
import "./styles/Photo.css"

export type GuestFormSchemaStepNine = {
  signTerms: boolean
}

const GuestStepNine = (props: GuestFormProps) => {
  const { disableSubmit = false, handleStep, formValueStep } = props;
  const [formData, setFormData] = useState({
    signTerms: formValueStep?.signTerms || false,
  });
  const [showFormatSign, setShowFormatSign] = useState(false);
  const [animatedFormatSign, setAnimatedFormatSign] = useState('');
  const [isSigned, setIsSigned] = useState(false);

  const nameUserTerm = `Nome: ${formValueStep?.userName}`;
  const cpfUserTerm = `CPF: ${formValueStep?.cpf}`;
  const nameComplete = formValueStep?.userName;

  const formatName = (name: string) => {
    const words = name.split(" ");
    if (words.length <= 2) {
      // Se tiver uma ou duas palavras, exibe o nome completo
      return name;
    } else {
      // Se tiver mais de duas palavras, formata como descrito
      const firstName = words[0];
      const middleInitials = words.slice(1, -1).map(word => word.charAt(0).toUpperCase() + ".").join(" ");
      const lastName = words[words.length - 1];
      return `${firstName} ${middleInitials} ${lastName}`;
    }
  };

  const formattedName = formatName(nameComplete!);

  useEffect(() => {
    const newUserInput = {
      signTerms: formData.signTerms,
    }
    setFormData((prevData) => ({
      ...prevData,
      signTerms: formValueStep?.signTerms || newUserInput.signTerms,
    }));
  }, [formValueStep]);

  const validateInputs = () => {
    setShowFormatSign(true);
    setIsSigned(true);

    if (!showFormatSign) { 
      const arr = formattedName.split('');
      let i = 0;
      setAnimatedFormatSign(arr[0]);
      const intervalId = setInterval(() => {
        if (i < arr.length - 1) {
          setAnimatedFormatSign((prevFormat) => prevFormat + arr[i]);
          i++;
        } else {
          clearInterval(intervalId);

          setTimeout(() => {
            handleStep?.('ten', { ...formData, ...formValueStep });
          }, 1500); 
        }
      }, 100); 
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center gap-4">
      <h1 className="text-sm lg:text-3xl text-center">
        Assine os termos do evento
      </h1>
      <div className="relative shadow-lg rounded-lg flex justify-center w-full h-[500px] sm:w-[90%] xl:w-1/2 xl:h-[600px]">
      <iframe
        className="shadow-lg rounded-lg w-full h-full"
        title="PDF Viewer"
        src="/img/teste.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0"




      />
      {showFormatSign ? (
          
      <div className="absolute w-full h-full bg-black bg-opacity-80 flex justify-center items-center rounded-lg">
      <img
        src="/img/documentOkayy.gif"
        alt="Imagem Overlay"
        className=" w-48 h-48 bg-contain  rounded-lg"
      />
      </div>
        ) : null}
    </div>
      <div className="flex flex-col text-sm dark:text-white text-center">
        {showFormatSign ? (
          <p className="assinatura-user-name-terms text-2xl sm:text-4xl">
            {animatedFormatSign}
          </p>
        ) : <p className="h-8">
        
      </p>}
        <hr />
        <p>{nameUserTerm}</p>
        <p>{cpfUserTerm}</p>
      </div>

      <Button
        className="shadow-lg mt-4 flex flex-row gap-2 justify-center items-center"
        variant="solid"
        onClick={() => validateInputs()}
        disabled={isSigned}
      >
        {isSigned ? <><Spinner color="gray-500" />Assinando...</> : <><HiPencil />Assinar Termo</>}
      </Button>
    </div>
  );
};

export default GuestStepNine;
