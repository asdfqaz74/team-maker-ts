import { Dialog } from "@mui/material";

export default function PlayerDetail({ open, onClose, player }) {
  console.log("PlayerDetail", player);

  return (
    <Dialog open={open} onClose={onClose} autoFocus>
      <div>
        <p>안녕</p>
      </div>
    </Dialog>
  );
}
