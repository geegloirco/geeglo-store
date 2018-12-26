package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.entity.CityEntity;
import ir.geeglo.dev.store.data.entity.CountryEntity;
import ir.geeglo.dev.store.data.entity.ProvinceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CityService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    GeegloBaseDao<CityEntity> bazarBaseDao;

    public CityEntity findByTitle(String title) {
        return bazarBaseDao.findByTitle(CityEntity.class, title);
    }

    public void save(CityEntity cityEntity) {
        bazarBaseDao.insert(cityEntity);
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public CityEntity save(
            String title,
            CountryEntity countryEntity,
            ProvinceEntity provinceEntity) {
        CityEntity cityEntity = new CityEntity();
        cityEntity.setTitle(title);
//        cityEntity.setCountryEntity(countryEntity);
//        cityEntity.setProvinceEntity(provinceEntity);
        bazarBaseDao.insert(cityEntity);
        return cityEntity;
    }
}
