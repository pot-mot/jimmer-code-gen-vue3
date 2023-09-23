import type { Executor } from './';

import { AssociationService, ColumnService, DataSourceService, EntityService, SchemaService, TableService } from './services';

export class Api {
    
    readonly associationService: AssociationService;
    
    readonly columnService: ColumnService;
    
    readonly dataSourceService: DataSourceService;
    
    readonly entityService: EntityService;
    
    readonly schemaService: SchemaService;
    
    readonly tableService: TableService;
    
    constructor(executor: Executor) {
        this.associationService = new AssociationService(executor);
        this.columnService = new ColumnService(executor);
        this.dataSourceService = new DataSourceService(executor);
        this.entityService = new EntityService(executor);
        this.schemaService = new SchemaService(executor);
        this.tableService = new TableService(executor);
    }
}