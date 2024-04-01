import fs from "fs";

class LeitorJson {
  readJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Erro ao ler o arquivo: " + error.message);
    }
  }
}

export default LeitorJson;
