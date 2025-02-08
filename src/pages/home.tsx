import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bem-vindo à Ótica Cristã 👓✨
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Enxergue o mundo com mais clareza! Aqui você encontra os melhores óculos e lentes para o seu dia a dia.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/produtos">
          Conheça nossos produtos
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
