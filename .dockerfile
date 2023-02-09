# Từ image node:18, tạo ra image mới
FROM node:18

# Thiết lập thư mục chứa code cho dự án
WORKDIR /app

# Sao chép tất cả các file của dự án từ host vào image
COPY . /app

# Cài đặt các dependencies từ file package.json
RUN npm install

# Chạy cổng mặc định cho Express
EXPOSE 3000

# Chạy câu lệnh npm start để khởi động dự án
CMD [ "npm", "start" ]
