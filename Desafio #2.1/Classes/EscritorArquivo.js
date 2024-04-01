import fs from "fs";

class EscritorJson {
  writeJSON(fileName, content) {
    try {
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
      const errorFileName = `errors-${timestamp}.json`;
      const fullPath = `${errorFileName}`;

      fs.writeFileSync(fullPath, JSON.stringify(content, null, 2));
      console.log(`Arquivo de saída gerado com sucesso: ${errorFileName}`);
    } catch (error) {
      throw new Error("Erro ao escrever o arquivo de saída: " + error.message);
    }
  }
}

export default EscritorJson;
