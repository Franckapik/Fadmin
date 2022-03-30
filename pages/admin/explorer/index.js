import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";
import Cloud from "../../../components/cloud";

const Explorer = () => {
  return (
    <Layout_Admin>
      <Cloud></Cloud>
    </Layout_Admin>
  );
};

export default Explorer;
