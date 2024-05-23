import http from "http"
import { startMessageConsumer } from './services/kafka'
import SocketService from "./services/socket"

async function init() {
    startMessageConsumer()
    const socketService = new SocketService();

    const httpserver = http.createServer()
    const PORT = process.env.port ? process.env.PORT : 8000

    socketService.io.attach(httpserver)

    httpserver.listen(
        PORT, () => {
            console.log(`HTTP server started at PORT: ${PORT}`)
        }
    );

    socketService.initListener()
}

init();