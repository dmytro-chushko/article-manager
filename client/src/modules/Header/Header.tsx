import { Box } from '@mui/material';

import { AdminAuth } from '../AdminAuth';

export const Header = () => {
  return (
    <Box py={2}>
      <AdminAuth />
    </Box>
  );
};
