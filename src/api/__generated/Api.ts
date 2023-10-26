import type { Executor } from './';

import { AssociationService, ColumnService, ConfigService, DataSourceService, EntityService, EnumService, GenerateService, PackageService, SchemaService, TableService } from './services';

export class Api {
    
    readonly associationService: AssociationService;
    
    readonly columnService: ColumnService;
    
    readonly configService: ConfigService;
    
    readonly dataSourceService: DataSourceService;
    
    readonly entityService: EntityService;
    
    readonly enumService: EnumService;
    
    readonly generateService: GenerateService;
    
    readonly packageService: PackageService;
    
    readonly schemaService: SchemaService;
    
    readonly tableService: TableService;
    
    constructor(executor: Executor) {
        this.associationService = new AssociationService(executor);
        this.columnService = new ColumnService(executor);
        this.configService = new ConfigService(executor);
        this.dataSourceService = new DataSourceService(executor);
        this.entityService = new EntityService(executor);
        this.enumService = new EnumService(executor);
        this.generateService = new GenerateService(executor);
        this.packageService = new PackageService(executor);
        this.schemaService = new SchemaService(executor);
        this.tableService = new TableService(executor);
    }
}