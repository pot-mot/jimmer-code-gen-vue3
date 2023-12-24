import type { Executor } from './';

import { AssociationService, ColumnDefaultService, ColumnService, ConfigService, DataSourceService, EntityService, EnumService, GenerateService, JDBCService, ModelService, PackageService, SchemaService, TableService, TypeMappingService } from './services';

export class Api {
    
    readonly associationService: AssociationService;
    
    readonly columnDefaultService: ColumnDefaultService;
    
    readonly columnService: ColumnService;
    
    readonly configService: ConfigService;
    
    readonly dataSourceService: DataSourceService;
    
    readonly entityService: EntityService;
    
    readonly enumService: EnumService;
    
    readonly generateService: GenerateService;
    
    readonly jdbcservice: JDBCService;
    
    readonly modelService: ModelService;
    
    readonly packageService: PackageService;
    
    readonly schemaService: SchemaService;
    
    readonly tableService: TableService;
    
    readonly typeMappingService: TypeMappingService;
    
    constructor(executor: Executor) {
        this.associationService = new AssociationService(executor);
        this.columnDefaultService = new ColumnDefaultService(executor);
        this.columnService = new ColumnService(executor);
        this.configService = new ConfigService(executor);
        this.dataSourceService = new DataSourceService(executor);
        this.entityService = new EntityService(executor);
        this.enumService = new EnumService(executor);
        this.generateService = new GenerateService(executor);
        this.jdbcservice = new JDBCService(executor);
        this.modelService = new ModelService(executor);
        this.packageService = new PackageService(executor);
        this.schemaService = new SchemaService(executor);
        this.tableService = new TableService(executor);
        this.typeMappingService = new TypeMappingService(executor);
    }
}