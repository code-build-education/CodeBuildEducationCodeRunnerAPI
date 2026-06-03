import { Request, Response } from "express";
import { compilationCodePythonValidation } from "../validations/compilationCodePythonValidation";
import { CompilationCodePythonService } from "../services/compilationCodePythonService";

// Class for controller compilation code python
export class CompilationCodePythonController {
    // Vars private
    private compilationCodePythonService: CompilationCodePythonService;

    // Constructor
    constructor() {
        this.compilationCodePythonService = new CompilationCodePythonService();
    }

    // Method to get all compilation code python
    async getAllCompilationCodePython(req: Request, res: Response) {
        try {
            // Get all compilation code python
            const compilationCodePython = await this.compilationCodePythonService.getAllCompilationCodePython();
            // Check if compilationCodePython is an array before accessing length
            if (Array.isArray(compilationCodePython)) {
                // If not found data in the database
                if (compilationCodePython.length === 0) {
                    res.status(404).json({ error: "Not found data" });
                } else {
                    // Response with data
                    res.json({ compilationCodePython });
                }
            } else {
                // Handle the case where compilationCodePython is not an array (e.g., an error object)
                res.status(500).json({ error: "Unexpected response format" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // Method to compile code python
    async postCompilateCodePython(req: Request, res: Response) {
        try {
            // Get code
            const { code } = req.body;
            // Validate code
            const { error } = compilationCodePythonValidation.validate({ code });
            // If not valid code
            if (error) {
                res.status(400).json({ error: error.details[0].message });
                return;
            } else {
                // Compile code python
                const compilationCodePythonResult = await this.compilationCodePythonService.compilateCodePython(code);
                // Response
                res.json({ compilationCodePythonResult });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}