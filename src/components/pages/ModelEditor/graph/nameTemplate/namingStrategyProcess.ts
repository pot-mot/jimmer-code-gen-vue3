import {DatabaseNamingStrategyType} from "@/api/__generated/model/enums";

export const processNamingStrategy = (name: string, namingStrategy: DatabaseNamingStrategyType) => {
    switch (namingStrategy) {
        case "LOWER_CASE":
            return name.toLowerCase()
        case "UPPER_CASE":
            return name.toUpperCase()
        case "RAW":
            return name
    }
}