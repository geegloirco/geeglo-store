package ir.geeglo.dev.store.data.service;

import ir.geeglo.dev.store.data.dao.GeegloBaseDao;
import ir.geeglo.dev.store.data.dao.QueryConditionStruct;
import ir.geeglo.dev.store.data.entity.CountryEntity;
import ir.geeglo.dev.store.data.entity.ProvinceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class ProvinceService {
    @Autowired
    @Qualifier("GeegloBaseDao")
    GeegloBaseDao<ProvinceEntity> bazarBaseDao;

    public ProvinceEntity findByTitle(String title) {
        return bazarBaseDao.findByTitle(ProvinceEntity.class, title);
    }

    public ProvinceEntity findByTitleAndCountry(
            String title, CountryEntity countryEntity) {
        List<ProvinceEntity> objects = bazarBaseDao.selectAll(ProvinceEntity.class,
                Arrays.asList(
                        new QueryConditionStruct("title", Arrays.asList(title)),
                        new QueryConditionStruct("country_id",
                                Arrays.asList(countryEntity.getId()))));
        if(objects != null && !objects.isEmpty())
            return objects.get(0);
        return null;
    }

    public void save(ProvinceEntity provinceEntity) {
        bazarBaseDao.insert(provinceEntity);
    }

    public ProvinceEntity save(String title, CountryEntity countryEntity) {
        ProvinceEntity provinceEntity = new ProvinceEntity();
        provinceEntity.setTitle(title);
        provinceEntity.setCountryByCountryId(countryEntity);
        bazarBaseDao.insert(provinceEntity);
        return provinceEntity;
    }
}
