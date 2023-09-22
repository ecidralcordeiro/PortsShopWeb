const jwt = require("jsonwebtoken");

function decodeJWT(token) {
  try {
    const decoded = jwt.verify(token, "adqfwrgwethewr2343dsfsd235423e"); // Substitua 'segredo' pela chave secreta usada para assinar o token

    return decoded;
  } catch (error) {
    console.log("Erro ao decodificar o token:", error.message);
    return null;
  }
}

export { decodeJWT };
