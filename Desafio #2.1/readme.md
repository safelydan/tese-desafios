# Validação de Arquivo JSON

Este projeto foi desenvolvido como parte do Desafio #2.1 da Formação Back-end. A aplicação \`validacao.js\` em JavaScript (Node.js) foi desenvolvida para validar um arquivo JSON contendo informações de clientes de acordo com as regras estabelecidas.

## Descrição

O objetivo do projeto é realizar a validação de dados de clientes de um arquivo JSON, aplicando regras específicas para cada campo. Caso haja algum erro de validação em um ou mais clientes, um arquivo de saída será gerado com detalhes dos erros.

## Funcionalidades

- Validação de nome, CPF, data de nascimento, renda mensal e estado civil dos clientes.
- Geração de arquivo de saída com detalhes dos erros, caso existam.
- Separado em classes para Leitura do arquivo de entrada, Validação dos dados e Geração do arquivo de saída.

## Utilização

1. Clone este repositório:

   \`\`\`bash
   git clone https://github.com/safelydan/tese-desafios.git
   \`\`\`

2. Execute a aplicação, passando o caminho do arquivo JSON de entrada como argumento:

   \`\`\`bash
   node validacao.js caminho/do/arquivo.json
   \`\`\`

## Exemplo de Estrutura do Arquivo JSON

\`\`\`json
[
    {
        "nome": "Fulano de Tal",
        "cpf": "12345678900",
        "data_nascimento": "01011990",
        "renda_mensal": 2500.00,
        "estado_civil": "S"
    },
    ...
]
\`\`\`