package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.dao.QueryConditionStruct;
import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.CityEntity;
import ir.geeglo.dev.store.data.entity.ItemEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Repository
public class CartService extends BaseService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    private GeegloBaseDao geegloBaseDao;

    @Override
    protected BaseDao getBaseDao() {
        return geegloBaseDao;
    }

    @Override
    protected Class getEntityType() {
        return CartEntity.class;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public CartEntity findNotPaid(UserEntity userEntity) {
        List list = getBaseDao().selectAll(getEntityType(),
                Arrays.asList(
                        new QueryConditionStruct("paid", Arrays.asList(false)),
                        new QueryConditionStruct("userEntity", Arrays.asList(userEntity))));
        if(list.size() > 0)
            return (CartEntity) list.get(0);
        return null;
    }
}
