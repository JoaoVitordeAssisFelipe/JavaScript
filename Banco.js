/*E um sistema baseado em um banco, que realiza operações de Saque, Deposito, e Transferência.*/

function Banco(cnpj, nome) {
  this.cnpj = cnpj;
  this.nome = nome;
  this.agencia = [];

  this.cadastrarAgencia = function(numero){
    this.agencia.push(numero);
  }
  this.buscarAgencia= function (numero){
    for(i = 0; i < this.agencia.length;i++){
      if(numero == this.agencia[i].numero){
        return this.agencia[i];
      }
    }
  }
}
function Agencia(numero) {
  this.numero = numero;
  this.contasCadastradas = [];

  this.cadastroConta = function(conta){
    this.contasCadastradas.push(conta);  
  }

  this.encerrarConta= function(numero){
     for(i = 0 ; i < this.contasCadastradas.length;i++){
      if(numero == this.contasCadastradas[i].numero){
        this.contasCadastradas.splice(i,1);
      }
    }
}

  this.buscarConta = function(numero){
     for(x = 0 ; x < this.contasCadastradas.length;x++){
      if(numero == this.contasCadastradas[x].numero){
        return this.contasCadastradas[x]
      }
    }
  }
}
function Conta(numero, titulo, dataAbertura) {
  this.numero = numero;
  this.titulo = titulo;
  this.dataAbertura = dataAbertura;
  this.saldo = 0;
  this.contasCadastradas = [];

  this.sacar = function(valor) {
    if (this.saldo >= valor) {
      let saque = this.saldo -= valor;
      console.log('Valor sacado:R$'+valor);
      console.log("Valor após o saque:R$" + saque);
    }
    else {
      console.log("Valor a sacar e maior que o seu saldo");
    }
  }

  this.depositar = function(valor) {
      if(valor > 0 ){
        let valorTotal = this.saldo += valor;
        console.log("Valor do Deposito:R$"+ valorTotal);
      }
      else{
        console.log("Valor invalido!");
      }
  }

  this.transferir = function(numeroConta,numeroAgencia,banco,valor){


    if(valor > this.saldo){
      console.log('Valor nao compativel com o seu saldo');
    }
    else{
      let agenciaTemporaria =  banco.buscarAgencia(numeroAgencia);
    let contaTemporaria = agenciaTemporaria.buscarConta(numeroConta);
    contaTemporaria.depositar(valor);
    this.saldo -= valor+(10);/*O valor 10 e a taxa de transferência*/
    }
    
  }
    
}
function Titular(nome, dataNasc, telefone, cpf, email) {
  this.nome = nome;
  this.dataNasc = dataNasc;
  this.telefone = telefone;
  this.cpf = cpf;
  this.email = email;
}


santander = new Banco('123', 'Santander')
brasil = new Banco('321', 'Banco do Brasil')

let agencia2 = new Agencia(0102);
let agencia3 = new Agencia(0103);

let titular2 = new Titular('Joao','10/08/1990',1195867895,'288.666.40069','joao@gmail.com');
let titular3 = new Titular('Maria','09/08/2000',1195867895,'288.666.40069','maria@gmail.com');

let conta2 = new Conta(135785, titular2, '14/10/2022');
let conta3 = new Conta(531587, titular3, '14/10/2022');

agencia2.cadastroConta(conta2);
agencia3.cadastroConta(conta3);

santander.cadastrarAgencia(agencia2);
brasil.cadastrarAgencia(agencia3);

console.log('Deposito:');
conta2.depositar(100000);
console.log('\nSaque:');
conta2.sacar(200);
console.log('\ntransferência da conta2 para conta 3:')
conta2.transferir(531587, 0103, brasil, 25000);
console.log(conta3);
console.log('\nResultado da conta2:');
console.log(conta2);
