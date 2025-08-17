import ratelimit from "../config/upstash.js";

// on a user by user basis
const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit(req.ip);

        if (!success) {
            return res.status(429).json({ message: "Rate limit exceeded" });
        }

        next();

    } catch (error) {
        console.error("Error in rateLimiter middleware:", error);
        next(error);

    }
}

export default rateLimiter