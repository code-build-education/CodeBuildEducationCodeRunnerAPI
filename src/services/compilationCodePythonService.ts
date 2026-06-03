import fs from "fs";
import os from "os";
import path from "path";
import { PythonShell } from "python-shell";
import { CompilationCodePythonRepository } from "../repositories/compilationCodePythonRepository";

// Class for service compilation code python
export class CompilationCodePythonService {
    // Vars private
    private compilationCodePythonRepository: CompilationCodePythonRepository;

    // Constructor
    constructor() {
        this.compilationCodePythonRepository = new CompilationCodePythonRepository();
    }

    // Method to get all compilation code python
    async getAllCompilationCodePython() {
        try {
            // Get all compilation code python
            const compilationCodePython = await this.compilationCodePythonRepository.getAllCompilationCodePython();
            // Return result
            return compilationCodePython;
        } catch (error) {
            // Manage error
            if (error instanceof Error) {
                console.error("Error getting all compilation code python:", error);
                return { error: error.message };
            }
        }
    }

    // Method to compile code python
    async compilateCodePython(code: string) {
        // Temp directory 
        const tempDir = os.tmpdir();
        // File path
        const filePath = path.join(tempDir, 'code.py');
        // Options for PythonShell
        try {
            // Write code to the file
            fs.writeFileSync(filePath, code);
            // Execute Python code
            const codeResultCompiled = await PythonShell.run(filePath, undefined);
            // Delete the file
            fs.unlinkSync(filePath);
            // If code result compiled is different from empty, save in the database
            if (codeResultCompiled.length > 0) {
                await this.compilationCodePythonRepository.saveCompilationCodePython(code, codeResultCompiled);
            } else {
                return { error: "Error executing Python code" };
            }
            // Return result
            return codeResultCompiled;
        } catch (error) {
            // Delete file if it exists
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            // Handle error
            if (error instanceof Error) {
                console.error("Error compiling code python:", error);
                return { error: error.message };
            }
        }
    }
}
