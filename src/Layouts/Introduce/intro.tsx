import "./intro.scss";

const Intro = () => {
  return (
    <div className="intro-container">
      <div className="intro-content">
        {/* Tiêu đề và mô tả */}
        <h3 className="intro-subtitle">Cách hoạt động</h3>
        <h1 className="intro-title">
          Hành trình học trực tuyến của bạn trở nên dễ dàng
        </h1>
        <p className="intro-description">
          Bắt đầu với những khóa học được cá nhân hóa theo sở thích của bạn
        </p>

        {/* Các bước */}
        <div className="steps-container">
          <div className="step step-with-line">
            <div className="step-number">01</div>
            <h4 className="step-title">Chọn khóa học</h4>
            <p className="step-description">Tìm kiếm những khóa học phù hợp</p>
          </div>

          <div className="step step-with-line">
            <div className="step-number">02</div>
            <h4 className="step-title">Đăng ký và Mua</h4>
            <p className="step-description">
              Thiết lập tài khoản và sở hữu những khóa học thú vị
            </p>
          </div>

          <div className="step step-with-line">
            <div className="step-number">03</div>
            <h4 className="step-title">Học tích lũy</h4>
            <p className="step-description">
              Khám phá và tiếp thu những tri thức mới
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
