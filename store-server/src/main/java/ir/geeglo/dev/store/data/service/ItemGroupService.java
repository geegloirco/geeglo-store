package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.CountryEntity;
import ir.geeglo.dev.store.data.entity.ItemGroupEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class ItemGroupService extends BaseService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    GeegloBaseDao<ItemGroupEntity> geegloBaseDao;

    public ItemGroupEntity findByTitle(String title) {
        return geegloBaseDao.findByTitle(ItemGroupEntity.class, title);
    }

    public void save(ItemGroupEntity itemGroupEntity) {
        geegloBaseDao.insert(itemGroupEntity);
    }

    public ItemGroupEntity save(String title, String image, String icon) {
        ItemGroupEntity itemGroupEntity = new ItemGroupEntity();
        itemGroupEntity.setTitle(title);
        geegloBaseDao.insert(itemGroupEntity);
        return itemGroupEntity;
    }

    @Override
    protected BaseDao getBaseDao() {
        return geegloBaseDao;
    }

    @Override
    protected Class getEntityType() {
        return ItemGroupEntity.class;
    }
}
