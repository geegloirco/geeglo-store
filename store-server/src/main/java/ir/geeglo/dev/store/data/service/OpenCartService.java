package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.dao.QueryConditionStruct;
import ir.geeglo.dev.store.data.entity.CartEntity;
import ir.geeglo.dev.store.data.entity.OpenCartEntity;
import ir.geeglo.dev.store.data.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Repository
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class OpenCartService extends BaseService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    private GeegloBaseDao geegloBaseDao;

    @Override
    protected BaseDao getBaseDao() {
        return geegloBaseDao;
    }

    @Override
    protected Class getEntityType() {
        return OpenCartEntity.class;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public OpenCartEntity findByUserId(int userId) {
        List list = getBaseDao().selectAll(getEntityType(),
                Arrays.asList(
                        new QueryConditionStruct("userId", Arrays.asList(userId))));
        if(list.size() > 0)
            return (OpenCartEntity) list.get(0);
        return null;
    }
}
