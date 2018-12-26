package ir.geeglo.dev.store.admin;

import ir.geeglo.dev.store.data.OrmServiceProvider;
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
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static OrmServiceProvider getOrmServiceProvider() {
        return ormServiceProvider;
    }
}
