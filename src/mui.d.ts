import { Dispatch, SetStateAction } from "react";
import { WorkflowItemStatus } from "features/common/types/workflowItemStatus";
import { WorkspaceSia } from "features/stockleysInteractionsAlerts/types";
import { menuItemsToTabsMap } from "features/stockleysInteractionsAlerts/ui/templates/StockleysInteractionsAlertsWorkspace/WorkspaceHeader/WorkspaceHeader";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    blue: string;
    limeGreen: string;
    blueWashed: string;
    error: string;
    yellow: string;
    lightYellow: string;
    cyanMist: string;
    coolMint: string;
    beige: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    control: true;
  }
}

declare module "@mui/x-data-grid-premium" {
  interface ToolbarPropsOverrides {
    handleAddBlankRow?: () => void;
    enableActionButtons: boolean;
    handleRemoveSia: () => void;
    handleMoveToAction?: (itemKey: keyof typeof menuItemsToTabsMap) => void;
    isLoading: boolean;
    isBulkPasteMode?: boolean;
    handleBulkPasteModeChange?: (checked: boolean) => void;
    hideDiffs?: boolean;
    handleHideDiffsChange?: (checked: boolean) => void;
    hideOtherStatuses: boolean;
    handleHideOtherStatusesChange: Dispatch<SetStateAction<boolean>>;
  }

  interface NoRowsOverlayPropsOverrides {
    error: string;
    noRowsMessage: string;
  }

  interface CellPropsOverrides {
    rows: WorkspaceSia[];
    expectedStatus: WorkflowItemStatus;
  }
}
