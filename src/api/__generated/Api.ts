import type {Executor} from './';
import {
    AssociationService, 
    ColumnDefaultService, 
    ColumnService, 
    ConfigService, 
    ConvertService, 
    DataSourceService, 
    EntityService, 
    EnumService, 
    JdbcService, 
    ModelService, 
    PreviewService, 
    SchemaService, 
    TableService, 
    TypeMappingService
} from './services/';

export class Api {
    
    readonly associationService: AssociationService
    
    readonly columnDefaultService: ColumnDefaultService
    
    readonly columnService: ColumnService
    
    readonly configService: ConfigService
    
    readonly convertService: ConvertService
    
    readonly dataSourceService: DataSourceService
    
    readonly entityService: EntityService
    
    readonly enumService: EnumService
    
    readonly jdbcService: JdbcService
    
    readonly modelService: ModelService
    
    readonly previewService: PreviewService
    
    readonly schemaService: SchemaService
    
    readonly tableService: TableService
    
    readonly typeMappingService: TypeMappingService
    
    constructor(executor: Executor) {
        this.associationService = new AssociationService(executor);
        this.columnDefaultService = new ColumnDefaultService(executor);
        this.columnService = new ColumnService(executor);
        this.configService = new ConfigService(executor);
        this.convertService = new ConvertService(executor);
        this.dataSourceService = new DataSourceService(executor);
        this.entityService = new EntityService(executor);
        this.enumService = new EnumService(executor);
        this.jdbcService = new JdbcService(executor);
        this.modelService = new ModelService(executor);
        this.previewService = new PreviewService(executor);
        this.schemaService = new SchemaService(executor);
        this.tableService = new TableService(executor);
        this.typeMappingService = new TypeMappingService(executor);
    }
}