# UPDATE CONTENT REQUEST — CHƯƠNG 6

## Chủ đề: Phật giáo/Công giáo đồng hành cùng dân tộc

## Mục tiêu

Bổ sung nội dung còn thiếu cho trang:

`/chuong6/phat-giao`

trong project hiện tại:

https://mln-131-religions-with-nation.vercel.app/

---

## Yêu cầu bắt buộc

### 1. GIỮ NGUYÊN TOÀN BỘ THIẾT KẾ HIỆN CÓ

Không được thay đổi:

* Layout
* Cấu trúc section
* Typography
* Font
* Màu sắc
* Animation
* Hiệu ứng scroll
* Flipbook/page transition (nếu có)
* Navbar
* Component structure
* CSS classes
* Responsive behavior
* Khoảng cách giữa các phần đã có

Chỉ được:

* Bổ sung nội dung text còn thiếu
* Thêm subsection theo đúng style/component đang có
* Reuse component hiện hữu

---

### 2. KHÔNG TẠO STYLE MỚI

Không được:

* Tạo CSS mới nếu không cần thiết
* Thay theme
* Refactor UI
* Chỉnh spacing global
* Đổi cấu trúc visual

Phải giữ nguyên visual consistency với toàn bộ website.

---

### 3. CHỦ ĐỀ CẦN BỔ SUNG

Nội dung phải đúng với topic nhóm:

**“Phật giáo/Công giáo đồng hành cùng dân tộc”**

Không mở rộng lan man sang lý thuyết tôn giáo chung.

Nội dung phải tập trung vào:

* Vai trò lịch sử
* Sự đồng hành cùng dân tộc
* Đóng góp trong thời kỳ đổi mới
* Liên hệ tinh thần Đại hội XIV
* Vai trò trong kỷ nguyên phát triển mới

---

## Nội dung cần thêm

---

# Section 1: Quan điểm của Đảng về tôn giáo trong giai đoạn mới

Thêm nội dung:

Đại hội XIV tiếp tục khẳng định chủ trương tôn trọng và bảo đảm quyền tự do tín ngưỡng, tôn giáo của Nhân dân; phát huy những giá trị văn hóa, đạo đức tốt đẹp của các tôn giáo trong xây dựng khối đại đoàn kết toàn dân tộc.

Nhấn mạnh:

* Tôn giáo là nhu cầu tinh thần chính đáng
* Là nguồn lực xã hội
* Góp phần ổn định và phát triển đất nước

---

# Section 2: Phật giáo đồng hành cùng dân tộc

## 2.1 Truyền thống lịch sử

Bổ sung:

* Phật giáo du nhập sớm vào Việt Nam
* Gắn bó với dựng nước và giữ nước
* Phát triển mạnh thời Lý – Trần
* Tinh thần:
  **“Đạo pháp – Dân tộc – Chủ nghĩa xã hội”**

---

## 2.2 Đóng góp hiện nay

Các ý:

### Giáo dục đạo đức xã hội

* Từ bi
* Trí tuệ
* Vị tha

### Hoạt động an sinh xã hội

* Cứu trợ thiên tai
* Hỗ trợ người nghèo
* Bếp ăn từ thiện
* Chăm sóc cộng đồng

### Bảo tồn văn hóa dân tộc

* Lễ hội truyền thống
* Di sản Phật giáo
* Giá trị văn hóa Việt

---

## 2.3 Liên hệ Đại hội XIV

Nhấn mạnh vai trò của Phật giáo trong:

* Xây dựng con người Việt Nam
* Phát triển văn hóa
* Củng cố nền tảng tinh thần xã hội

---

# Section 3: Công giáo đồng hành cùng dân tộc

## 3.1 Truyền thống

Thêm:

**“Sống Phúc âm giữa lòng dân tộc để phục vụ hạnh phúc của đồng bào”**

---

## 3.2 Đóng góp

### Giáo dục

* Hệ thống đào tạo
* Bồi dưỡng nhân lực

### Y tế – xã hội

* Chăm sóc cộng đồng
* Hỗ trợ người yếu thế

### Bác ái xã hội

* Thiện nguyện
* Cứu trợ
* Phát triển cộng đồng

---

## 3.3 Vai trò hiện nay

Gắn với:

* Phát triển xã hội bền vững
* Đại đoàn kết dân tộc
* Đồng hành cùng công cuộc đổi mới

---

# Section 4: Ý nghĩa của việc đồng hành cùng dân tộc

Các luận điểm:

## Củng cố đại đoàn kết toàn dân

## Tạo đồng thuận xã hội

## Xây dựng nền tảng đạo đức

## Góp phần phát triển bền vững

---

# Section 5: Kết luận

Thêm block kết:

Phật giáo và Công giáo tại Việt Nam đã, đang và sẽ tiếp tục là bộ phận quan trọng của khối đại đoàn kết toàn dân tộc, đồng hành cùng đất nước trong hành trình xây dựng một Việt Nam:

**Hòa bình – Độc lập – Dân chủ – Giàu mạnh – Phồn vinh – Văn minh – Hạnh phúc**

---

## Cách triển khai kỹ thuật

Agent cần:

### Bước 1

Scan toàn bộ page `/chuong6/phat-giao`

### Bước 2

Xác định các placeholder hoặc section thiếu content

### Bước 3

Inject nội dung vào đúng component hiện có

### Bước 4

Preserve toàn bộ:

* JSX structure
* CSS classes
* Existing transitions
* Existing animation hooks

---

## Không được làm

❌ Rewrite page
❌ Change component tree
❌ Modify styling
❌ Add unrelated content
❌ Simplify existing design
❌ Break responsive layout

---

## Output mong muốn

Chỉ update content của page hiện tại sao cho:

* Nội dung đầy đủ
* Đúng chủ đề nhóm 5
* Đồng nhất với toàn bộ website
* Không khác biệt về mặt thiết kế
