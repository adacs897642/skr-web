const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    // // proxy api calls
    // app.use(createProxyMiddleware('/api', {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    // }));

    // proxy websocket
    // app.use(createProxyMiddleware('/socket.io', {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //     ws: true,
    // }));
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:5000/',
            // changeOrigin: true,
            // logLevel: "debug",
            // ws: true,
            headers: {
                accept: "application/json",
                method: "GET",
                "Connection": "keep-alive"
            },
            // Custom router function (target object)
            router: function(req) {
                return {
                    // protocol: 'https:', // The : is required
                    host: 'localhost',
                    port: 5000
                };
            }
        }),
    );
    app.use('/socket.io',
        createProxyMiddleware({
        target: 'http://127.0.0.1:5000/',
        ws: true,
    }));
};
//
// export const socketProxy = createProxyMiddleware({
//     target: 'http://127.0.0.1:5000/',
//     pathFilter: '/',
//     ws: true,
// });