// classes de domínio (modelo)

class ContaBancaria {
    constructor(agencia, numeroConta, saldo) {
        this.agencia = agencia;
        this.numeroConta = numeroConta;
        this.saldo = saldo;
        this.operacoes = []; //lançamentos = debito ou credito
    }
    debitar(valor) {
        if (valor > this.saldo) {
            return false;
        }
        // logica para debito ou saque
        this.saldo -= valor;
        const lancamento = new Lancamento('Débito', valor);
        this.operacoes.push(lancamento);
        return true;
    }
    // logica para credito ou deposito
    creditar(valor) {
        this.saldo += valor;
        const lancamento = new Lancamento('Crédito', valor);
        this.operacoes.push(lancamento);
    }
    //retorna as operações/lançamentos feitos de forma formatada
    gerarExtrato() {
        const extrato = [];
        for (let i = 0; i < this.operacoes.length; i++) {
            const operacoes = this.operacoes[i];
            const formatada = `Data: ${operacoes.data.toLocaleString('pt-BR')} - ${operacoes.tipo} - R$ ${operacoes.valor}`;
            extrato.push(formatada);
        }
        return extrato;
    }
}

class Lancamento {
    constructor(tipo, valor) {
        this.data = new Date(); //Data atual
        this.tipo = tipo;
        this.valor = valor;
    }

}


var conta = new ContaBancaria(1212, 333, 1000);


// controller: interação com UI
function efetuarOperacao(acao) {
    let valor = obterValor();
    if (acao !== 'saldo' && acao !== 'extrato') {
        //validar valor de entrada
        const isValido = validar(valor);
        if (!isValido) {
            return;
        }
        valor = parseFloat(valor); //converte de string para float numérico fracionário
    }
    switch (acao) {
        case 'sacar':
            sacar(valor);
            break;
        case 'saldo':
            verSaldo();
            break;
        case 'depositar':
            conta.creditar(valor);
            verDeposito();
            break;
        case 'extrato':
            consultarExtrato();
            verExtrato();
            break;
        default:
            alert('Operação inválida!');
    }
    limparValor();
}
function verSaldo() {
    const telaSaldo = document.getElementById("saida");
    telaSaldo.innerHTML = `Saldo atual é: R$ ${conta.saldo}`;
    telaSaldo.classList.add("saldo");
}
function verDeposito() {
    const telaCreditar = document.getElementById("saida");
    telaCreditar.classList.add("deposito");
    telaCreditar.innerHTML = `Foi depositado o valor de R$  ${obterValor()}, com sucesso!`;
   
}
function verExtrato() {
    const telaExtrato = document.getElementById("saida");
    telaExtrato.innerHTML = consultarExtrato();
    const extratoFormatado = telaExtrato.classList.forEach('extrato');
    return extratoFormatado;
}
function sacar(valor) {
    const sucesso = conta.debitar(valor);
    if (sucesso) {
        const telaSaque = document.getElementById("saida");
        telaSaque.classList.add("saque");
        telaSaque.innerHTML = `Saque de R$ ${valor} efetuado com sucesso!`;
        
    } else {
        const ValorInsuficiente = document.getElementById("saida");
        ValorInsuficiente.innerHTML = `Valor insuficiente!`;
        ValorInsuficiente.classList.add("erro");
    }
    
}

function consultarExtrato() {
    const extrato = conta.gerarExtrato();
    let formatado = '';
    for (let i = 0; i < extrato.length; i++) {
        formatado += extrato[i] + '\n';
    }
    return formatado;
}
function obterValor() {
    const input = document.querySelector("#valor");
    let valor = input.value;
    return valor;
}

function limparValor() {
    const input = document.querySelector("#valor");
    input.value = "";
}

function limparSaida() {
    const saida = document.querySelector("#saida");
    while (saida.hasChildNodes()) {
        saida.removeChild(saida.lastChild);
    }
}

function validar(valor) {
    if (!valor || valor.length === 0) {
        const ValorNaoPreenchido = document.getElementById("saida");
        ValorNaoPreenchido.innerHTML = `Valor não preenchido!`;
        return false;
    }
    const regex = /^[0-9]*\.?[0-9]*$/;
    const isNumerico = valor.match(regex);
    if (!isNumerico) {
        const telaErro = document.getElementById("saida");
        telaErro.innerHTML = `Valor deve ser numérico, parte fracionária separada por ponto e ser maior que zero!`;
        return false;
    }
    if (parseFloat(valor) === 0) {
        const valorZero = document.getElementById("saida");
        valorZero.innerHTML = `Valor não pode ser zero!`;
        return false;
    }
    return true;
}
