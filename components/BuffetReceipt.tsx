import React, { useRef } from 'react';
import { Box, Typography, Divider, Grid, Button } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

export type ReceiptData = {
    menuTier?:string,
    startTime?:string,
    endTime?:string,
    customerCount?:string,
    cost?:string,
    time?: string
};
type BuffetReceiptProps = {
    data:ReceiptData
    
}

const BuffetReceiptContent = React.forwardRef<HTMLDivElement, BuffetReceiptProps>(
  ({data}, ref) => {
    const now = 'new Date().toLocaleString()';

    return (
        <Box
        ref={ref}
        sx={{
          p: 2,
          width: '80mm', // or a fixed px like '300px'
          fontFamily: 'monospace',
          '@media print': {
            width: '80mm',
            boxShadow: 'none',
            margin: 0,
            transform: 'scale(2)',
            transformOrigin: 'top left',
          },
        }}
      >
        <Typography variant="h6" align="center" fontWeight="bold">
          Buffet POS
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          {now}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}><Typography variant="body2">Tier:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">{data.menuTier}</Typography></Grid>

          <Grid item xs={6}><Typography variant="body2">Start Time:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">{data.startTime}</Typography></Grid>

          <Grid item xs={6}><Typography variant="body2">End Time:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">{data.endTime}</Typography></Grid>

          <Grid item xs={6}><Typography variant="body2">Customer Count:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">{data.customerCount}</Typography></Grid>

          <Grid item xs={6}><Typography variant="body2">Cost:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">{data.cost}</Typography></Grid>
        </Grid>
          <Divider sx={{ mt: 2 }} />
          <Grid container spacing={2}>
          <Grid item xs={6}><Typography variant="body2">Taxes:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">8%</Typography></Grid>
          </Grid>
          <Grid container spacing={2}>
          <Grid item xs={6}><Typography variant="body2">Total:</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">{data.cost}</Typography></Grid>
          </Grid>
        <Divider sx={{ mt: 2 }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography align="center" variant="caption">Thank you for dining with us!</Typography>
        </div>
      </Box>
    );
  }
);
BuffetReceiptContent.displayName = 'BuffetReceiptContent';


const BuffetReceipt = ({data}:{data:ReceiptData}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (contentRef.current) {
          triggerPrint(); // wrapped with useReactToPrint
        } else {
          setTimeout(() => {
            if (contentRef.current) triggerPrint();
          }, 100); // small delay
        }
      };
      
      const triggerPrint = useReactToPrint({contentRef});
  return (
    <>
      <BuffetReceiptContent ref={contentRef} data={data} />
      <Button variant="contained" onClick={handlePrint} sx={{ mt: 2 }}>
        Print Receipt
      </Button>
    </>
  );
};

export default BuffetReceipt;
