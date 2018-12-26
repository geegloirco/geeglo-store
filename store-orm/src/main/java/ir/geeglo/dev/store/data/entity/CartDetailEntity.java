package ir.geeglo.dev.store.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.geeglo.dev.store.data.converter.MapConverter;

import javax.persistence.*;
import java.util.Map;
import java.util.Objects;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Entity
@Table(name = "cart_detail", schema = "geeglo_store")
public class CartDetailEntity {
    private int id;
    private CartEntity cartEntity;
    private String referenceNo;
    private Map history;

    public CartDetailEntity() {
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
    @Column(name = "reference_no", nullable = true, length = 128)
    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }

    @Convert(converter = MapConverter.class)
    @Column(name = "history", nullable = false, length = 1024)
    public Map getHistory() {
        return history;
    }

    public void setHistory(Map history) {
        this.history = history;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartDetailEntity that = (CartDetailEntity) o;
        return id == that.id &&
                Objects.equals(referenceNo, that.referenceNo) &&
                Objects.equals(history, that.history);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, referenceNo);
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id", nullable = false)
    public CartEntity getCartEntity() {
        return cartEntity;
    }

    public void setCartEntity(CartEntity cartEntity) {
        this.cartEntity = cartEntity;
    }
}
