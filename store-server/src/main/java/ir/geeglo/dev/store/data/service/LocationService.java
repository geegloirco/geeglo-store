package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.LocationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class LocationService {

    @Autowired
    @Qualifier("GeegloBaseDao")
    GeegloBaseDao<LocationEntity> bazarBaseDao;

    public LocationEntity selectByUserId(int userId) {
        return bazarBaseDao.findByCondition(
                LocationEntity.class, "userId", userId);
    }

    public LocationEntity findByTitle(String title) {
        LocationEntity locationEntity = bazarBaseDao
                .findByTitle(LocationEntity.class, title);
        return locationEntity;
    }

    public void save(LocationEntity locationEntity) {
        bazarBaseDao.insert(locationEntity);
    }

    public void delete(LocationEntity locationEntity) {
        bazarBaseDao.delete(locationEntity);
    }
}
