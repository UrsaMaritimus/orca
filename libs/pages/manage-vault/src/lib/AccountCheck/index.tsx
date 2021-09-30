import { forwardRef, useState, FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
// material
import {
  Slide,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { useUpdateAccount, accountState } from './atom';
import { StepperProps } from '../stepper.type';
import { BigNumber } from 'ethers';

// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AccountDialog: FC<StepperProps> = ({
  vaultInfo,
  vaultID,
  token,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // Check if should be open or not
  const updateAccount = useUpdateAccount();
  const account = useRecoilValue(accountState);

  useEffect(() => {
    const bank = account[token];
    if (bank) {
      const accountInfo = account[token].filter(
        (val) => val.vaultID === vaultID
      )[0];
      if (
        accountInfo &&
        accountInfo.collateral &&
        !BigNumber.from(accountInfo.collateral).isZero()
      ) {
        const closingFee = BigNumber.from(accountInfo.debt)
          .mul(vaultInfo.closingFee)
          .mul(vaultInfo.peg)
          .div(vaultInfo.tokenPrice.mul(10000));

        if (
          vaultInfo.collateral.add(closingFee).lt(accountInfo.collateral) &&
          vaultInfo.debt.lt(accountInfo.debt)
        ) {
          setOpen(true);
        }
      }
    }
    updateAccount(token, {
      collateral: vaultInfo.collateral,
      debt: vaultInfo.debt,
      vaultID,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaultInfo, token, vaultID]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Vault Possibly Liquidated
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            It appears your collateral has lowered, which means you were likely
            liquidated! This means half your debt was paid off in exchange for
            the equivalent amount of your collateral, along with a 10% fee.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Acknowledge
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
