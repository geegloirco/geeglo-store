package ir.geeglo.dev.store;

import ir.piana.dev.core.PianaAnnotationAppMain;
import ir.piana.dev.core.annotation.PianaServer;
import ir.piana.dev.core.annotation.PianaServerCORS;
import ir.piana.dev.core.annotation.SSLServer;
import ir.piana.dev.grizzly.http.GrizzlyPianaHttpServer;
import ir.piana.dev.secure.crypto.CryptoAttribute;
import ir.piana.dev.secure.crypto.CryptoMaker;
import ir.piana.dev.secure.hash.HashMaker;
import ir.piana.dev.secure.key.SecretKeyAlgorithm;
import ir.piana.dev.secure.key.SecretKeyMaker;
import ir.piana.dev.secure.util.Base64Converter;

import javax.crypto.SecretKey;

/**
 * @author Mohammad Rahmati, 10/13/2018
 */
@PianaServer(serverCORS = @PianaServerCORS(allowOrigin = "*"),
        sslServer = @SSLServer(keyStoreName = "keystore.jks", keyStorePassword = "password"))
public class StoreAppMain {
    public static void main(String[] args) throws Exception {
        PianaAnnotationAppMain.start(new GrizzlyPianaHttpServer(), StoreAppMain.class);
    }
}
