import { PrismaClient } from "@prisma/client";

// Class for handling all the database operations in compilation code python
export class CompilationCodePythonRepository {
    // Vars private
    private prisma: PrismaClient;

    // Constructor
    constructor() {
        this.prisma = new PrismaClient();
    }

    // Methods to get all compilation code python
    async getAllCompilationCodePython() {
        try {
            // Get all compilation code python
            const compilationCodePython = await this.prisma.compilationCodePythonResult.findMany();
            // Return compilation code python
            return compilationCodePython;
        } catch (error) {
            // Manage error
            if (error instanceof Error) {
                console.error("Error getting all compilation code python:", error);
                return { error: error.message };
            }
        } finally {
            await this.prisma.$disconnect();
        }
    }

    // Methods to get one compilation code python
    async getOneCompilationCodePython(id: string) {
        try {
            // Get one compilation code python
            const compilationCodePython = await this.prisma.compilationCodePythonResult.findUnique({
                where: {
                    id: id
                }
            });
            // Return compilation
            return compilationCodePython;
        } catch (error) {
            // Manage error
            if (error instanceof Error) {
                console.error("Error getting one compilation code python:", error);
                return { error: error.message };
            }
        }
    }

    // Methods to save compilation code python
    async saveCompilationCodePython(code: string, codeResultCompiled: string[]) {
        try {
            // Save compilation code python
            const compilationCodePython = await this.prisma.compilationCodePythonResult.create({
                data: {
                    code: code,
                    codeResultCompiled: codeResultCompiled
                }
            });
            // Return compilation code python
            return compilationCodePython;
        } catch (error) {
            // Manage error
            if (error instanceof Error) {
                console.error("Error saving compilation code python:", error);
                return { error: error.message };
            }
        } finally {
            await this.prisma.$disconnect();
        }
    }

    // Methods to update compilation code python
    async updateCompilationCodePython(id: string, code: string, codeResultCompiled: string[]) {
        try {
            // Update compilation code python
            const compilationCodePython = await this.prisma.compilationCodePythonResult.update({
                where: {
                    id: id
                },
                data: {
                    code: code,
                    codeResultCompiled: codeResultCompiled
                }
            });
            // Return compilation code python
            return compilationCodePython;
        } catch (error) {
            // Manage error
            if (error instanceof Error) {
                console.error("Error updating compilation code python:", error);
                return { error: error.message };
            }
        } finally {
            await this.prisma.$disconnect();
        }
    }

    // Methods to delete compilation code python
    async deleteCompilationCodePython(id: string) {
        try {
            // Delete compilation code python
            const compilationCodePython = await this.prisma.compilationCodePythonResult.delete({
                where: {
                    id: id
                }
            });
            // Return compilation code python
            return compilationCodePython;
        } catch (error) {
            // Manage error
            if (error instanceof Error) {
                console.error("Error deleting compilation code python:", error);
                return { error: error.message };
            }
        } finally {
            await this.prisma.$disconnect();
        }
    }
}