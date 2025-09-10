import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
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

export default function MultiSectionMovieGrid() {
  const [sections, setSections] = useState([]);
  const [episodeArray, setEpisodeArray] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // fetchMedia defined inside component to avoid hoisting/import issues
  const fetchMedia = () => {
    const token = localStorage.getItem("token"); // get JWT token
    return axios
      .get("https://bullet-assignment-backend-1.onrender.com/api/media/list", {
        headers: {
          "x-auth-token": token || "",
        },
      })
      .then((res) => res.data);
  };

  // Using useQuery for fetching data
  const { data, isLoading, isError, error } = useQuery("mediaList", fetchMedia);

  // When data changes, update sections and episode array
  useEffect(() => {
    if (data) {
      setSections(data);

      // Flatten episodes for modal
      const episodes = [];
      data.forEach((section) => {
        section.movies.forEach((movie) => {
          movie.episodes.forEach((ep) => {
            episodes.push({
              ...ep,
              video: ep.video, // assuming backend provides video url here
              title: ep.title,
              description: ep.description,
              movieTitle: movie.title,
            });
          });
        });
      });
      setEpisodeArray(episodes);
    }
  }, [data]);

  let movieIdx = 0;

  if (isLoading)
    return <Typography color="white" align="center" mt={4}>Loading...</Typography>;

  if (isError)
    return (
      <Typography color="error" align="center" mt={4}>
        {error.message}
      </Typography>
    );

  return (
    <div style={{ minHeight: "100vh", background: "#191c23" }}>
      <Header />
      <FeaturedCarousel />
      <div style={{ padding: "24px 16px", maxWidth: 1400, margin: "0 auto" }}>
        {sections.map((section) => (
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
            <Grid container spacing={3} sx={{ width: "100%", margin: 0 }}>
              {section.movies.map((movie) => {
                const currIdx = movieIdx++;
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={movie.title + currIdx} // ensure unique key
                  >
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
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="300"
                        image={movie.image}
                        alt={movie.title}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight={700} color="white" noWrap>
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
        onNext={(newIdx) => setSelectedIdx(newIdx)}
        onPrevious={(newIdx) => setSelectedIdx(newIdx)}
      />
    </div>
  );
}
