package ir.geeglo.dev.store.data;

import ir.geeglo.dev.store.data.service.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
public class OrmServiceProvider {
    protected ApplicationContext applicationContext;
    protected static OrmServiceProvider ormServiceProvider;

    private OrmServiceProvider() {
    }

    public static synchronized OrmServiceProvider register(
            AnnotationConfigApplicationContext applicationContext) {
        if(ormServiceProvider == null) {
            ormServiceProvider = new OrmServiceProvider();
            applicationContext.register(GeegloServiceSpringConfig.class);
            ormServiceProvider.applicationContext = applicationContext;
        }
        return ormServiceProvider;
    }

    public UserService getUserService() {
        return applicationContext.getBean(UserService.class);
    }

    public CountryService getCountryService() {
        return applicationContext.getBean(CountryService.class);
    }

    public ProvinceService getProvinceService() {
        return applicationContext.getBean(ProvinceService.class);
    }

    public CityService getCityService() {
        return applicationContext.getBean(CityService.class);
    }

    public ItemGroupService getItemGroupService() {
        return applicationContext.getBean(ItemGroupService.class);
    }

    public AddressService getAddressService() {
        return applicationContext.getBean(AddressService.class);
    }

    public ItemService getItemService() {
        return applicationContext.getBean(ItemService.class);
    }

    public DeliveryStatusService getDeliveryStatusService() {
        return applicationContext.getBean(DeliveryStatusService.class);
    }

    public CartService getCartService() {
        return applicationContext.getBean(CartService.class);
    }

    public CartDetailService getCartDetailService() {
        return applicationContext.getBean(CartDetailService.class);
    }

    public OpenCartService getOpenCartService() {
        return applicationContext.getBean(OpenCartService.class);
    }

    public PaymentTypeService getPaymentTypeService() {
        return applicationContext.getBean(PaymentTypeService.class);
    }
}
