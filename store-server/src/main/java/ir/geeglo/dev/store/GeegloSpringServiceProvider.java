package ir.geeglo.dev.store;

import ir.geeglo.dev.store.business.GeegloBusinessSpringConfig;
import ir.geeglo.dev.store.business.KavenegarBusiness;
import ir.geeglo.dev.store.business.SecurityBusiness;
import ir.geeglo.dev.store.data.service.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

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

    public static ItemGroupService getItemGroupService() {
        return applicationContext.getBean(ItemGroupService.class);
    }

    public static AddressService getAddressService() {
        return applicationContext.getBean(AddressService.class);
    }

    public static ItemService getItemService() {
        return applicationContext.getBean(ItemService.class);
    }

    public static DeliveryStatusService getDeliveryStatusService() {
        return applicationContext.getBean(DeliveryStatusService.class);
    }

    public static CartService getCartService() {
        return applicationContext.getBean(CartService.class);
    }

    public static CartDetailService getCartDetailService() {
        return applicationContext.getBean(CartDetailService.class);
    }

    public static OpenCartService getOpenCartService() {
        return applicationContext.getBean(OpenCartService.class);
    }

    public static PaymentTypeService getPaymentTypeService() {
        return applicationContext.getBean(PaymentTypeService.class);
    }

    public static KavenegarBusiness getKavenegarBusiness() {
        return applicationContext.getBean(KavenegarBusiness.class);
    }

    public static SecurityBusiness getSecurityBusiness() {
        return applicationContext.getBean(SecurityBusiness.class);
    }
}
