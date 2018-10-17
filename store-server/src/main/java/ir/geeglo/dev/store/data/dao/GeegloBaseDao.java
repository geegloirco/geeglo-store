package ir.geeglo.dev.store.data.dao;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.Arrays;
import java.util.List;

@Repository(value = "GeegloBaseDao")
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class GeegloBaseDao<T> implements BaseDao<T> {
    @PersistenceContext()
    EntityManager entityManager;

    protected CriteriaBuilder criteriaBuilder;

    @PostConstruct
    private void postConstruct() {
        criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    @Override
    public EntityManager getEntityManager() {
        return entityManager;
    }

    @Override
    public CriteriaBuilder getCriteriaBuilder() {
        return criteriaBuilder;
    }

    public T findById(Class entityClazz, int id) {
        T entity = (T)entityManager.find(entityClazz, id);
        return entity;
    }

    public List<T> findAll(Class entityClazz) {
        List<T> entityList = entityManager.createNamedQuery(
                entityClazz.getSimpleName().concat(".selectAll"),
                entityClazz).getResultList();
        return entityList;
    }

    public T findByTitle(Class entityClazz, String title) {
        List<T> entities = selectAll(entityClazz, Arrays.asList(
                new QueryConditionStruct<>("title",
                        Arrays.asList(title),
                        QueryConditionStruct.FilterType.IN_LIST)));
        if(entities != null && !entities.isEmpty())
            return entities.get(0);
        return null;
    }

    public T findByCondition(Class entityClazz, String field, Object...values) {
        List<T> entities = selectAll(entityClazz, Arrays.asList(
                new QueryConditionStruct(field,
                        Arrays.asList(values),
                        QueryConditionStruct.FilterType.IN_LIST)));
        if(entities != null && !entities.isEmpty())
            return entities.get(0);
        return null;
    }
}
