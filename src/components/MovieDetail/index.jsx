import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieData } from "../../utils/fetchMovieData";
import { fetchMoviesSeasons } from "../../utils/fetchMoviesSeasons";
import { fetchMoviesCast } from "../../utils/fetchMoviesCast";
import "./movieDetail.scss";
import Spinner from "../Spinner";
import { Markup } from "interweave";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell className="text-row">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={{ color: "#fafafa" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="text-row">
          Temporada Nro {row.number}
        </TableCell>
        <TableCell className="text-row">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          className="text-row"
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Episodios
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-row">Nro</TableCell>
                    <TableCell className="text-row">Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.episodes.map((episodeRow) => (
                    <TableRow key={episodeRow.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="text-row"
                      >
                        {episodeRow.number}
                      </TableCell>
                      <TableCell className="text-row">
                        {episodeRow.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const MovieDetail = () => {
  const { idPelicula } = useParams();
  const [movieData, setMovieData] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [id, setId] = useState({});
  const [actors, setActors] = useState([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await fetchMovieData(idPelicula);
        const res_seasons = await fetchMoviesSeasons(res.id);
        const res_actors = await fetchMoviesCast(res.id);
        console.log(actors, "actors");
        setMovieData(res);
        setActors(res_actors);
        setId(res.id);
        setLoading(false);
        setSeasons(res_seasons);
      } catch (error) {
        setError(error);
      }
    };
    data();
  }, []);

  return (
    <div className="movie-section">
      {!movieData ? (
        <Spinner />
      ) : (
        <>
          <div className="left-section">
            <div className="movie-title">{movieData.name}</div>
            <div className="right-section">
              <img src={movieData.image?.medium} alt={movieData.name} />
            </div>
            <div className="movie-rating">
              <span>
                Rating: <i className="fa fa-star"></i>
                {movieData.rating?.average}
                <Markup content={movieData.summary} />
              </span>
            </div>
            <div className="movie-info">
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  style={{ marginTop: "20px" }}
                >
                  Episodios por temporada
                </Typography>

                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-row" />
                        <TableCell className="text-row">Temporada</TableCell>
                        <TableCell className="text-row">
                          Fecha Emisión
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {seasons.map((season) => (
                        <Row key={season.id} row={season} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  style={{ marginTop: "40px" }}
                >
                  Reparto
                </Typography>

                <TableContainer component={Paper}>
                  <Table aria-label="simple table" sx={{ maxWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-row" />
                        <TableCell className="text-row">Personaje</TableCell>
                        <TableCell className="text-row">Actor</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {actors.map((actor, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-row">
                            <img
                              src={actor.character.image?.medium}
                              alt={actor.character.name}
                            />
                          </TableCell>
                          <TableCell className="text-row">
                            {actor.character.name}
                          </TableCell>
                          <TableCell className="text-row">
                            {actor.person.name}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
