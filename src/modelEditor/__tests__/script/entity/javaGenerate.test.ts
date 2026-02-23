import {describe, it, expect} from 'vitest';
import {javaEntityGenerator} from '@/modelEditor/script/default/EntityGenerator/javaEntityGenerator.ts';
import {testData} from '@/modelEditor/__tests__/case/testData.ts';
import {entityToTable} from '@/modelEditor/TableEntityConvert/entityToTable.ts';
import {pgTableGenerator} from '@/modelEditor/script/default/TableGenerator/pgTableGenerator.ts';
import {testIds} from '@/modelEditor/__tests__/case/testIds.ts';
import {getArrayFromMap} from '@/utils/map/getArrayFromMap.ts';

describe('javaEntityGenerator', () => {
    const context = testData.CONTEXT_JAVA;

    const validateResult = (
        files: Record<string, string>,
        expectedFiles: Record<string, string>,
    ) => {
        expect(files).toEqual(expectedFiles);
    };

    it('base', () => {
        const filterIds = new Set([testIds.ENTITY_base]);
        const filterEntities = getArrayFromMap(context.entityMap, filterIds);

        for (const entity of filterEntities) {
            const entityFiles = javaEntityGenerator(entity, context);
            validateResult(entityFiles, {});
        }

        const allEntities = Array.from(context.entityMap.values());
        const {tables, midTables} = entityToTable(filterEntities, allEntities, context);
        const allTables = [...tables, ...midTables];
        const tableFiles = pgTableGenerator(allTables, context);
        validateResult(tableFiles, {});
    });

    it('association singleColumn fk', () => {
        const filterIds = new Set([
            testIds.ENTITY_OneToOne_source,
            testIds.ENTITY_ManyToOne_source,
        ]);
        const filterEntities = getArrayFromMap(context.entityMap, filterIds);

        for (const entity of filterEntities) {
            const entityFiles = javaEntityGenerator(entity, context);
            for (const filePath in entityFiles) {
                console.log(filePath);
                console.log(entityFiles[filePath]);
            }
        }

        const allEntities = Array.from(context.entityMap.values());
        const {tables, midTables} = entityToTable(filterEntities, allEntities, context);
        const allTables = [...tables, ...midTables];
        const tableFiles = pgTableGenerator(allTables, context);
        for (const filePath in tableFiles) {
            console.log(filePath);
            console.log(tableFiles[filePath]);
        }
    });

    it('association singleColumn midTable', () => {
        const filterIds = new Set([
            testIds.ENTITY_OneToOne_source_midTable,
            testIds.ENTITY_ManyToOne_source_midTable,
            testIds.ENTITY_ManyToMany_source,
        ]);
        const filterEntities = getArrayFromMap(context.entityMap, filterIds);

        for (const entity of filterEntities) {
            const entityFiles = javaEntityGenerator(entity, context);
            for (const filePath in entityFiles) {
                console.log(filePath);
                console.log(entityFiles[filePath]);
            }
        }

        const allEntities = Array.from(context.entityMap.values());
        const {tables, midTables} = entityToTable(filterEntities, allEntities, context);
        const allTables = [...tables, ...midTables];
        const tableFiles = pgTableGenerator(allTables, context);
        for (const filePath in tableFiles) {
            console.log(filePath);
            console.log(tableFiles[filePath]);
        }
    });
});
