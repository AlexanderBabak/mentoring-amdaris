import { PropsWithChildren, createContext, useCallback, useContext, useState } from "react";
import Snackbar, { SnackbarProps } from "features/common/ui/molecules/Snackbar/Snackbar";

export interface OpenSnackbarArgs extends Omit<SnackbarProps, "onClose" | "open"> {}

export interface SnackbarContextType {
  openSnackbar: (props: OpenSnackbarArgs) => void;
  closeSnackbar: () => void;
}

export const SnackbarContext = createContext({} as SnackbarContextType);

export const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState<OpenSnackbarArgs | undefined>();

  const openSnackbar = useCallback((args: OpenSnackbarArgs) => {
    setOpen(true);
    setSnackbarProps(args);
  }, []);

  const closeSnackbar = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}

      {snackbarProps && <Snackbar {...snackbarProps} onClose={closeSnackbar} open={open} />}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
