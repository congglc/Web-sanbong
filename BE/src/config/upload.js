// Create a new file for upload configuration
const path = require("path")
const fs = require("fs")
const multer = require("multer")

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../public/uploads")
const fieldsDir = path.join(uploadsDir, "fields")

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

if (!fs.existsSync(fieldsDir)) {
  fs.mkdirSync(fieldsDir, { recursive: true })
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fieldsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, `field-${uniqueSuffix}${ext}`)
  },
})

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false)
  }
  cb(null, true)
}

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter,
})

// Get image URL
const getImageUrl = (filename) => {
  return `/uploads/fields/${filename}`
}

module.exports = {
  upload,
  getImageUrl,
}
