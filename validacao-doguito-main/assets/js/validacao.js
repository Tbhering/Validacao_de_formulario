export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro
            (tipoDeInput, input)

    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'CustomError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'o campo nome não pode estar vazio'
    }, email: {
        valueMissing: 'o campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    }, senha: {
        valueMissing: 'O campo de senhão não pode estar vazio.',
        patternMismatch: 'A senha deve contar entre 4 a 8 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos'
    }, dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior do que 18 anos para se cadastrar.'
    }
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input)
};
function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if (input.validity[erro]){
            mensagem = mensagensDeErro[ tipoDeInput][erro]
        }
    })
    return mensagem
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if (!maiorq18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
}


function maiorq18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}