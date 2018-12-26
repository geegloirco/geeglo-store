package ir.geeglo.dev.store.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.geeglo.dev.store.data.converter.MapConverter;
import org.eclipse.persistence.annotations.Mutable;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
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
    private DeliveryStatusEntity deliveryStatusEntity;
    private PaymentTypeEntity paymentTypeEntity;
    private String referenceNo;
    private Timestamp creationTime;
    private Timestamp registerTime;
    private Timestamp deliveryTime;
    private long totalPrice;
    private String registerDate;
    private String deliveryDate;
    private String addressTitle;
    private String paymentTypeTitle;
    private boolean paid;
    private boolean received;
    private List<CartDetailEntity> cartDetailEntities;

    public CartEntity() {
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

    @Basic
    @Column(name = "reference_no", nullable = true, length = 128)
    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
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
    @Column(name = "total_price", nullable = true)
    public long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(long totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Basic
    @Column(name = "register_date", nullable = true, length = 10)
    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    @Basic
    @Column(name = "delivery_date", nullable = true, length = 10)
    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    @Basic
    @Column(name = "payment_type_title", nullable = true, length = 60)
    public String getPaymentTypeTitle() {
        return paymentTypeTitle;
    }

    public void setPaymentTypeTitle(String paymentTypeTitle) {
        this.paymentTypeTitle = paymentTypeTitle;
    }

    @Basic
    @Column(name = "address_title", nullable = true, length = 60)
    public String getAddressTitle() {
        return addressTitle;
    }

    public void setAddressTitle(String addressTitle) {
        this.addressTitle = addressTitle;
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
        return received;
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
                Objects.equals(registerDate, that.registerDate);
//                Objects.equals(history, that.history);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, creationTime, registerDate);
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "payment_type_id", referencedColumnName = "id", nullable = false)
    public PaymentTypeEntity getPaymentType() {
        return paymentTypeEntity;
    }

    public void setPaymentType(PaymentTypeEntity paymentType) {
        this.paymentTypeEntity = paymentType;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "delivery_status_id", referencedColumnName = "id", nullable = false)
    public DeliveryStatusEntity getDeliveryStatusEntity() {
        return deliveryStatusEntity;
    }

    public void setDeliveryStatusEntity(DeliveryStatusEntity deliveryStatus) {
        this.deliveryStatusEntity = deliveryStatus;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "cartEntity", cascade = {CascadeType.ALL})
    @Mutable
    public List<CartDetailEntity> getCartDetailEntities() {
        return cartDetailEntities;
    }

    public void setCartDetailEntities(List<CartDetailEntity> cartDetailEntities) {
        this.cartDetailEntities = cartDetailEntities;
    }

    public void addCartDetailEntity(CartDetailEntity cartDetailEntity) {
        cartDetailEntity.setCartEntity(this);
        if(this.cartDetailEntities == null)
            this.cartDetailEntities = new ArrayList<>();
        this.cartDetailEntities.add(cartDetailEntity);
    }

    public void removeCartDetailEntity(CartDetailEntity cartDetailEntity) {
        this.cartDetailEntities.remove(cartDetailEntity);
//        addressEntity.setUserEntity(null);
    }
}
