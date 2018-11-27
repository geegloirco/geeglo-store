package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.DeliveryStatusEntity;
import ir.geeglo.dev.store.data.entity.ItemGroupEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class DeliveryStatusService extends BaseService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    GeegloBaseDao<DeliveryStatusEntity> geegloBaseDao;

    public DeliveryStatusEntity save(String title, String image) {
        DeliveryStatusEntity deliveryStatusEntity = new DeliveryStatusEntity();
        deliveryStatusEntity.setTitle(title);
        geegloBaseDao.insert(deliveryStatusEntity);
        return deliveryStatusEntity;
    }

    @Override
    protected BaseDao getBaseDao() {
        return geegloBaseDao;
    }

    @Override
    protected Class getEntityType() {
        return DeliveryStatusEntity.class;
    }
}
