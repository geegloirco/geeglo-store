package ir.geeglo.dev.store.data.entity;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Entity
@Table(name = "country", schema = "geeglo_store")
public class CountryEntity {
    private int id;
    private String title;
    private String phoneCode;
    private List<CityEntity> citiesById;
    private List<ProvinceEntity> provincesById;

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
        CountryEntity that = (CountryEntity) o;
        return id == that.id &&
                Objects.equals(title, that.title) &&
                Objects.equals(phoneCode, that.phoneCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, phoneCode);
    }

    @OneToMany(mappedBy = "countryByCountryId")
    public List<CityEntity> getCitiesById() {
        return citiesById;
    }

    public void setCitiesById(List<CityEntity> citiesById) {
        this.citiesById = citiesById;
    }

    @OneToMany(mappedBy = "countryByCountryId")
    public List<ProvinceEntity> getProvincesById() {
        return provincesById;
    }

    public void setProvincesById(List<ProvinceEntity> provincesById) {
        this.provincesById = provincesById;
    }
}
