import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CommentModal = (prop) => {
  const handleClose = () => {
    prop.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={prop.open}
        onClose={prop.setOpen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        overlayStyle={{ backgroundColor: "transparent" }}
        sx={{
          ".MuiPaper-root": {
            width: "600px",
          },
        }}
      >
        <DialogTitle>Comments</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: "0.5rem" }}>{prop.children}</Box>
        </DialogContent>
        <DialogActions>
          <Button size="medium" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentModal;