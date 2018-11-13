package ir.geeglo.dev.store.data.dao;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface BaseDao<T> {
    EntityManager getEntityManager();

    CriteriaBuilder getCriteriaBuilder();

    @Transactional(propagation = Propagation.REQUIRED)
    default void insert(T object) {
        getEntityManager().persist(object);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    default void update(T object) {
        getEntityManager().merge(object);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    default void refresh(T object) {
        getEntityManager().refresh(object);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    default void detach(T entity) {
        getEntityManager().detach(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    default void delete(T object) {
        if (!getEntityManager().contains(object)) {
            object = getEntityManager().merge(object);
        }
        getEntityManager().remove(object);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    default <T> List<T> selectAll(
            Class entityClazz,
            List<QueryConditionStruct> filterStructArray) {
        CriteriaBuilder criteriaBuilder = getCriteriaBuilder();
        CriteriaQuery criteriaQuery = criteriaBuilder.createQuery(entityClazz);
        Root root = criteriaQuery.from(entityClazz);
        criteriaQuery.select(root);

        List<Predicate> predicates = createPredicates(
                root, getCriteriaBuilder(), filterStructArray);

        TypedQuery<T> query = createTypedQuery(
                getEntityManager(),
                getCriteriaBuilder(),
                criteriaQuery,
                predicates,
                filterStructArray);

        List<T> resultList = query
                .getResultList();
        return resultList;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    default Long selectCount(
            Class entityClazz,
            List<QueryConditionStruct> filterStructArray) {
        CriteriaQuery<Long> countQuery = getCriteriaBuilder()
                .createQuery(Long.class);
        Root root = countQuery.from(entityClazz);
        countQuery.select(getCriteriaBuilder()
                .count(root));

        List<Predicate> predicates = createPredicates(
                root, getCriteriaBuilder(), filterStructArray);

        TypedQuery<Long> query = createTypedQuery(
                getEntityManager(),
                getCriteriaBuilder(),
                countQuery,
                predicates,
                filterStructArray);

        Long count = query.getSingleResult();
        return count;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    default <T> List<T> selectByPage(
            Class entityClazz,
            List<QueryConditionStruct> filterStructArray,
            int pageSize, int pageNumber) {
        CriteriaBuilder criteriaBuilder = getCriteriaBuilder();
        CriteriaQuery criteriaQuery = criteriaBuilder.createQuery(entityClazz);
        Root root = criteriaQuery.from(entityClazz);
        criteriaQuery.select(root);

        List<Predicate> predicates = createPredicates(
                root, getCriteriaBuilder(), filterStructArray);

        TypedQuery<T> query = createTypedQuery(
                getEntityManager(),
                getCriteriaBuilder(),
                criteriaQuery,
                predicates,
                filterStructArray);

        List<T> resultList = query
                .setFirstResult((pageNumber - 1) * pageSize)
                .setMaxResults(pageSize)
                .getResultList();
        return resultList;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    default <T> T selectById(int id, Class entityClazz) {
        return (T)getEntityManager().find(
                entityClazz, id);
    }

    static List<Predicate> createPredicates(
            Root root,
            CriteriaBuilder criteriaBuilder,
            List<QueryConditionStruct> filterStructArray) {
        List<Predicate> predicates = new ArrayList<>();

        if (filterStructArray != null) {
            for (QueryConditionStruct fs : filterStructArray) {
                if(fs.getFilterType() == QueryConditionStruct.FilterType.IN_LIST) {
                    Expression<String> expression = root
                            .get(fs.getField());
                    Predicate predicate = expression.in(
                            fs.getFilters());
                    predicates.add(predicate);
                } else if(fs.getFilterType() == QueryConditionStruct.FilterType.LIKE) {
                    ParameterExpression<String> expression = criteriaBuilder
                            .parameter(String.class, fs.getField());
                    predicates.add(
                            criteriaBuilder.like(
                                    root.get(fs.getField()),
                                    expression));
                }
            }
        }

        return predicates;
    }

    static <T> TypedQuery<T> createTypedQuery(
            EntityManager entityManager,
            CriteriaBuilder criteriaBuilder,
            CriteriaQuery criteriaQuery,
            List<Predicate> predicates,
            List<QueryConditionStruct> filterStructArray) {
        criteriaQuery.where(predicates.toArray(new Predicate[]{}));
        TypedQuery query = entityManager.createQuery(criteriaQuery);
        if(filterStructArray != null) {
            for (QueryConditionStruct f : filterStructArray) {
                if (f.getFilterType() == QueryConditionStruct.FilterType.LIKE) {
                    query.setParameter(
                            f.getField(),
                            ((String) f.getFilters().get(0)).concat("%"));
                }
            }
        }
        return query;
    }
}
