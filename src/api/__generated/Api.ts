import type {Executor} from './';
import {
    DatabaseService, 
    GenerateScriptService, 
    ModelService, 
    TypeMappingService
} from './services/';

export class Api {
    
    readonly databaseService: DatabaseService
    
    readonly generateScriptService: GenerateScriptService
    
    readonly modelService: ModelService
    
    readonly typeMappingService: TypeMappingService
    
    constructor(executor: Executor) {
        this.databaseService = new DatabaseService(executor);
        this.generateScriptService = new GenerateScriptService(executor);
        this.modelService = new ModelService(executor);
        this.typeMappingService = new TypeMappingService(executor);
    }
}