const jwt = require("jsonwebtoken");

const decodeToken = (req, requireAuth = true) => {
  const header = req;
  console.log(header);

  if (header) {
    const token = header.replace("Bearer ", "");
    const deconde = jwt.decode(token, "secret");
    return deconde;
  }

  if (requireAuth) {
    throw new Error("Token not found");
  }

  return null;
};

const encode = async () => {
  return jwt.sign(
    JSON.stringify({
      role: "USER",
      id: "1",
    }), "secret"
  );
};

module.exports = { decodeToken, encode };
