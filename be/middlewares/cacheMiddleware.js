const cache = new Map();

const cacheMiddleware = (req, res, next) => {
    const { url } = req;

    const cachedResponse = cache.get(url);

    if (cachedResponse) {
        return res.send(JSON.parse(cachedResponse));
    };

    res.sendResponse = res.send;
    res.semd = (body) => {
        cache.set(url, body);
        response.sendResponse(body);
    };
    next();
};

module.exports = cacheMiddleware;