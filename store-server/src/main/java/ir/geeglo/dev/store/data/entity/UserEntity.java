package ir.geeglo.dev.store.data.entity;

import org.eclipse.persistence.annotations.Mutable;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Entity
@Table(name = "user", schema = "geeglo_store")
public class UserEntity {
    private int id;
    private String username;
    private String gmail;
    private String mobile;
    private String password;
    private Timestamp enterDate;
    private String image;
    private List<UserInfoEntity> userInfos;
    private List<CartEntity> cartEntities;
    private List<LocationEntity> locationEntities;
    private List<AddressEntity> addressEntities;

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
    @Column(name = "username", nullable = false, length = 128)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "gmail", nullable = false, length = 128)
    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    @Basic
    @Column(name = "mobile", nullable = true, length = 11)
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "password", nullable = true, length = 128)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "enter_date", nullable = false)
    public Timestamp getEnterDate() {
        return enterDate;
    }

    public void setEnterDate(Timestamp enterDate) {
        this.enterDate = enterDate;
    }

    @Basic
    @Column(name = "image", nullable = true, length = 255)
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return id == that.id &&
                Objects.equals(username, that.username) &&
                Objects.equals(gmail, that.gmail) &&
                Objects.equals(mobile, that.mobile) &&
                Objects.equals(password, that.password) &&
                Objects.equals(enterDate, that.enterDate) &&
                Objects.equals(image, that.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, gmail, mobile, password, enterDate, image);
    }

    @OneToMany(mappedBy = "userByUserId", cascade = CascadeType.ALL)
    public List<UserInfoEntity> getUserInfos() {
        return userInfos;
    }

    public void setUserInfos(List<UserInfoEntity> userInfos) {
        this.userInfos = userInfos;
    }

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.DETACH)
    public List<CartEntity> getCartEntities() {
        return cartEntities;
    }

    public void setCartEntities(List<CartEntity> cartEntities) {
        this.cartEntities = cartEntities;
    }

    public void addCartEntity(CartEntity cartEntity) {
        cartEntity.setUserEntity(this);
        this.cartEntities.add(cartEntity);
    }

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "user_location",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    public List<LocationEntity> getLocationEntities() {
        return locationEntities;
    }

    public void setLocationEntities(List<LocationEntity> locationEntities) {
        this.locationEntities = locationEntities;
    }

    public void addLocation(LocationEntity locationEntity) {
        locationEntities.add(locationEntity);
        locationEntity.getUserEntities().add(this);
    }

    public void removeLocation(LocationEntity locationEntity) {
        locationEntities.remove(locationEntity);
        locationEntity.getUserEntities().remove(this);
    }

    @OneToMany(mappedBy = "userEntity", cascade = {CascadeType.ALL})
    @Mutable
    public List<AddressEntity> getAddressEntities() {
        return addressEntities;
    }

    public void setAddressEntities(List<AddressEntity> addressEntities) {
        this.addressEntities = addressEntities;
    }

    public void addAddressEntity(AddressEntity addressEntity) {
        addressEntity.setUserEntity(this);
        this.addressEntities.add(addressEntity);
    }

    public void removeAddressEntity(AddressEntity addressEntity) {
        this.addressEntities.remove(addressEntity);
//        addressEntity.setUserEntity(null);
    }
}
