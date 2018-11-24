package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.BaseDao;
import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.UserInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class UserInfoService extends BaseService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    private GeegloBaseDao geegloBaseDao;

    @Override
    protected BaseDao getBaseDao() {
        return geegloBaseDao;
    }

    @Override
    protected Class getEntityType() {
        return UserInfoEntity.class;
    }

//    public UserEntity selectByGmail(String gmail) {
//        return (UserEntity) geegloBaseDao.findByCondition(
//                UserEntity.class, "gmail", gmail);
//    }

    public void save(UserInfoEntity userInfoEntity) {
        geegloBaseDao.insert(userInfoEntity);
    }

    public void update(UserInfoEntity userInfoEntity) {
        geegloBaseDao.update(userInfoEntity);
    }
}
