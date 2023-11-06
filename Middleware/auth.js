import Jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomeAuth = token.length < 500;
    let decodedData;
    if (token && isCustomeAuth) {
      decodedData = Jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = Jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
