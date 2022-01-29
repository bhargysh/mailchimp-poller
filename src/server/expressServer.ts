import express, { Application } from "express";

export default class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    // this.routes();
  }

  config(): void {
    this.app.set("port", 3000);
    //   this.app.use(cors());
    this.app.use(express.json());
  }

  // routes(): void {
  //   this.app.use("/contacts", contactRoutes);
  // }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("App is running on port " + this.app.get("port"));
    });
  }
}
