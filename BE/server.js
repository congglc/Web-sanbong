const app = require("./src/app")
const config = require("./src/config")
const logger = require("./src/utils/logger")

const PORT = config.port || 5000

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
