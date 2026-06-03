import express, { Request, Response } from "express";
import { CompilationCodePythonController } from "../controllers/compilationCodePythonController";

// Class for routes compilation code python
export class CompilationCodePythonRoute {
    // Vars private
    private compilationCodePythonController: CompilationCodePythonController;
    
    // Vars public
    public router = express.Router();

    // Constructor
    constructor() {
        // Instance controller
        this.compilationCodePythonController = new CompilationCodePythonController();
    }

    // Compile code python route
    public compileCodePythonRoute(): void {
        // Get all compilation code python
        this.router.get("/compilation-code-python", async (req: Request, res: Response) => {
            await this.compilationCodePythonController.getAllCompilationCodePython(req, res);
        });
        // Post compilation code python
        this.router.post("/compilation-code-python", async (req: Request, res: Response) => {
            await this.compilationCodePythonController.postCompilateCodePython(req, res);
        });
    }
}