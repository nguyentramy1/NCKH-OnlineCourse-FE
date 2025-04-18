import "./Home.scss";
import Banner from "../img/Green Creative Save Our Earth Banner - Copy.png";
import Call from "../img/image 3.svg";
import Location from "../img/image 4.svg";

const Home = () => {
  return (
    <div className="home">
      {/* Banner
            <div className="banner">
                <img src={Banner} alt="Banner" />
            </div> */}

      {/* Recently Projects */}
      {/* Recently Projects */}
      <section className="projects">
        <h2>Recently project</h2>
        <div className="scroll-container">
          <div className="project-list">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="project-card">
                <div className="image-placeholder">
                  <img src="" alt="" />
                </div>
                <h3>Title</h3>
                <p>Start date:</p>
                <p>End date:</p>
                <p>Address:</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="news">
        <h2>News</h2>
        <div className="scroll-container">
          <div className="news-list">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="news-card">
                <div className="image-placeholder">
                  <img src="" alt="" />
                </div>
                <h3>Title</h3>
                <p>Owner: </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-section">
          <h4>About us</h4>
          <p>Nhà phát hành</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            <img src={Call} alt="" className="Call" /> +84 0245845698
          </p>
          <p>
            <img src={Location} alt="" className="Location"></img> 541 - Thanh
            Xuân - Hà Nội
          </p>
          <p>✉️ Xuanphuongit@gmail.com</p>
        </div>
        <div className="footer-section">
          <h4>More information</h4>
          <p>🔵 Facebook</p>
          <p>📷 Instagram</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
