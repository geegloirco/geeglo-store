package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.CityEntity;
import ir.geeglo.dev.store.data.entity.ItemEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import ir.geeglo.dev.store.data.entity.UserInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class ItemService extends BaseService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    private GeegloBaseDao geegloBaseDao;

    @Override
    protected BaseDao getBaseDao() {
        return geegloBaseDao;
    }

    @Override
    protected Class getEntityType() {
        return ItemEntity.class;
    }

    public ItemEntity findById(int id) {
        return (ItemEntity)geegloBaseDao.findById(ItemEntity.class, id);
    }

    public List<ItemEntity> findAll() {
        return geegloBaseDao.findAll(ItemEntity.class);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void save(
            Object entity) {
        geegloBaseDao.insert(entity);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void update(Object entity) {
        geegloBaseDao.update(entity);
    }
}
