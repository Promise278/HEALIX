const { StreamClient } = require("@stream-io/node-sdk");

// Replace these with actual Stream credentials from .env
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const streamClient = new StreamClient(apiKey, apiSecret);

const generateToken = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Generate token valid for 1 hour
    const token = streamClient.generateUserToken({
      user_id: userId,
      validity_in_seconds: 3600,
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error generating stream token:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error generating token" });
  }
};

module.exports = {
  generateToken,
};
