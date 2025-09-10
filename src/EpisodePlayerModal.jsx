import React, { useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function EpisodePlayerModal({
  open,
  episodes,
  currentIdx,
  onClose,
  onNext,
  onPrevious,
}) {
  // Move hooks BEFORE any conditional returns
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && episodes && episodes.length > 0) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIdx, episodes]);

  // Now do your conditional return safely
  if (!episodes || episodes.length === 0) return null;

  const { video, title, description } = episodes[currentIdx];

  return (
    <Modal open={open} onClose={onClose}>
      {/* ... rest of your component ... */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(17,28,35,0.98)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "95vw", md: 400 },
            height: { xs: "90vh", md: 700 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            overflow: "hidden",
            background: "#191c23",
            boxShadow: 6,
          }}
        >
          <video
            ref={videoRef}
            src={video}
            controls
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "inherit",
              background: "#23293A",
              aspectRatio: "9/16",
            }}
          />
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 11,
              right: 11,
              color: "#fff",
              bgcolor: "#23293A",
              "&:hover": { bgcolor: "#FE466B" },
              zIndex: 2,
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography color="white" mt={2} mb={1} fontWeight={700} fontSize={22}>
          {title}
        </Typography>
        <Typography
          color="white"
          mb={2}
          fontSize={17}
          sx={{ textAlign: "center" }}
        >
          {description}
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            disabled={currentIdx === 0}
            onClick={() => onPrevious(currentIdx - 1)}
            sx={{
              bgcolor: "#23293A",
              color: "white",
              fontWeight: 700,
              "&:hover": { bgcolor: "#FE466B" },
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            disabled={currentIdx === episodes.length - 1}
            onClick={() => onNext(currentIdx + 1)}
            sx={{
              bgcolor: "#23293A",
              color: "white",
              fontWeight: 700,
              "&:hover": { bgcolor: "#FE466B" },
            }}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
