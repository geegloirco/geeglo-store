package ir.geeglo.dev.store.data.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Entity
@Table(name = "address", schema = "geeglo_store")
public class AddressEntity {
    private int id;
    private String title;
    private Double latitude;
    private Double longitude;
    private String detail;
    private String phoneNumber;
    private String postCode;
    private List<UserEntity> userEntities = new ArrayList<>();


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "title", nullable = false, length = 60)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "latitude", nullable = true, precision = 0)
    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    @Basic
    @Column(name = "longitude", nullable = true, precision = 0)
    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    @Basic
    @Column(name = "detail", nullable = true, length = 255)
    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    @Basic
    @Column(name = "phone_number", nullable = true, length = 8)
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Basic
    @Column(name = "post_code", nullable = true, length = 10)
    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressEntity that = (AddressEntity) o;
        return id == that.id &&
                Objects.equals(title, that.title) &&
                Objects.equals(latitude, that.latitude) &&
                Objects.equals(longitude, that.longitude) &&
                Objects.equals(detail, that.detail) &&
                Objects.equals(phoneNumber, that.phoneNumber) &&
                Objects.equals(postCode, that.postCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, latitude, longitude, detail, phoneNumber, postCode);
    }

    @ManyToMany(mappedBy = "addressEntities")
    public List<UserEntity> getUserEntities() {
        return userEntities;
    }

    public void setUserEntities(List<UserEntity> userEntities) {
        this.userEntities = userEntities;
    }
}
