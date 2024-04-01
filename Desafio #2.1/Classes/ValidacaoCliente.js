class ValidacaoCliente {
  validate(clients) {
    const errors = [];

    clients.forEach((client) => {
      const clientErrors = [];

      if (!client.nome || client.nome.length < 5 || client.nome.length > 60) {
        clientErrors.push({
          campo: "nome",
          mensagem: "O nome deve ter entre 5 e 60 caracteres.",
        });
      }

      if (!client.cpf || !/^\d{11}$/.test(client.cpf)) {
        clientErrors.push({ campo: "cpf", mensagem: "CPF inválido." });
      }

      const birthDate = new Date(
        client.data_nascimento.substring(4, 8),
        client.data_nascimento.substring(2, 4) - 1,
        client.data_nascimento.substring(0, 2)
      );
      const currentDate = new Date();
      const ageDiffMs = currentDate - birthDate;
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (
        !client.data_nascimento ||
        !/^\d{8}$/.test(client.data_nascimento) ||
        age < 18
      ) {
        clientErrors.push({
          campo: "data_nascimento",
          mensagem: "Data de nascimento inválida ou cliente menor de 18 anos.",
        });
      }

      if (client.renda_mensal !== undefined && isNaN(client.renda_mensal)) {
        clientErrors.push({
          campo: "renda_mensal",
          mensagem: "Renda mensal deve ser um número válido.",
        });
      }

      if (
        client.estado_civil &&
        !["C", "S", "V", "D"].includes(client.estado_civil.toUpperCase())
      ) {
        clientErrors.push({
          campo: "estado_civil",
          mensagem: "Estado civil inválido.",
        });
      }

      if (clientErrors.length > 0) {
        errors.push({ dados: client, erros: clientErrors });
      }
    });

    return errors;
  }
}

export default ValidacaoCliente;
