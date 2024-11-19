import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Link as BreadcrumbLink } from "react-router-dom";

export default function MUIBreadCrumbs({ page }) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" sx={{ color: "lightgrey" }}>
          <BreadcrumbLink
            style={{
              color: "lightgrey",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            to="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </BreadcrumbLink>
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
