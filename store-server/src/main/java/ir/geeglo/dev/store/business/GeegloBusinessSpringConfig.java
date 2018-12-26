package ir.geeglo.dev.store.business;

import ir.geeglo.dev.store.data.dao.PersistenceSpringConfig;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;

/**
 * @author Mohammad Rahmati, 12/18/2018
 */
@Configuration
@ComponentScan
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class GeegloBusinessSpringConfig {
}
