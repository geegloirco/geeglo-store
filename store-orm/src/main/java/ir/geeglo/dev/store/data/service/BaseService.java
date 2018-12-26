package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.QueryConditionStruct;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

public abstract class BaseService<T>
        implements Serializable {

    protected abstract BaseDao getBaseDao();

    protected abstract Class getEntityType();

    @Transactional(propagation = Propagation.REQUIRED)
    public List<T> findEntities(List<QueryConditionStruct> filterStructs) {
        return getBaseDao().selectAll(getEntityType(), filterStructs);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<T> findEntities() {
        return findEntities(null);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Long findEntitiesCount(
            List<QueryConditionStruct> filterStructs) {
        Long count = getBaseDao().selectCount(
                getEntityType(), filterStructs);
        return count;
    }

//    protected AcquirerResponse getEntityCountByFilter(
//            List<FilterStruct> filterStructArray) {
//        Long count = getBaseDao().selectCount(
//                getEntityType(), filterStructArray);
//        return new AcquirerResponse(0, null, count);
//    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<T> findEntitiesByPage(
            int pageSize,
            int pageNumber,
            List<QueryConditionStruct> filterStructs) {
        long entitiesCount = getBaseDao().selectCount(
                getEntityType(), filterStructs);
        int  desirableSize = (pageNumber - 1) * pageSize;
        if (desirableSize <= entitiesCount) {
            return getBaseDao().selectByPage(
                            getEntityType(),
                            filterStructs,
                            pageSize, pageNumber);
        } else {
            return null;
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public T findById(int id) {
        return (T)getBaseDao().selectById(id, getEntityType());
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(Object entity) {
        getBaseDao().delete(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void save(Object entity) {
        getBaseDao().insert(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void update(Object entity) {
        getBaseDao().update(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteIfNotAttach(Object entity) {
        getBaseDao().delete(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void refresh(Object entity) {
        getBaseDao().refresh(entity);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void detach(Object entity) {
        getBaseDao().detach(entity);
    }
//    @Transactional(propagation = Propagation.REQUIRED)
//    public T delete(
//            int id,
//            int pageSize,
//            int pageNumber,
//            List<QueryConditionStruct> filterStructs) {
//        long entitiesCount = getBaseDao()
//                .selectCount(getEntityType(), new ArrayList<>());
//        int  desirableSize = (pageNumber - 1) * pageSize;
//        if (desirableSize < entitiesCount) {
//            List<Object> nextEntities = getBaseDao().selectByPage(
//                    getEntityType(),
//                    filterStructs,
//                    1, (pageNumber) * pageSize + 1);
//            getBaseDao().delete(getBaseDao().selectById(id, getEntityType()));
//            if(nextEntities.size() > 0)
//                return (T)nextEntities.get(0);
//            return (T)null;
//        }
//        return null;
//    }
//
//    @Transactional(propagation = Propagation.REQUIRED)
//    public T save(Object entity) {
//        if(entity == null)
//            return (T)null;
//        else {
//            try {
//                if (!isIdEqualWith((T) entity, 0))
//                    return (T)null;
//            } catch (Exception e) {
//                e.printStackTrace();
//                return (T)null;
//            }
//        }
//        try {
//            getBaseDao().save(entity);
//        } catch (Exception ex) {
//            return (T)null;
//        }
//        return (T)entity;
//    }
//
//    @Transactional(propagation = Propagation.REQUIRED)
//    public boolean update(Object entity) {
//        if(entity == null)
//            return false;
//
//        int i = 0;
//        try {
//            i = fetchId(entity);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        if(i == 0)
//            return false;
//
//        Object existEntity = getBaseDao()
//                .selectById(i, getEntityType());
//
//        updateEntity(existEntity, entity);
//
//        getBaseDao().update(existEntity);
//
//        return true;
//    }
//
//    private boolean isIdEqualWith(Object entity, int value)
//            throws  Exception {
//        boolean b = false;
//        try {
//            Method m = getEntityType().getMethod("getId");
//            int o = (int)m.invoke(entity);
//            if(o == value)
//                return true;
//        } catch (NoSuchMethodException e) {
//            e.printStackTrace();
//            throw new Exception(e);
//        } catch (IllegalAccessException e) {
//            e.printStackTrace();
//            throw new Exception(e);
//        } catch (InvocationTargetException e) {
//            e.printStackTrace();
//            throw new Exception(e);
//        }
//        return false;
//    }
//
//    private int fetchId(Object entity)
//            throws  Exception {
//        try {
//            Method m = getEntityType().getMethod("getId");
//            Object id = m.invoke(entity);
//            if(id instanceof Integer)
//                return (Integer) id;
//            return (int) m.invoke(entity);
//        } catch (NoSuchMethodException e) {
//            e.printStackTrace();
//            throw new Exception(e);
//        } catch (IllegalAccessException e) {
//            e.printStackTrace();
//            throw new Exception(e);
//        } catch (InvocationTargetException e) {
//            e.printStackTrace();
//            throw new Exception(e);
//        }
//    }
//
//    private void updateEntity(Object existEntity, Object entity) {
//        try {
//            Method m = getEntityType().getDeclaredMethod("update", Object.class);
//            Object invoke = m.invoke(existEntity, entity);
//        } catch (NoSuchMethodException e) {
//            e.printStackTrace();
//        } catch (IllegalAccessException e) {
//            e.printStackTrace();
//        } catch (InvocationTargetException e) {
//            e.printStackTrace();
//        }
//    }
}
