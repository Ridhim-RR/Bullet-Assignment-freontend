import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Dashboard({ logout }) {
  return (
    <div style={{ background: "#151a23", minHeight: "100vh", padding: "40px", color: "white" }}>
      <Typography variant="h3" mb={2}>Dashboard (Private)</Typography>
      <Button variant="contained" color="secondary" onClick={logout}>Sign Out</Button>
    </div>
  );
}
