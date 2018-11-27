package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.dao.QueryConditionStruct;
import ir.geeglo.dev.store.data.entity.CartDetailEntity;
import ir.geeglo.dev.store.data.entity.CartEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Repository
public class CartDetailService extends BaseService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    private GeegloBaseDao geegloBaseDao;

    @Override
    protected BaseDao getBaseDao() {
        return geegloBaseDao;
    }

    @Override
    protected Class getEntityType() {
        return CartDetailEntity.class;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public CartDetailEntity findByCartId(CartEntity cartEntity) {
        List list = getBaseDao().selectAll(getEntityType(),
                Arrays.asList(
                        new QueryConditionStruct("cart", Arrays.asList(cartEntity))));
        if(list.size() > 0)
            return (CartDetailEntity) list.get(0);
        return null;
    }
}
