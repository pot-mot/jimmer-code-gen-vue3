import type { Executor } from './';

import { AssociationController, DataSourceController, EntityController, TableController } from './services';

export class Api {
    
    readonly associationController: AssociationController;
    
    readonly dataSourceController: DataSourceController;
    
    readonly entityController: EntityController;
    
    readonly tableController: TableController;
    
    constructor(executor: Executor) {
        this.associationController = new AssociationController(executor);
        this.dataSourceController = new DataSourceController(executor);
        this.entityController = new EntityController(executor);
        this.tableController = new TableController(executor);
    }
}