import { FC } from 'react';
import { colorScale } from '@orca/util';
import { Box } from '@mui/material';

export const ColorBar: FC = () => {
  return (
    <div>
      {[...Array(100)].map((val, index) => {
        return (
          <Box
            display="inline-block"
            component="span"
            width="1%"
            height={20}
            bgcolor={colorScale(index, 0, 100)}
          ></Box>
        );
      })}
    </div>
  );
};
