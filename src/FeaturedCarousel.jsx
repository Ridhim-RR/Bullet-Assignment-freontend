import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";

// Sample featured titles (replace with your data)
const featuredTitles = [
  {
    title: "The Walking Dead",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    description:
      "A Heaps prisoner makes a discovery. Rick and Morgan find themselves in the company of strangers.",
    rating: 7.5,
    duration: "51m",
    season: 8,
    episode: 14,
  },
  {
    title: "The Walking Dead",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    description:
      "A Heaps prisoner makes a discovery. Rick and Morgan find themselves in the company of strangers.",
    rating: 7.5,
    duration: "51m",
    season: 8,
    episode: 14,
  },
  {
    title: "The Walking Dead",
    image:
      "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg",
    description:
      "A Heaps prisoner makes a discovery. Rick and Morgan find themselves in the company of strangers.",
    rating: 7.5,
    duration: "51m",
    season: 8,
    episode: 14,
  },
  // Add 3-4 more featured titles here
];

export default function FeaturedCarousel() {
  return (
    <Box sx={{ width: "100vw", minHeight: "64vh", background: "#121212" }}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {featuredTitles.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "64vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                background: `linear-gradient(to right, rgba(18,18,18,0.93) 46%, rgba(18,18,18,0.8) 76%, rgba(18,18,18,0) 100%), url(${item.image}) center/cover no-repeat`,
                p: 8,
              }}
            >
              <Box sx={{ maxWidth: "540px", zIndex: 2 }}>
                <Typography color="white" mb={1} fontWeight={500} fontSize={15}>
                  Duration: {item.duration}
                </Typography>
                <Box mb={2} sx={{ color: "white", fontSize: 17 }}>
                  <StarIcon sx={{ color: "#FFC856", mr: 1 }} />
                  {item.rating}
                  <span style={{ marginLeft: 24 }}>
                    Season <b style={{ color: "#FE466B" }}>{item.season}</b>
                  </span>
                  <span style={{ marginLeft: 8 }}>
                    - Episode <b style={{ color: "#FE466B" }}>{item.episode}</b>
                  </span>
                </Box>
                <Typography color="white" fontWeight={900} fontSize={46} mb={3}>
                  {item.title}
                </Typography>
                <Typography color="white" mb={3} fontSize={17}>
                  {item.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(90deg,#FE466B 0%, #FFC856 100%)",
                      color: "white",
                      fontWeight: 700,
                      px: 4,
                      borderRadius: 6,
                      fontSize: 18,
                      boxShadow: "0 0 18px #FE466B88",
                      textTransform: "none",
                    }}
                  >
                    ▶ WATCH
                  </Button>
                  {/* <Button
                    variant="contained"
                    sx={{
                      background: "#23293A",
                      color: "white",
                      fontWeight: 700,
                      px: 3,
                      borderRadius: 6,
                      fontSize: 18,
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": { background: "#252A3C" },
                    }}
                    startIcon={<AddIcon />}
                  >
                    ADD LIST
                  </Button> */}
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
