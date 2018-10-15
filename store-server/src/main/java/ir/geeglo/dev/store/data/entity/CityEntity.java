package ir.geeglo.dev.store.data.entity;

import javax.persistence.*;
import java.util.Objects;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Entity
@Table(name = "city", schema = "geeglo_store")
public class CityEntity {
    private int id;
    private String title;
    private String phoneCode;
    private CountryEntity countryByCountryId;
    private ProvinceEntity provinceByProvinceId;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "title", nullable = true, length = 128)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "phoneCode", nullable = true, length = 10)
    public String getPhoneCode() {
        return phoneCode;
    }

    public void setPhoneCode(String phoneCode) {
        this.phoneCode = phoneCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CityEntity that = (CityEntity) o;
        return id == that.id &&
                Objects.equals(title, that.title) &&
                Objects.equals(phoneCode, that.phoneCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, phoneCode);
    }

    @ManyToOne
    @JoinColumn(name = "country_id", referencedColumnName = "id")
    public CountryEntity getCountryByCountryId() {
        return countryByCountryId;
    }

    public void setCountryByCountryId(CountryEntity countryByCountryId) {
        this.countryByCountryId = countryByCountryId;
    }

    @ManyToOne
    @JoinColumn(name = "province_id", referencedColumnName = "id")
    public ProvinceEntity getProvinceByProvinceId() {
        return provinceByProvinceId;
    }

    public void setProvinceByProvinceId(ProvinceEntity provinceByProvinceId) {
        this.provinceByProvinceId = provinceByProvinceId;
    }
}
