package ir.geeglo.dev.store.data.entity;

import ir.geeglo.dev.store.data.converter.MapConverter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Map;
import java.util.Objects;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Entity
@Table(name = "cart", schema = "geeglo_store")
public class CartEntity {
    private int id;
    private UserEntity userEntity;
    private Timestamp creationTime;
    private Map items;
    private Timestamp registerTime;
    private boolean paid;
    private boolean recieved;

    public CartEntity() {
    }

    public CartEntity(OpenCartEntity openCartEntity) {
        this.setItems(openCartEntity.getItems());
        this.setCreationTime(openCartEntity.getCreationTime());
        this.setRegisterTime(new Timestamp(System.currentTimeMillis()));
    }

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
    @Column(name = "creation_time", nullable = false)
    public Timestamp getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Timestamp creationTime) {
        this.creationTime = creationTime;
    }

    @Convert(converter = MapConverter.class)
    @Column(name = "items", nullable = false, length = 128)
    public Map getItems() {
        return items;
    }

    public void setItems(Map items) {
        this.items = items;
    }

    @Basic
    @Column(name = "register_time", nullable = false)
    public Timestamp getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Timestamp registerTime) {
        this.registerTime = registerTime;
    }

    @Basic
    @Column(name = "is_paid")
    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    @Basic
    @Column(name = "is_recieved")
    public boolean isRecieved() {
        return paid;
    }

    public void setRecieved(boolean recieved) {
        this.recieved = recieved;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartEntity that = (CartEntity) o;
        return id == that.id &&
                Objects.equals(creationTime, that.creationTime) &&
                Objects.equals(items, that.items);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, creationTime, items);
    }

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }
}
