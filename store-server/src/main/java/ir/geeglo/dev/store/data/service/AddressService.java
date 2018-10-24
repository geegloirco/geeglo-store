package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.AddressEntity;
import ir.geeglo.dev.store.data.entity.LocationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class AddressService {

    @Autowired
    @Qualifier("GeegloBaseDao")
    GeegloBaseDao<AddressEntity> bazarBaseDao;

    public AddressEntity selectByUserId(int userId) {
        return bazarBaseDao.findByCondition(
                AddressEntity.class, "userId", userId);
    }

    public AddressEntity findByTitle(String title) {
        AddressEntity addressEntity = bazarBaseDao
                .findByTitle(AddressEntity.class, title);
        return addressEntity;
    }
}
