import { Grid, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  HatenaIcon,
  LineIcon,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const URL = `${process.env.NEXT_PUBLIC_SELF_URL}`;
const QUOTE = '共有するときのメッセージ';

const ShareButton = ({onClose}:any) => {
    const handleClose = onClose
    const iconSize = 36;

  return (
    <div className="popup">
<Grid container spacing={2} style={{ textAlign: "center" }} >
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "bold" }}>共有する</p>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }} >
        <FacebookShareButton url={URL} quote={QUOTE}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <TwitterShareButton url={URL} title={QUOTE}>
          <TwitterIcon size={iconSize} round />
        </TwitterShareButton>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <LineShareButton url={URL} title={QUOTE}>
          <LineIcon size={iconSize} round />
        </LineShareButton>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <HatenaShareButton
          url={URL}
          title={QUOTE}
          windowWidth={660}
          windowHeight={460}
        >
          <HatenaIcon size={iconSize} round />
        </HatenaShareButton>
      </Grid>

      <Grid item xs={12} style={{ textAlign: "center" }}>
      <div className="popup-close-button">
        <IconButton onClick={handleClose} >
          <CloseIcon fontSize="large"/>
        </IconButton>
      </div>
      </Grid>
    </Grid>
    </div>
  );
}

export default ShareButton;
