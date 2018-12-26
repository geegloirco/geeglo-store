package ir.geeglo.dev.store.admin;

import ir.piana.dev.core.PianaAnnotationAppMain;
import ir.piana.dev.core.annotation.PianaServer;
import ir.piana.dev.core.annotation.PianaServerCORS;
import ir.piana.dev.core.annotation.PianaServerSession;
import ir.piana.dev.grizzly.http.GrizzlyPianaHttpServer;

/**
 * @author Mohammad Rahmati, 10/13/2018
 */
@PianaServer(
        serverCORS = @PianaServerCORS(allowOrigin = "*"),
        serverSession = @PianaServerSession(sessionExpiredSecond = 9999)
//        sslServer = @SSLServer(httpsHost = "192.168.43.111", keyStoreName = "keystore.jks", keyStorePassword = "password")
)
public class AdminAppMain {
    public static void main(String[] args) throws Exception {
        PianaAnnotationAppMain.start(new GrizzlyPianaHttpServer(), AdminAppMain.class);
    }
}
