import {KeyValue} from "@antv/x6";
import {History} from "@antv/x6-plugin-history";

export type CustomCommandMap = { [key: string]: KeyValue }

type CustomHistoryCommand<CommandMap extends CustomCommandMap, Key extends keyof CommandMap> = {
    key: Key
    applyAction: (options: CommandMap[Key]) => void
    revertAction: (options: CommandMap[Key]) => void
}

type CustomHistoryCommandData<CommandMap extends CustomCommandMap, Key extends keyof CommandMap> = {
    customCommandKey: Key
    customCommandArgs: CommandMap[Key]
}

type CustomHistoryCommandMap<CommandMap extends CustomCommandMap> = {
    [Key in keyof CommandMap]: CustomHistoryCommand<CommandMap, Key>;
}

type CustomHistoryOption<CommandMap extends CustomCommandMap, Key extends keyof CommandMap> =
    Omit<CustomHistoryCommand<CommandMap, Key>, 'key'>

export class CustomHistory<CommandMap extends CustomCommandMap> extends History {
    protected customHistoryCommandMap: CustomHistoryCommandMap<CommandMap> = {} as CustomHistoryCommandMap<CommandMap>

    public registerCommand<Key extends keyof CommandMap>(
        key: Key,
        options: CustomHistoryOption<CommandMap, Key>
    ) {
        this.customHistoryCommandMap[key] = {key, ...options}
    }

    public pushCommand<Key extends keyof CommandMap>(
        customCommandKey: Key,
        customCommandArgs: CommandMap[Key],
    ) {
        const cmd = this.createCommand()
        cmd.data = {customCommandKey, customCommandArgs} as any

        if (this.batchCommands) {
            cmd.batch = true
            this.batchCommands.push(cmd)
        } else {
            this.push(cmd, {})
        }
    }

    protected filterBatchCommand(batchCommands: History.Command[]): History.Command[] {
        const result: History.Command[] = []

        for (const cmd of batchCommands) {
            if (cmd.data && "customCommandKey" in cmd.data && "customCommandArgs" in cmd.data) {
                result.push(cmd)
            }
        }
        result.push(...super.filterBatchCommand(batchCommands))

        return result
    }

    protected executeCommand(cmd: History.Command, revert: boolean, options: KeyValue) {
        if (cmd.data && "customCommandKey" in cmd.data && "customCommandArgs" in cmd.data) {
            const typedData = cmd.data as CustomHistoryCommandData<CommandMap, keyof CommandMap>;

            if (revert) {
                this.customHistoryCommandMap[typedData.customCommandKey]?.revertAction(typedData.customCommandArgs);
            } else {
                this.customHistoryCommandMap[typedData.customCommandKey]?.applyAction(typedData.customCommandArgs);
            }
            return
        }

        super.executeCommand(cmd, revert, options);
    }
}
