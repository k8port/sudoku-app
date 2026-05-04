import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="home-page">
    <section className="home-card">
      <h1 className="home-title">Sudoku Pow</h1>
      <p className="home-subtitle">
        Keep your grid sharp with adjustable visuals and focus-friendly
        ambiance.
      </p>
      <Link to="/game" className="button-primary">
        Start Game
      </Link>
    </section>
  </div>
);

export default Home;
