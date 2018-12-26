package ir.geeglo.dev.store.data.entity;

import ir.geeglo.dev.store.data.converter.MapConverter;
import org.eclipse.persistence.annotations.Mutable;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
@Entity
@Table(name = "open_cart", schema = "geeglo_store")
public class OpenCartEntity {
    private int id;
    private int userId;
    private Timestamp creationTime;
    private Map items = new LinkedHashMap();

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
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Convert(converter = MapConverter.class)
    @Mutable
    @Column(name = "items", nullable = false)
    public Map getItems() {
        return items;
    }

    public void setItems(Map items) {
        this.items = items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OpenCartEntity that = (OpenCartEntity) o;
        return id == that.id &&
                userId == that.userId &&
                Objects.equals(creationTime, that.creationTime) &&
                Objects.equals(items, that.items);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, creationTime, items);
    }
}
