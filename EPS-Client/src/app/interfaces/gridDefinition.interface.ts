import { Type } from '../enums/type.enum';

export interface GridDefinition {
    header: string;
    field: string;
    bindingType : Type
    center: boolean
    width: number
    editable: boolean
    toolTip: string
}
