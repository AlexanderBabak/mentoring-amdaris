import { ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler, useCallback, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, InputBase, SxProps } from "@mui/material";

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  value?: string;
  wrapperSx?: SxProps;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder, onSearch, value, wrapperSx }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleClearClick: MouseEventHandler = useCallback(() => {
    setInputValue("");
  }, []);

  const handleSearchClick: MouseEventHandler = useCallback(() => onSearch(inputValue), [inputValue, onSearch]);

  const handleSearchKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (inputValue) {
          onSearch(inputValue);
        }
      }

      if (event.key === "Escape") {
        setInputValue("");
      }
    },
    [inputValue, onSearch],
  );

  return (
    <Box component="form" display="flex" gap={1} alignItems="center">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: 1,
          borderColor: (theme) => theme.palette.grey[200],
          backgroundColor: (theme) => theme.palette.common.white,
          px: 1,
          py: 0.5,
          borderRadius: 1,
          flex: 1,
          ...wrapperSx,
        }}
      >
        <SearchIcon sx={{ color: (theme) => theme.palette.grey[200] }} />

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder || "Search"}
          value={inputValue}
          inputProps={{
            "aria-label": "Search input",
            onKeyDown: handleSearchKeyDown,
          }}
          onChange={handleValueChange}
          data-testid="search-input"
        />
        {inputValue && (
          <IconButton
            type="button"
            color="primary"
            size="small"
            sx={{ p: 0 }}
            aria-label="Clear search text"
            onClick={handleClearClick}
            data-testid="search-input-clear-button"
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>

      <Button
        color="primary"
        variant="contained"
        sx={{
          px: 2.5,
          py: 1.25,
        }}
        aria-label="Search action"
        onClick={handleSearchClick}
        data-testid="search-input-submit-button"
        disabled={!inputValue}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
