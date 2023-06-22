# Backend API cho ứng dụng nghe nhạc

## Mô tả dự án
Dự án này là một backend API để phục vụ ứng dụng nghe nhạc. API sẽ cung cấp các endpoints để quản lý danh sách bài hát, người dùng, playlist và các chức năng liên quan.

## Công nghệ sử dụng
- Node.js: môi trường chạy mã JavaScript phía máy chủ
- Express: framework Node.js để xây dựng API
- MongoDB: cơ sở dữ liệu NoSQL để lưu trữ dữ liệu
- Webpack: bundle project
- Vercel: deploy project trên server của Vercel

## Cách setup dự án
1. Clone dự án từ repository:
```
git clone https://github.com/PeoScouser98/music_app_api.git server
```
2. Di chuyển vào thư mục dự án:
```
cd server
```
3. Cài đặt các dependencies:
```
npm install
```
4. Run project trên local:
```
npm run dev
```
Dự án sẽ được khởi chạy trên `http://localhost:3001` hoặc cổng được cấu hình trong file `.env`

6. Bundle project:
```
npm run build
```
