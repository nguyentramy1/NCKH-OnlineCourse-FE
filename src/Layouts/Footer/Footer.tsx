import "./Footer.scss";
import Logo from "../../Assets/Image/Logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-section">
        <div className="footer-logo">
          <span>Course AI</span>
          <img src={Logo} alt="Course AI Logo" />
        </div>
      </div>
      <div className="footer-section">
        <h4>Liên hệ</h4>
        <p>Trang chủ</p>
        <p>Về chúng tôi</p>
        <p>Khóa học</p>
        <p>Giảng viên hướng dẫn</p>
        <p>Liên hệ với chúng tôi</p>
      </div>
      <div className="footer-section">
        <h4>Giúp đỡ</h4>
        <p>Hỗ trợ khách hàng</p>
        <p>Điều khoản & Điều kiện</p>
        <p>Chính sách bảo mật</p>
      </div>
    </footer>
  );
};

export default Footer;
