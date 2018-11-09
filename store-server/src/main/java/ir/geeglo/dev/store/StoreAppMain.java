package ir.geeglo.dev.store;

import com.mysql.cj.api.io.ServerSession;
import ir.geeglo.dev.store.data.entity.AddressEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import ir.piana.dev.core.PianaAnnotationAppMain;
import ir.piana.dev.core.annotation.*;
import ir.piana.dev.grizzly.http.GrizzlyPianaHttpServer;
import ir.piana.dev.secure.crypto.CryptoAttribute;
import ir.piana.dev.secure.crypto.CryptoMaker;
import ir.piana.dev.secure.hash.HashMaker;
import ir.piana.dev.secure.key.SecretKeyAlgorithm;
import ir.piana.dev.secure.key.SecretKeyMaker;
import ir.piana.dev.secure.util.Base64Converter;

import javax.crypto.SecretKey;
import java.util.Map;

/**
 * @author Mohammad Rahmati, 10/13/2018
 */
@PianaServer(
        serverCORS = @PianaServerCORS(allowOrigin = "*"),
        serverSession = @PianaServerSession(sessionExpiredSecond = 9999),
        sslServer = @SSLServer(keyStoreName = "keystore.jks", keyStorePassword = "password")
)
public class StoreAppMain {
    public static void main(String[] args) throws Exception {
        PianaAnnotationAppMain.start(new GrizzlyPianaHttpServer(), StoreAppMain.class);

//        UserEntity userEntity = GeegloSpringServiceProvider.getUserService().selectByMobile("09391366128");
//        AddressEntity addressEntity = new AddressEntity();
//        addressEntity.setTitle("a");
//        addressEntity.setDetail("2");
//        addressEntity.setLatitude(12d);
//        addressEntity.setLongitude(13d);
//        addressEntity.setPhoneNumber("09");
//        addressEntity.setPostCode("028");
//        userEntity.addAddress(addressEntity);
//        GeegloSpringServiceProvider.getUserService().update(userEntity);
    }
}
