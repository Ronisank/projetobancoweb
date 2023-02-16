// classes de domínio (modelo)

class ContaBancaria {
    constructor(agencia, numeroConta, saldo) {
        this.agencia = agencia;
        this.numeroConta = numeroConta;
        this.saldo = saldo;
        this.operacoes = []; //lançamentos = debito ou credito
    }
debitar(valor) {
    if (valor > this.saldo){
        return false;
    }
    // logica para debito ou saque
    
}    

}

class Lancamento {

}


// var conta = new ContaBancaria(1212, 333, 1000);


// controller: interação com UI
function efetuarOperacao(acao) {
    alert('Implementar');
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
    while(saida.hasChildNodes()) {
        saida.removeChild(saida.lastChild);
    }
}

function validar(valor) {
    if (!valor || valor.length === 0) {
        alert('Valor não preenchido!');
        return false;
    }
    const regex = /^[0-9]*\.?[0-9]*$/;
    const isNumerico = valor.match(regex);
    if (!isNumerico) {
        alert('Valor deve ser numérico, parte fracionária separada por ponto e ser maior que zero!'); 
        return false;
    }
    if (parseFloat(valor) === 0) {
        alert('Valor não pode ser zero!');
        return false;
    }
    return true;
}