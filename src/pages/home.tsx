import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const theme = useTheme(); // Obtém o tema atual (Light ou Dark)

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "center",
          mt: 15,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper", // Usa a cor de fundo do tema
          color: "text.primary", // Usa a cor do texto do tema
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Bem-vindo à Ótica Cristã 👓✨
        </Typography>
        <Typography variant="body1" color="secondary" paragraph>
          Enxergue o mundo com mais clareza! Aqui você encontra os melhores óculos e lentes para o seu dia a dia.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main, // Usa a cor primária do tema
            color: theme.palette.primary.contrastText, // Mantém contraste do texto
            "&:hover": { bgcolor: theme.palette.primary.dark }, // Cor no hover
          }}
          component={Link}
          to="/produtos"
        >
          Conheça nossos produtos
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
