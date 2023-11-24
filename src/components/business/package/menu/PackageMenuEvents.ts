import {MenuEventBusProps} from "@/components/global/menu/MenuEventBusProps.ts";
import {GenPackagePathInput} from "@/api/__generated/model/static";

export type PackageMenuEvents = {
    dragStart: { id: number, type: 'Package' | 'Entity' | 'Enum' },
    dragEnd: undefined,
    updatePackage: { packageId: number, id: number, type: 'Package' | 'Entity' | 'Enum' },
    createPackage: GenPackagePathInput,
    deletePackage: { id: number },
}

export interface PackageMenuEventsProps extends MenuEventBusProps<PackageMenuEvents> {}