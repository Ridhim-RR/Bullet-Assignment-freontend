import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Header from "./Header";
import FeaturedCarousel from "./FeaturedCarousel";
import EpisodePlayerModal from "./EpisodePlayerModal";
import { useState } from "react";

// Movie sections data
const sections = [
  {
    title: "Hindi",
    movies: [
      {
        title: "Andhadhun",
        image: "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg",
        year: 2018,
        rating: 8.2,
      },
      {
        title: "Article 15",
        image: "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg",
        year: 2019,
        rating: 8.0,
      },
      {
        title: "Gully Boy",
        image: "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg",
        year: 2019,
        rating: 8.0,
      },
    ],
  },
  {
    title: "Bengali",
    movies: [
      {
        title: "Drishtikone",
        image: "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg",
        year: 2018,
        rating: 7.6,
      },
      {
        title: "Bela Seshe",
        image: "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg",
        year: 2015,
        rating: 8.1,
      },
      {
        title: "Rajkahini",
        image: "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg",
        year: 2015,
        rating: 7.6,
      },
    ],
  },
];

// Flatten all movies to build a full episode array for the player modal
const episodeArray = sections.flatMap(section =>
  section.movies.map(movie => ({
    ...movie,
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", // Replace with real episode URLs
    description: `${movie.title} - Sample Episode Description`,
  }))
);

export default function MultiSectionMovieGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0); // Start at index 0

  // Track the running movie index as we render cards
  let movieIdx = 0;

  return (
    <div style={{ minHeight: "100vh", background: "#191c23" }}>
      <Header />
      <FeaturedCarousel />
      <div style={{ padding: "24px 100px" }}>
        {sections.map(section => (
          <Box key={section.title} mb={7}>
            <Typography
              variant="h4"
              component="h2"
              color="white"
              fontWeight={700}
              mb={3}
            >
              {section.title} Movies
            </Typography>
            <Grid container spacing={4} sx={{ width: "100%", margin: 0 }}>
              {section.movies.map(movie => {
                const currIdx = movieIdx++; // Track absolute index for modal
                return (
                  <Grid item xs={12} sm={6} md={3} key={movie.title}>
                    <Card
                      onClick={() => {
                        setSelectedIdx(currIdx);
                        setModalOpen(true);
                      }}
                      sx={{
                        bgcolor: "#23293A",
                        borderRadius: 4,
                        boxShadow: 4,
                        color: "white",
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 8,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="340"
                        image={movie.image}
                        alt={movie.title}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography variant="h6" fontWeight={700} color="white">
                          {movie.title}
                        </Typography>
                        <Typography variant="body2" color="gray">
                          {movie.year}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="gold"
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <StarIcon sx={{ mr: 1, color: "gold" }} />
                          {movie.rating}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}
      </div>
      <EpisodePlayerModal
        open={modalOpen}
        episodes={episodeArray}
        currentIdx={selectedIdx}
        onClose={() => setModalOpen(false)}
        onNext={newIdx => setSelectedIdx(newIdx)}
        onPrevious={newIdx => setSelectedIdx(newIdx)}
      />
    </div>
  );
}

// open,
//   episodes,
//   currentIdx,
//   onClose,
//   onNext,
//   onPrevious,