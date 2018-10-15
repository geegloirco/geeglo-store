package ir.geeglo.dev.store.business;

import com.kavenegar.sdk.KavenegarApi;
import com.kavenegar.sdk.excepctions.ApiException;
import com.kavenegar.sdk.excepctions.HttpException;
import com.kavenegar.sdk.models.SendResult;
import ir.piana.dev.secure.random.SecureRandomMaker;
import ir.piana.dev.secure.random.SecureRandomType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Repository(value = "KavenegarBusiness")
@PropertySource(value = "classpath:application.properties")
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class KavenegarBusiness {
    private static KavenegarApi api;

    @Value("${kavenegar.api.key}")
    private String apiKey;

    @PostConstruct
    public void postConstruct() {
        try {
            api = new KavenegarApi(apiKey);
        }
        catch (HttpException ex)
        { // در صورتی که خروجی وب سرویس 200 نباشد این خطارخ می دهد.
            System.out.print("HttpException  : " + ex.getMessage());
        }
        catch (ApiException ex)
        { // در صورتی که خروجی وب سرویس 200 نباشد این خطارخ می دهد.
            System.out.print("ApiException : " + ex.getMessage());
        }
    }

    public String sendOtp(String mobileNo) {
        String message = "مرکز پیام پیانا".concat("\n");
        int otp = 0;
        try {
            otp = Math.abs(SecureRandomMaker.makeInt(SecureRandomType.SHA_1_PRNG));
            message = message.concat("رمز ورود شما")
                    .concat("\n\n")
                    .concat(String.valueOf(otp));
            SendResult result = api.send("30004681", mobileNo, message);
            System.out.println(result.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return String.valueOf(otp);
    }
}
