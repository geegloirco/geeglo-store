package ir.geeglo.dev.store.model;

/**
 * @author Mohammad Rahmati, 10/14/2018
 */
public class ResponseModel<T> {
    private int status;
    private T entity;

    public ResponseModel() {

    }

    public ResponseModel(int status, T entity) {
        this.status = status;
        this.entity = entity;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public T getEntity() {
        return entity;
    }

    public void setEntity(T entity) {
        this.entity = entity;
    }
}
