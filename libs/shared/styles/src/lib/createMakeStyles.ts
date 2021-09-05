import { createMakeStyles } from 'tss-react';
import { useTheme } from '@mui/material';

// material-ui users can pass in useTheme imported like: import { useTheme } from "@material-ui/core/styles";
// material-ui v5 users will also need to pass a custom emotion cache, read later.
export const { makeStyles } = createMakeStyles({ useTheme });
