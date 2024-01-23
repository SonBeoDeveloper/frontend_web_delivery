import React from "react";
import { Card, Divider, Typography, Image } from "antd";

const { Title, Text } = Typography;

const Information = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Thông tin nhà hàng</Title>

      <Card title="" style={{ marginBottom: "24px" }}>
        <Text strong>Tên: </Text>
        <Text>Nhà hàng Thiên Anh</Text>
        <Divider />
        <Text strong>Địa chỉ: </Text>
        <Text>
          Số 11, Phố Phan Bội Châu, Tổ 5, Khu 9A, P-Bãi Cháy, TP- Hạ Long, Quảng
          Ninh, Ha Long, Vietnam
        </Text>
        <Divider />
        <Text strong>Phone: </Text>
        <Text>0203 3512 768</Text>
      </Card>

      <Card title="Giờ mở cửa" style={{ marginBottom: "24px" }}>
        <Text strong>Thứ 2 - Thứ 6: </Text>
        <Text>9:00 AM - 10:00 PM</Text>
        <Divider />
        <Text strong>Thứ 7 - Chủ nhật: </Text>
        <Text>10:00 AM - 11:00 PM</Text>
      </Card>

      <Card title="Tiêu đề" style={{ marginBottom: "24px" }}>
        <Text>
          Nhà Hàng Thiên Anh toạ lạc ngay giữa trung tâm KDL với 2 mặt tiền
          hướng đông nam, tận hưởng làn gió mát từ biển Hạ Long thơ mộng. Bãi đỗ
          xe rộng rãi thuận tiện, gần chợ hải sản, gần bãi tắm, gần khu vui chơi
          giải trí & các khách sạn lớn nhỏ. Chúng tôi chuyên phục vụ các món ăn
          Hải Sản tươi sống. Không gian ấm cúng, sang trọng, lịch sự, sức chứa
          cùng lúc lên đến 500 khách. Hệ thống phòng riêng đa dạng đáp ứng mọi
          nhu cầu của khách hàng. Tự hào là đơn vị uy tín có trên 10 năm kinh
          nghiệm cùng đội ngũ nhân viên tận tâm, chu đáo. Nhà Hàng Thiên Anh cam
          kết mang đến cho quý khách hàng: - Dịch vụ chuyên nghiệp nhất - Chất
          lượng tốt nhất - Giá cả hợp lý nhất - Trải nghiệp tuyệt vời nhất.
        </Text>
      </Card>
      <Card
        title="Hình ảnh"
        style={{ marginBottom: "24px", textAlign: "center" }}
      >
        <Image.PreviewGroup>
          <Image
            width={200}
            src="https://elitetour.com.vn/files/images/Blogs/nha-hang-thien-anh-ha-long-3.jpg"
            style={{ margin: "8px", width: "200px", height: "150px" }}
          />
          <Image
            width={200}
            src="https://dulichtoday.vn/wp-content/uploads/2023/04/nha-hang-hai-san-bai-chay-7-e1681184756668.jpg"
            style={{ margin: "8px", width: "200px", height: "150px" }}
          />
          <Image
            width={200}
            src="https://d2ile4x3f22snf.cloudfront.net/wp-content/uploads/sites/189/2017/10/06020042/U64A9351.jpg"
            style={{ margin: "8px", width: "200px", height: "150px" }}
          />
          <Image
            width={200}
            src="https://elitetour.com.vn/files/images/Blogs/nha-hang-thien-anh-ha-long-3.jpg"
            style={{ margin: "8px", width: "200px", height: "150px" }}
          />
        </Image.PreviewGroup>
      </Card>
    </div>
  );
};

export default Information;
