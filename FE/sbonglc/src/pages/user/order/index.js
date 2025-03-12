import { memo } from "react";
import "./style.scss";
import san_1 from "../../../assets/user/order/image.jpg";
import san_2 from "../../../assets/user/order/image (2).png";
import san_3 from "../../../assets/user/order/image (1).png";

const Order = () => {
  // Example array of field data. Replace with your actual data source
  const fieldData = [
    { id: 1, src: san_1, alt: "Sân 1", title: "Sân số 1", time: "90 phút", location: "Khu đô Nguyễn Trãi Hà Đông", manager: "0123456789" },
    { id: 2, src: san_2, alt: "Sân 2", title: "Sân số 2", time: "90 phút", location: "Khu đô Nguyễn Trãi Hà Đông", manager: "0123456789" },
    { id: 3, src: san_3, alt: "Sân 3", title: "Sân số 3", time: "Trận đấu", location: "Khu đô Nguyễn Trãi Hà Đông", manager: "0123456789" },
    { id: 4, src: san_1, alt: "Sân 4", title: "Sân số 4", time: "90 phút", location: "Khu đô Nguyễn Trãi Hà Đông", manager: "0123456789" }, // Add more fields here!
    { id: 5, src: san_2, alt: "Sân 5", title: "Sân số 5", time: "90 phút", location: "Khu đô Nguyễn Trãi Hà Đông", manager: "0123456789" },
  ];

  return (
    <div className="order-content">
      <div className="price-section">
        <div className="container">
          <div className="heading-content">
            <div className="highlight-text">GIÁ THUÊ SÂN</div>
            <div className="sub-heading">Giá cả hợp lí với mọi đối tượng</div>
          </div>
          <div className="time-slots">
            <button className="time-slot-button">Thời gian</button>
            <button className="time-slot-button">1h30p</button>
          </div>
          <div className="price-row">
            <div className="price-box">
              <h3>Ngày thường</h3>
              <p className="time-description">Khung giờ chung</p>
              <h2>300,000 <span>đ /ca</span></h2>
              <ul>
                <li>1 quả bóng</li>
                <li>2 xô nước <span className="info-icon">ℹ</span></li>
              </ul>
              <button>Đặt ngay</button>
            </div>

            <div className="price-box special">
              <h3>Ngày thường <span className="new-tag">HOT</span></h3>
              <p className="time-description">Giờ vàng 17h00 - 20h00</p>
              <h2>500,000 <span>đ /ca</span></h2>
              <ul>
                <li>1 quả bóng</li>
                <li>2 xô nước <span className="info-icon">ℹ</span></li>
                <li>áo pit</li>
              </ul>
              <button>Đặt ngay</button>
            </div>

            <div className="price-box">
              <h3>Cuối tuần</h3>
              <p className="time-description">Thứ 7 và chủ nhật</p>
              <h2>100,000 <span>đ /ca</span></h2>
              <p className="extra-fee"><span className="info-icon">ℹ</span> Tăng thêm so với ngày thường.</p>
              <button>Đặt ngay</button>
            </div>
          </div>
        </div>
      </div>

      <div className="field-section">
        <div className="container">
          <div className="field-row">
            {fieldData.map((field) => (
              <div className="field-box" key={field.id}>
                <img src={field.src} alt={field.alt} />
                <h4>{field.title}</h4>
                <p>Thời gian: {field.time}</p>
                <p>Địa điểm: {field.location}</p>
                <div className="contact">
                  <span>Quản lý</span>
                  <span>{field.manager}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Order);