import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function validarNome(nome) {
  return nome.length >= 5;
}

function validarCPF(cpf) {
  return /^\d{11}$/.test(cpf);
}

function validarDataNascimento(dataNascimento) {
  const data = new Date(dataNascimento);
  const hoje = new Date();
  return (hoje - data) / (365.25 * 24 * 60 * 60 * 1000) >= 18;
}

function validarRenda(renda) {
  return !isNaN(renda) && parseFloat(renda) >= 0;
}

function validarEstadoCivil(estadoCivil) {
  const estadosCivisPermitidos = ['C', 'S', 'V', 'D'];
  return estadosCivisPermitidos.includes(estadoCivil.toUpperCase());
}

function validarDependentes(dependentes) {
  return !isNaN(dependentes) && dependentes >= 0 && dependentes <= 10;
}


function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarData(data) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(data).toLocaleDateString('pt-BR', options);
}

function coletarDadosCliente() {
  rl.question('Digite o nome do cliente: ', (nome) => {
    if (!validarNome(nome)) {
      console.log('Erro: O nome deve ter pelo menos 5 caracteres.');
      coletarDadosCliente();
      return;
    }

    rl.question('Digite o CPF do cliente: ', (cpf) => {
      if (!validarCPF(cpf)) {
        console.log('Erro: O CPF deve ter exatamente 11 dígitos.');
        coletarDadosCliente();
        return;
      }

      rl.question('Digite a data de nascimento (DD/MM/AAAA): ', (dataNascimento) => {
        if (!validarDataNascimento(dataNascimento)) {
          console.log('Erro: O cliente deve ter pelo menos 18 anos na data atual.');
          coletarDadosCliente();
          return;
        }

        rl.question('Digite a renda mensal: ', (renda) => {
          if (!validarRenda(renda)) {
            console.log('Erro: A renda deve ser um valor maior ou igual a zero.');
            coletarDadosCliente();
            return;
          }

          rl.question('Digite o estado civil (C, S, V ou D): ', (estadoCivil) => {
            if (!validarEstadoCivil(estadoCivil)) {
              console.log('Erro: Estado civil inválido. Informe C, S, V ou D.');
              coletarDadosCliente();
              return;
            }

            rl.question('Digite o número de dependentes (0 a 10): ', (dependentes) => {
              if (!validarDependentes(dependentes)) {
                console.log('Erro: O número de dependentes deve estar entre 0 e 10.');
                coletarDadosCliente();
                return;
              }

              // Dados corretos, imprimir na tela
              console.log('\nDados do Cliente:');
              console.log(`Nome: ${nome}`);
              console.log(`CPF: ${formatarCPF(cpf)}`);
              console.log(`Data de Nascimento: ${formatarData(dataNascimento)}`);
              console.log(`Renda Mensal: R$ ${parseFloat(renda).toFixed(2)}`);
              console.log(`Estado Civil: ${estadoCivil.toUpperCase()}`);
              console.log(`Dependentes: ${parseInt(dependentes)}`);

              rl.close();
            });
          });
        });
      });
    });
  });
}

// Iniciar o processo de coleta de dados
coletarDadosCliente();
