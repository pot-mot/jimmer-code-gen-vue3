import ts from "typescript";

export const isFunctionType = (type: ts.Type | null | undefined) => {
    if (!type) return false;
    const signatures = type.getCallSignatures();
    return signatures.length > 0;
}

export const hasTypeParameters = (declaration: ts.TypeAliasDeclaration | ts.InterfaceDeclaration) => {
    return declaration.typeParameters && Array.isArray(declaration.typeParameters) && declaration.typeParameters.length > 0;
}

export const getTypeInfo = (
    statement: ts.Statement,
    typeChecker: ts.TypeChecker,
    fileName: string
): {
    declaration: ts.TypeAliasDeclaration | ts.InterfaceDeclaration,
    type: ts.Type,
    typeName: string,
} => {
    if (
        !ts.isTypeAliasDeclaration(statement) &&
        !ts.isInterfaceDeclaration(statement)
    ) {
        throw new Error(`[${fileName}] ${statement} is not a valid type alias or interface`)
    }

    const type = typeChecker.getTypeAtLocation(statement)
    if (!type) {
        throw new Error(`[${fileName}] ${statement} is not a valid type alias or interface`)
    }

    const typeName = statement.name.escapedText
    if (typeof typeName !== "string") {
        throw new Error(`[${fileName}] ${statement} is not a valid type alias or interface`)
    }

    return {
        declaration: statement,
        type,
        typeName,
    }
}