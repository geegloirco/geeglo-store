package ir.geeglo.dev.store;

import ir.geeglo.dev.store.business.GeegloBusinessSpringConfig;
import ir.geeglo.dev.store.business.KavenegarBusiness;
import ir.geeglo.dev.store.business.SecurityBusiness;
import ir.geeglo.dev.store.data.OrmServiceProvider;
import ir.geeglo.dev.store.data.service.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
public class GeegloSpringServiceProvider {
    private static AnnotationConfigApplicationContext applicationContext;
    private static OrmServiceProvider ormServiceProvider;

    static {
        try {
            applicationContext = new AnnotationConfigApplicationContext();
            ormServiceProvider = OrmServiceProvider.register(applicationContext);
            applicationContext.register(GeegloBusinessSpringConfig.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static OrmServiceProvider getOrmServiceProvider() {
        return ormServiceProvider;
    }

    public static KavenegarBusiness getKavenegarBusiness() {
        return applicationContext.getBean(KavenegarBusiness.class);
    }

    public static SecurityBusiness getSecurityBusiness() {
        return applicationContext.getBean(SecurityBusiness.class);
    }
}
