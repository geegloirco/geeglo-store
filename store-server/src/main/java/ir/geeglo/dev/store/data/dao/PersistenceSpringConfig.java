package ir.geeglo.dev.store.data.dao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.*;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import org.springframework.orm.jpa.support.PersistenceAnnotationBeanPostProcessor;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;

@Configuration
@EnableJpaRepositories(basePackages = "ir.geeglo.dev.store.data")
@EnableTransactionManagement(mode = AdviceMode.PROXY)
@PropertySource(value = "classpath:application.properties")
@ComponentScan
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class PersistenceSpringConfig {
    @Value("${persistence.unit.name}")
    private String persistenceUnitName;

    @Value("${jpa.vendor.adaptor.name}")
    private String jpaVendorAdaptorName;

    @Value("${database.platform.name}")
    private String databasePlatformName;

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean
    BeanPostProcessor getBeanPostProcessor() {
        return new PersistenceAnnotationBeanPostProcessor();
    }

    String getDatabasePlatformName() {
        if(databasePlatformName.equalsIgnoreCase("mysql"))
            return "org.eclipse.persistence.platform.database.MySQLPlatform";
        return null;
    }


    EclipseLinkJpaVendorAdapter eclipseLinkJpaVendorAdapter(
            String databasePlatformName) {
        EclipseLinkJpaVendorAdapter vendorAdapter =
                new EclipseLinkJpaVendorAdapter();
        vendorAdapter.setDatabasePlatform(databasePlatformName);
        vendorAdapter.setDatabase(Database.MYSQL);
        vendorAdapter.setGenerateDdl(false);
        vendorAdapter.setShowSql(true);
        return vendorAdapter;
    }

    JpaVendorAdapter hibernateJpaVendorAdapter(
            String databasePlatformName) {
        HibernateJpaVendorAdapter vendorAdapter =
                new HibernateJpaVendorAdapter();
        vendorAdapter.setDatabasePlatform("org.hibernate.dialect.MySQL5InnoDBDialect");
        vendorAdapter.setGenerateDdl(false);
        vendorAdapter.setShowSql(true);
        return vendorAdapter;
    }

    @Bean
    JpaVendorAdapter jpaVendorAdapter() {
        if(jpaVendorAdaptorName.equalsIgnoreCase("eclipselink"))
            return eclipseLinkJpaVendorAdapter(getDatabasePlatformName());
        else if(jpaVendorAdaptorName.equalsIgnoreCase("hibernate"))
            return hibernateJpaVendorAdapter(getDatabasePlatformName());
        return null;
    }

    @Bean
    public EntityManagerFactory entityManagerFactory(
            JpaVendorAdapter vendorAdapter) {
        LocalEntityManagerFactoryBean factory =
                new LocalEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPersistenceUnitName(persistenceUnitName);

        // This will trigger the creation of the product manager factory
        factory.afterPropertiesSet();
        return factory.getObject();
    }

    @Bean
    public JpaTransactionManager transactionManager(
            EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory);
        return txManager;
    }
}
