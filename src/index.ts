import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createAppoloGraphqlServer from "./graphql";
import { getUserId } from "./auth";
// import UserService from "./services/user";
async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });
  app.use("/graphql", expressMiddleware(await createAppoloGraphqlServer(),{
    context: async ({ req }) => {
      // @ts-ignore
      const token = req.headers["access-token"];
      try {
        const userId =  getUserId(token as string);
        // console.log(userId);
        return { userId };
      } catch (error) {
        // console.log(error);
        return {1:Number };
      }
    }
    
  }));

  app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
}
init();
