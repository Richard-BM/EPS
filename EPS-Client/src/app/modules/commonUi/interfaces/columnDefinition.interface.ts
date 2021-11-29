import { ColumnDisplayType } from '../enums/columnDisplayType.enum';
import { ColumnFilterType } from '../enums/columnFilterType.enum';
import { FilterItem } from './filterItem';

export interface ColumnDefinition {
    header: string;
    field: string;
    displayType: ColumnDisplayType,
    filterType: ColumnFilterType
    center: boolean
    width: number
    editable: boolean
    toolTip: string
    filterItems?: FilterItem[],
    showStatusBadge?: boolean
    cellEditablePredicate?: (displayObject) => boolean;
    cellNotEditableTooltip?: string,
    mandatory?: boolean
}
