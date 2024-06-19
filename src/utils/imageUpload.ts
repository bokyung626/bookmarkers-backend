import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";

// AWS S3 설정
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_YOUR_SECRET_ACCESS_KEY!,
  },
});

// Multer 설정
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bookmarkers-bucket", // 업로드할 S3 버킷 이름
    acl: "public-read", // 업로드된 파일을 공개 설정
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 설정
    key: function (req, file, cb) {
      // S3에 저장될 파일명 설정 (예: 타임스탬프 + 원래 파일명)
      cb(null, Date.now().toString() + "-" + path.basename(file.originalname));
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
});
