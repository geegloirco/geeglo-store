package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.GeegloSpringServiceProvider;
import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.dao.QueryConditionStruct;
import ir.geeglo.dev.store.data.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static ir.geeglo.dev.store.GeegloSpringServiceProvider.*;

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

    public List<ItemEntity> findByGroup(ItemGroupEntity itemGroupEntity) {
        return findEntities(Arrays.asList(
                new QueryConditionStruct("itemGroupEntity", Arrays.asList(itemGroupEntity))));
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

//    public static void main(String[] args) {
//
//        ItemGroupEntity v = getItemGroupService().findByTitle("سبزیجات");
//        List<ItemEntity> byGroup = getItemService().findByGroup(v);
//
//        System.out.println(byGroup.size());
//    }
}
