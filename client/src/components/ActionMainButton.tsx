import { Box, Button } from '@mui/material'

export const ActionMainButton = (props: { onClick: (e: any) => void, title: string }) => {
  const { onClick, title } = props;

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Button
        variant="contained"
        onClick={onClick}
        style={{ marginTop: '1rem' }}
      >
        { title }
      </Button>
    </Box>
  );
}
