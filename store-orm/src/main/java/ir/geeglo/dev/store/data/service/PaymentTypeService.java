package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.CountryEntity;
import ir.geeglo.dev.store.data.entity.PaymentTypeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class PaymentTypeService extends BaseService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    GeegloBaseDao<PaymentTypeEntity> geegloBaseDao;

    @Override
    protected BaseDao getBaseDao() {
        return geegloBaseDao;
    }

    @Override
    protected Class getEntityType() {
        return PaymentTypeEntity.class;
    }
}
