package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.UserInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class UserInfoService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    private GeegloBaseDao bazarBaseDao;

//    public UserEntity selectByGmail(String gmail) {
//        return (UserEntity) geegloBaseDao.findByCondition(
//                UserEntity.class, "gmail", gmail);
//    }

    public void save(UserInfoEntity userInfoEntity) {
        bazarBaseDao.insert(userInfoEntity);
    }

    public void update(UserInfoEntity userInfoEntity) {
        bazarBaseDao.update(userInfoEntity);
    }
}
