# Sistema de Gestão de Consultório Odontológico em Javascript

Este repositório contém a implementação de um sistema de gestão de consultório odontológico em Node.js/Express/Sequelize/PostgreSQL. O sistema oferece as seguintes funcionalidades:

Para rodar utilize o arquivo main dentro da pasta view

## Funcionalidades

1. **Inclusão de Pacientes no Cadastro:**
   - CPF válido (conforme Anexo A).
   - Nome do usuário com pelo menos 5 caracteres.
   - Data de nascimento no formato DD/MM/AAAA.
   - Validar idade do paciente (mínimo de 13 anos no momento do cadastro).
   - Mensagem de erro em caso de dados inválidos.
   - Não permitir dois pacientes com o mesmo CPF.

2. **Exclusão de Pacientes do Cadastro:**
   - Fornecer o CPF.
   - Não permitir excluir pacientes com consulta agendada no futuro.
   - Excluir consultas passadas associadas ao paciente.

3. **Agendamento de Consulta:**
   - CPF do paciente existente no cadastro.
   - Data da consulta no formato DD/MM/AAAA.
   - Hora inicial e final no formato HHMM.
   - Data e hora da consulta devem ser futuras.
   - Restrições de agendamento: único agendamento futuro por paciente, sem sobreposição de horários, intervalos de 15 minutos, horário de funcionamento entre 8:00h e 19:00h.

4. **Cancelamento de Agendamento:**
   - CPF do paciente.
   - Data da consulta e hora inicial.
   - Apenas agendamentos futuros podem ser cancelados.

5. **Listagem dos Pacientes:**
   - Layout conforme especificações no final do documento.
   - Ordenação opcional por CPF ou nome.
   - Apresentar dados do agendamento futuro, se existir.

6. **Listagem da Agenda:**
   - Layout conforme especificações no final do documento.
   - Ordenação por data e hora inicial.
   - Opção de listar toda a agenda ou agenda de um período.

## Regras
- Datas e horas fornecidas pelo usuário devem ser válidas.
- Tratamento de dados inválidos conforme especificado anteriormente.

## Interface com o Usuário
- Tratamento de erros para casos específicos não detalhados nos layouts.

**Observação:**
- Certifique-se de ter o Node.js instalado para executar o sistema.
- As interfaces com o usuário seguem os layouts especificados no final deste documento.

