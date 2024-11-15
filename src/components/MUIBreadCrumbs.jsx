import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";

export default function MUIBreadCrumbs({ page }) {
  function handleClick() {
    console.log("breadcrumb clicked");
  }

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center", color: "lightgrey" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "lightgrey",
          }}
        >
          {page}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
