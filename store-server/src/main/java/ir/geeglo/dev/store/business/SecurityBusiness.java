package ir.geeglo.dev.store.business;

import ir.piana.dev.secure.crypto.CryptoAttribute;
import ir.piana.dev.secure.crypto.CryptoMaker;
import ir.piana.dev.secure.key.SecretKeyAlgorithm;
import ir.piana.dev.secure.key.SecretKeyMaker;
import ir.piana.dev.secure.util.Base64Converter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Repository("SecurityBusiness")
@PropertySource(value = "classpath:application.properties")
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class SecurityBusiness {
    private static final String INTERNAL_KEY = "AQvQOJ1nwtk=";
    private static SecretKey internalKey;
    @Value("${security.secret-key.des}")
    private String secureKeyString;
    private SecretKey secretKey;

    static {
        try {
            internalKey = SecretKeyMaker.asSecretKey(INTERNAL_KEY, SecretKeyAlgorithm.DES);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void init() {
        try {
            String decryptedSecureKey = decryptDesEcbPkcs5paddingFromBase64Internal(secureKeyString);
            secretKey = SecretKeyMaker.asSecretKey(decryptedSecureKey, SecretKeyAlgorithm.DES);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static String encryptDesEcbPkcs5paddingAsBase64Internal(String rawString) throws Exception {
        return Base64Converter.toBase64String(
                CryptoMaker.encrypt(rawString.getBytes("UTF-8"),
                        internalKey, CryptoAttribute.DES_ECB_PKCS_5_PADDING));
    }

    private static String decryptDesEcbPkcs5paddingFromBase64Internal(String encrypted) throws Exception {
        return new String(CryptoMaker.decrypt(Base64Converter.fromBase64String(encrypted),
                internalKey, CryptoAttribute.DES_ECB_PKCS_5_PADDING), "UTF-8");
    }

    public String encryptDesEcbPkcs5paddingAsBase64(String rawString) throws Exception {
        return Base64Converter.toBase64String(
                CryptoMaker.encrypt(rawString.getBytes("UTF-8"),
                        secretKey, CryptoAttribute.DES_ECB_PKCS_5_PADDING));
    }

    public String decryptDesEcbPkcs5paddingFromBase64(String encrypted) throws Exception {
        return new String(CryptoMaker.decrypt(Base64Converter.fromBase64String(encrypted),
                secretKey, CryptoAttribute.DES_ECB_PKCS_5_PADDING), "UTF-8");
    }

    public static void main(String[] args) throws Exception {
        boolean encryptType = true;
        String property = System.getProperties().getProperty("crypto-type");
        if(property != null && property.equalsIgnoreCase("dec")) {
            encryptType = false;
        }

        for(String arg : args) {
            if(encryptType)
                System.out.println(SecurityBusiness
                        .encryptDesEcbPkcs5paddingAsBase64Internal(arg));
            else {
                System.out.println(SecurityBusiness
                        .decryptDesEcbPkcs5paddingFromBase64Internal(arg));
            }
        }
    }
}
