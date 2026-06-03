import { Application } from "express";
import { CompilationCodePythonRoute } from "./compilationCodePythonRoute";

// Class for routes
export class Routes {
    // Vars private
    private compilationCodePythonRoute: CompilationCodePythonRoute;

    // Constructor
    constructor() {
        // Instance routes
        this.compilationCodePythonRoute = new CompilationCodePythonRoute();
    }

    // Routes api
    public routesApi(app: Application): Application {
        this.compilationCodePythonRoute.compileCodePythonRoute();
        app.use("/api/v1", this.compilationCodePythonRoute.router);
        return app;
    }
}