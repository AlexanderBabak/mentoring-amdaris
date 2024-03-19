import { PropsWithChildren, createContext, useCallback, useContext, useState } from "react";
import CustomDialog, { CustomDialogProps } from "features/common/ui/organisms/CustomDialog/CustomDialog";

export interface OpenDialogArgs extends Omit<CustomDialogProps, "onClose" | "open"> {}

export interface DialogContextType {
  openDialog: (props: OpenDialogArgs) => void;
  closeDialog: () => void;
}

export const CustomDialogContext = createContext({} as DialogContextType);

export const CustomDialogProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const [dialogProps, setDialogProps] = useState<Omit<CustomDialogProps, "onClose">>({
    open: false,
    title: "",
  });

  const openDialog = useCallback(
    (props: Omit<CustomDialogProps, "onClose" | "open">) => setDialogProps({ ...props, open: true }),
    [],
  );

  const closeDialog = useCallback(() => setDialogProps((prevState) => ({ ...prevState, open: false })), []);

  return (
    <CustomDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      <CustomDialog {...dialogProps} onClose={closeDialog} />
    </CustomDialogContext.Provider>
  );
};

const useCustomDialog = () => useContext(CustomDialogContext);

export default useCustomDialog;
