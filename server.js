const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
