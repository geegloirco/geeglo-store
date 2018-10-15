package ir.geeglo.dev.store;

import ir.geeglo.dev.store.data.service.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import ir.geeglo.dev.store.business.*;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
public class GeegloSpringServiceProvider {
    private static ApplicationContext applicationContext;

    static {
        try {
            applicationContext = new AnnotationConfigApplicationContext(
                    GeegloBusinessSpringConfig.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static UserService getUserService() {
        return applicationContext.getBean(UserService.class);
    }

    public static CountryService getCountryService() {
        return applicationContext.getBean(CountryService.class);
    }

    public static ProvinceService getProvinceService() {
        return applicationContext.getBean(ProvinceService.class);
    }

    public static CityService getCityService() {
        return applicationContext.getBean(CityService.class);
    }

    public static LocationService getLocationService() {
        return applicationContext.getBean(LocationService.class);
    }

    public static KavenegarBusiness getKavenegarBusiness() {
        return applicationContext.getBean(KavenegarBusiness.class);
    }

    public static SecurityBusiness getSecurityBusiness() {
        return applicationContext.getBean(SecurityBusiness.class);
    }
}
