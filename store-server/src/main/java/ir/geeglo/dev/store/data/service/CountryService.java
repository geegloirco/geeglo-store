package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.CountryEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class CountryService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    GeegloBaseDao<CountryEntity> geegloBaseDao;

    public CountryEntity findByTitle(String title) {
        return geegloBaseDao.findByTitle(CountryEntity.class, title);
    }

    public void save(CountryEntity countryEntity) {
        geegloBaseDao.insert(countryEntity);
    }

    public CountryEntity save(String title) {
        CountryEntity countryEntity = new CountryEntity();
        countryEntity.setTitle(title);
        geegloBaseDao.insert(countryEntity);
        return countryEntity;
    }
}
