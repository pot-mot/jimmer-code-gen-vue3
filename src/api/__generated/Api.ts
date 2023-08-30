import type { Executor } from './';

import { AssociationController, DataSourceController, EntityController, SchemaController, TableController } from './services';

export class Api {
    
    readonly associationController: AssociationController;
    
    readonly dataSourceController: DataSourceController;
    
    readonly entityController: EntityController;
    
    readonly schemaController: SchemaController;
    
    readonly tableController: TableController;
    
    constructor(executor: Executor) {
        this.associationController = new AssociationController(executor);
        this.dataSourceController = new DataSourceController(executor);
        this.entityController = new EntityController(executor);
        this.schemaController = new SchemaController(executor);
        this.tableController = new TableController(executor);
    }
}