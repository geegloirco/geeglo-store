package ir.geeglo.dev.store.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String referenceId;
    private Map history;
    private Timestamp registerTime;
    private Timestamp deliveryTime;
    private boolean paid;
    private boolean received;

    public CartEntity() {
    }

//    public CartEntity(OpenCartEntity openCartEntity) {
//        this.setItems(openCartEntity.getItems());
//        this.setCreationTime(openCartEntity.getCreationTime());
//        this.setRegisterTime(new Timestamp(System.currentTimeMillis()));
//    }

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

    @Basic
    @Column(name = "reference_id", nullable = true, length = 128)
    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }


    @Convert(converter = MapConverter.class)
    @Column(name = "history", nullable = false, length = 1024)
    public Map getHistory() {
        return history;
    }

    public void setHistory(Map history) {
        this.history = history;
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
    @Column(name = "delivery_time", nullable = false)
    public Timestamp getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Timestamp deliveryTime) {
        this.deliveryTime = deliveryTime;
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
    @Column(name = "is_received")
    public boolean isReceived() {
        return paid;
    }

    public void setReceived(boolean received) {
        this.received = received;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartEntity that = (CartEntity) o;
        return id == that.id &&
                Objects.equals(creationTime, that.creationTime) &&
                Objects.equals(history, that.history);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, creationTime, history);
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }
}
