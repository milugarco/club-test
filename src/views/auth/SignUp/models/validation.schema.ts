import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .required('Insira seu nome')
        .matches(
            /^[a-zA-Z\s]+$/,
            'Insira apenas letras no nome (com ou sem espaços)'
        ),
    phoneValue: Yup.string()
        .required('Insira um telefone válido')
        .test('isValidPhone', 'Insira um telefone válido', (value) => {
            // Remova todos os caracteres não numéricos
            // const numericPhone = value ? value.replace(/[^\d\s]/g, '') : '';

            // Verifique se o número de telefone tem pelo menos 10 dígitos
            return value.length >= 10
        }),
    documentUserValue: Yup.string()
        .required('Insira um cpf válido')
        .test('isValidCPF', 'CPF inválido', (value) => {
            if (!value) {
                return true // Se o campo estiver vazio, considera válido (ou adicione uma validação personalizada aqui)
            }
            if (value.length > 0) {
                return validarCPF(value as string)
            }
            return false
        }),
    dateOfBirth: Yup.string().required('Insira sua data de nascimento')
})
function validarCPF(cpf: string): boolean {
    // Remova caracteres não numéricos do CPF
    cpf = cpf.replace(/[^\d]+/g, '')

    // Verifique se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return false
    }

    // Verifique se o CPF não consiste em uma sequência de dígitos repetidos
    if (/^(\d)\1+$/.test(cpf)) {
        return false
    }

    // Calcula os dígitos verificadores
    let soma = 0
    let peso = 10
    let digitoVerificador1 = 0

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * peso
        peso--
    }

    digitoVerificador1 = 11 - (soma % 11)

    if (digitoVerificador1 > 9) {
        digitoVerificador1 = 0
    }

    soma = 0
    peso = 11
    let digitoVerificador2 = 0

    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * peso
        peso--
    }

    digitoVerificador2 = 11 - (soma % 11)

    if (digitoVerificador2 > 9) {
        digitoVerificador2 = 0
    }

    // Verifique se os dígitos verificadores calculados coincidem com os dígitos no CPF
    return (
        parseInt(cpf.charAt(9)) === digitoVerificador1 &&
        parseInt(cpf.charAt(10)) === digitoVerificador2
    )
}

const validationSchemaTwo = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required('Insira seu email')
        .test(
            'isValidEmail',
            'Email deve conter um ponto (.) e um arroba (@)',
            (value) => {
                // Use uma expressão regular para verificar se o email contém pelo menos um ponto e um arroba
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    value
                )
            }
        ),
    password: Yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .required('Insira sua senha')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,$!%*?&#+_-])[A-Za-z\d@,$!%*?&#+_-]/,
            'A senha deve conter letra minúscula, letra maiúscula, um número e caractere especial'
        ),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'As senhas não são iguais'
    ),
    agreeToTerms: Yup.boolean().oneOf(
        [true],
        'Você deve concordar com os termos'
    )
})

const validationStepThree = Yup.object().shape({
    documentValue: Yup.string().test(
        'validation',
        'Documento inválido',
        function (value) {
            if (!value) {
                return true // Se o campo estiver vazio, considera válido (ou adicione uma validação personalizada aqui)
            }

            if (value.length > 10) {
                return validarCNPJ(value as string)
            } else if (value.length > 0) {
                return validarEIN(value as string)
            }

            return false // Retorna falso se não corresponder a nenhuma validação conhecida
        }
    )
})

function validarCNPJ(cnpj: string): boolean {
    // Remova caracteres não numéricos do CNPJ
    cnpj = cnpj.replace(/[^\d]+/g, '')

    // Verifique se o CNPJ possui 14 dígitos
    if (cnpj.length !== 14) {
        return false
    }

    // Verifique se o CNPJ não consiste em uma sequência de dígitos repetidos
    if (/^(\d)\1+$/.test(cnpj)) {
        return false
    }

    // Calcula o primeiro dígito verificador
    let soma = 0
    let peso = 2
    for (let i = 11; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso
        peso = peso === 9 ? 2 : peso + 1
    }
    const resto = soma % 11
    const digitoVerificador1 = resto < 2 ? 0 : 11 - resto

    // Calcula o segundo dígito verificador
    soma = 0
    peso = 2
    for (let i = 12; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso
        peso = peso === 9 ? 2 : peso + 1
    }
    const resto2 = soma % 11
    const digitoVerificador2 = resto2 < 2 ? 0 : 11 - resto2

    // Verifique se os dígitos verificadores calculados coincidem com os dígitos no CNPJ
    return (
        parseInt(cnpj.charAt(12)) === digitoVerificador1 &&
        parseInt(cnpj.charAt(13)) === digitoVerificador2
    )
}

function validarEIN(ein: string): boolean {
    // Remova caracteres não numéricos do EIN
    ein = ein.replace(/[^\d]+/g, '')

    // Verifique se o EIN possui 9 dígitos
    if (ein.length !== 9) {
        return false
    }

    return true
}

export { validationSchema, validationStepThree, validationSchemaTwo }

//document: Yup.string().required('Insira o CNPJ'),
//personNameBusiness: Yup.string().required('Insira seu nome')
