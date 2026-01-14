import {describe, beforeEach, it, expect, vitest} from 'vitest'
import {type BatchCommandData, type CommandDefinition, type CommandHistory, useCommandHistory} from '@/history/commandHistory';

describe('useCommandHistory', () => {
    type TestCommandMap = {
        testCommand: CommandDefinition<{ value: number }>
    }

    let history: CommandHistory<TestCommandMap>;

    beforeEach(() => {
        history = useCommandHistory<TestCommandMap>();
    });

    describe('registerCommand', () => {
        it('registers a command with apply and revert actions', () => {
            const applyMock = vitest.fn();
            const revertMock = vitest.fn();
            history.registerCommand('testCommand', {
                applyAction: applyMock,
                revertAction: revertMock,
            });

            expect(history.__clone_view__.getCommandMap().size).toEqual(1);
            expect(history.__clone_view__.getCommandMap().get('testCommand')?.key).toEqual('testCommand');
        });
    });

    describe('executeCommand', () => {
        it('executes command and pushes to undo stack', () => {
            const applyMock = vitest.fn();
            const revertMock = vitest.fn();
            history.registerCommand('testCommand', {
                applyAction: applyMock,
                revertAction: revertMock,
            });

            history.executeCommand('testCommand', {value: 10});

            expect(applyMock).toHaveBeenCalled();
            expect(history.__clone_view__.getUndoStack()).toHaveLength(1);
        });
    });

    describe('undo and redo', () => {
        it('undoes command and moves to redo stack', () => {
            const applyMock = vitest.fn();
            const revertMock = vitest.fn();
            history.registerCommand('testCommand', {
                applyAction: applyMock,
                revertAction: revertMock,
            });

            history.executeCommand('testCommand', {value: 20});
            history.undo();

            expect(revertMock).toHaveBeenCalled();
            expect(history.__clone_view__.getUndoStack()).toHaveLength(0);
            expect(history.__clone_view__.getRedoStack()).toHaveLength(1);

            history.redo();
            expect(applyMock).toHaveBeenCalledTimes(2);
            expect(history.__clone_view__.getRedoStack()).toHaveLength(0);
        });
    });

    describe('batch operations', () => {
        it('executes commands in batch', () => {
            const applyMock = vitest.fn();
            const revertMock = vitest.fn();
            history.registerCommand('testCommand', {
                applyAction: applyMock,
                revertAction: revertMock,
            });

            const batchKey = Symbol('batch');

            history.startBatch(batchKey);
            history.executeCommand('testCommand', {value: 30});
            history.executeCommand('testCommand', {value: 40});
            history.stopBatch(batchKey);

            expect(history.__clone_view__.getUndoStack()[0]).toBeInstanceOf(Array); // 验证批量命令类型
            expect(history.__clone_view__.getUndoStack()[0]).toHaveLength(2);

            history.undo();

            expect(revertMock).toHaveBeenCalled();
            expect(history.__clone_view__.getRedoStack()[0]).toBeInstanceOf(Array);
            expect(history.__clone_view__.getRedoStack()[0]).toHaveLength(2);
        });

        it('throws error on mismatched batch key', () => {
            const batchKey1 = Symbol('batch1');
            history.startBatch(batchKey1);

            expect(() => history.stopBatch(Symbol('invalid'))).toThrow('stopBatch key is not match');
        });
    });

    describe('nested batches', () => {
        it('handles nested batch operations', () => {
            const applyMock = vitest.fn();
            const revertMock = vitest.fn();
            history.registerCommand('testCommand', {
                applyAction: applyMock,
                revertAction: revertMock,
            });

            const outerBatch = Symbol('outer');
            const innerBatch = Symbol('inner');

            history.executeBatch(outerBatch, () => {
                history.executeCommand('testCommand', {value: 1});

                history.executeBatch(innerBatch, () => {
                    history.executeCommand('testCommand', {value: 2});

                    expect(history.__clone_view__.getBatchKeyStack()).toHaveLength(2);
                })

                history.executeCommand('testCommand', {value: 1});

                expect(history.__clone_view__.getBatchKeyStack()).toHaveLength(1);
            })

            expect(history.__clone_view__.getUndoStack()[0]).toHaveLength(3);
            expect((history.__clone_view__.getUndoStack()[0] as BatchCommandData<TestCommandMap>)[1]).toHaveLength(1);

            history.undo()

            expect(history.__clone_view__.getRedoStack()[0]).toHaveLength(3);
            expect((history.__clone_view__.getRedoStack()[0] as BatchCommandData<TestCommandMap>)[1]).toHaveLength(1);

            history.redo()

            expect(history.__clone_view__.getUndoStack()[0]).toHaveLength(3);
            expect((history.__clone_view__.getUndoStack()[0] as BatchCommandData<TestCommandMap>)[1]).toHaveLength(1);
        });
    });

    it('execute nested apply and revert', () => {
        const history = useCommandHistory<{
            testCommand1: CommandDefinition<string>,
            testCommand2: CommandDefinition<string>,
        }>();

        history.registerCommand('testCommand1', {
            applyAction: (value) => {
                return value
            },
            revertAction: (_) => {

            },
        });

        history.registerCommand('testCommand2', {
            applyAction: (value) => {
                history.executeCommand('testCommand1', value)
                return value
            },
            revertAction: (value) => {
                history.executeCommand('testCommand1', value)
            },
        });

        expect(() => history.executeCommand('testCommand2', 'test')).toThrow("Execution does not allow nesting")
    });

    it('execute nested undo and redo', () => {
        const history = useCommandHistory<{
            testCommand1: CommandDefinition<string>,
            testCommand2: CommandDefinition<string>,
        }>();

        history.registerCommand('testCommand1', {
            applyAction: (value) => {
                return value
            },
            revertAction: (_) => {

            },
        });

        history.registerCommand('testCommand2', {
            applyAction: (value) => {
                history.undo()
                return value
            },
            revertAction: (_) => {
                history.redo()
            },
        });

        expect(() => history.executeCommand('testCommand2', 'test')).toThrow("Execution does not allow nesting")
    });
});
