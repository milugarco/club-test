// import * as Yup from 'yup'

// const validationGuestStepOne = Yup.object().shape({
//   email: Yup.string()
//     .email('Email inválido')
//     .required('Insira seu email')
//     .test(
//       'isValidEmail',
//       'Email deve conter um ponto (.) e um arroba (@)',
//       (value) => {
//         return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
//           value
//         );
//       }
//     ),
//   userName: Yup.string().required('Insira seu nome'),
//   phoneValue: Yup.string()
//     .required('Insira um telefone válido')
//     .test((value) => {
//       return value.length >= 9;
//     }),
//   cpf: Yup.string().required('Insira um telefone válido').test(
//     'isValidCPF',
//     'CPF inválido',
//     (value) => {
//       if (!value) {
//         return true; // Se o campo estiver vazio, considera válido (ou adicione uma validação personalizada aqui)
//       }
//       if (value.length > 0) {

//         return validarCPF(value as string);
//       }
//       return false;

//     }
//   ),
// })

// function validarCPF(cpf: string): boolean {
//   // Remova caracteres não numéricos do CPF
//   cpf = cpf.replace(/[^\d]+/g, '');

//   // Verifique se o CPF possui 11 dígitos
//   if (cpf.length !== 11) {
//     return false;
//   }

//   // Verifique se o CPF não consiste em uma sequência de dígitos repetidos
//   if (/^(\d)\1+$/.test(cpf)) {
//     return false;
//   }

//   // Calcula os dígitos verificadores
//   let soma = 0;
//   let peso = 10;
//   let digitoVerificador1 = 0;

//   for (let i = 0; i < 9; i++) {
//     soma += parseInt(cpf.charAt(i)) * peso;
//     peso--;
//   }

//   digitoVerificador1 = 11 - (soma % 11);

//   if (digitoVerificador1 > 9) {
//     digitoVerificador1 = 0;
//   }

//   soma = 0;
//   peso = 11;
//   let digitoVerificador2 = 0;

//   for (let i = 0; i < 10; i++) {
//     soma += parseInt(cpf.charAt(i)) * peso;
//     peso--;
//   }

//   digitoVerificador2 = 11 - (soma % 11);

//   if (digitoVerificador2 > 9) {
//     digitoVerificador2 = 0;
//   }

//   // Verifique se os dígitos verificadores calculados coincidem com os dígitos no CPF
//   return (
//     parseInt(cpf.charAt(9)) === digitoVerificador1 &&
//     parseInt(cpf.charAt(10)) === digitoVerificador2
//   );
// }


// export { validationGuestStepOne }
