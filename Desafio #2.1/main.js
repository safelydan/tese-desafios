import LeitorArquivo from "./Classes/LeitorArquivo.js";
import ValidacaoCliente from "./Classes/ValidacaoCliente.js";
import EscritorArquivo from "./Classes/EscritorArquivo.js";

function validateJSONFile(filePath) {
  const fileReader = new LeitorArquivo();
  const clientValidator = new ValidacaoCliente();
  const fileWriter = new EscritorArquivo();

  try {
    const clients = fileReader.readJSON(filePath);

    if (!Array.isArray(clients)) {
      throw new Error("O arquivo de entrada não contém um array.");
    }

    const errors = clientValidator.validate(clients);

    if (errors.length > 0) {
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
      const errorFileName = `erros-${timestamp}.json`;
      fileWriter.writeJSON(errorFileName, errors);
      console.log(`Arquivo de erros gerado com sucesso: ${errorFileName}`);
    } else {
      console.log(
        "Nenhum erro encontrado. Nenhum arquivo de erros foi gerado."
      );
    }
  } catch (error) {
    console.error("Erro durante a validação do arquivo:", error.message);
  }
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("Caminho do arquivo não fornecido.");
  process.exit(1);
}

validateJSONFile(filePath);
